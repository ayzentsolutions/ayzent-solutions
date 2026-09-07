"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  Button,
} from "@/components/ui/button";

import {
  collectionFields,
  type AdminField,
} from "@/components/admin/collection-fields";

import {
  MarkdownEditor,
} from "@/components/admin/markdown-editor";

type Item =
  Record<string, unknown> & {
    _id: string;
  };

type Values =
  Record<string, string | boolean>;

const singletonCollections = [
  "siteSettings",
  "aboutContent",
];

function isSingleton(
  collection: string
) {
  return singletonCollections.includes(
    collection
  );
}

function getItemId(
  item: Item
) {
  const id = item._id;

  if (
    typeof id === "string"
  ) {
    return id;
  }

  return String(id);
}

const titleOf = (
  item: Item
) =>
  String(
    item.title ||
      item.name ||
      item.question ||
      item.clientName ||
      item.email ||
      item.label ||
      item.companyName ||
      "Untitled entry"
  );

function toValues(
  fields: AdminField[],
  item?: Item
): Values {
  return Object.fromEntries(
    fields.map((field) => {
      const value =
        item?.[field.name];

      if (
        field.type ===
        "checkbox"
      ) {
        return [
          field.name,
          Boolean(value),
        ];
      }

      if (
        field.type ===
        "tags"
      ) {
        return [
          field.name,

          Array.isArray(value)
            ? value.join(", ")
            : "",
        ];
      }

      return [
        field.name,

        value === undefined ||
        value === null
          ? ""
          : String(value),
      ];
    })
  );
}

function toData(
  fields: AdminField[],
  values: Values
) {
  return Object.fromEntries(
    fields
      .map((field) => {
        const value =
          values[field.name];

        if (
          field.type ===
          "checkbox"
        ) {
          return [
            field.name,
            Boolean(value),
          ];
        }

        if (
          field.type ===
          "number"
        ) {
          if (
            value === "" ||
            value === undefined
          ) {
            return [
              field.name,
              undefined,
            ];
          }

          const number =
            Number(value);

          return [
            field.name,

            Number.isNaN(number)
              ? undefined
              : number,
          ];
        }

        if (
          field.type ===
          "tags"
        ) {
          return [
            field.name,

            String(value || "")
              .split(",")
              .map((item) =>
                item.trim()
              )
              .filter(Boolean),
          ];
        }

        return [
          field.name,
          String(
            value || ""
          ).trim(),
        ];
      })
      .filter(
        ([, value]) =>
          value !== "" &&
          value !== undefined
      )
  );
}

function groupFields(
  fields: AdminField[]
) {
  const groups = new Map<
    string,
    AdminField[]
  >();

  fields.forEach((field) => {
    const group =
      field.group || "Content";

    const existing =
      groups.get(group) || [];

    groups.set(
      group,
      [
        ...existing,
        field,
      ]
    );
  });

  return Array.from(
    groups.entries()
  ).map(
    ([title, grouped]) => ({
      title,
      fields: grouped,
    })
  );
}

export function ContentManager({
  collection,
  label,
}: {
  collection: string;
  label: string;
}) {
  const fields = useMemo(
    () =>
      collectionFields[
        collection
      ] || [],
    [collection]
  );

  const groupedFields =
    useMemo(
      () => groupFields(fields),
      [fields]
    );

  const singleton =
    isSingleton(collection);

  const [items, setItems] =
    useState<Item[]>([]);

  const [editing, setEditing] =
    useState<Item | null>(
      null
    );

  const [values, setValues] =
    useState<Values>(() =>
      toValues(fields)
    );

  const [message, setMessage] =
    useState("");

  const [pending, setPending] =
    useState(false);

  const [
    loading,
    setLoading,
  ] = useState(true);

  /*
  |--------------------------------------------------------------------------
  | LOAD COLLECTION
  |--------------------------------------------------------------------------
  |
  | For singleton collections:
  |
  | - Existing data automatically fills the form.
  | - The first document becomes the editable singleton.
  |
  | For normal collections:
  |
  | - Entries are loaded into the list.
  |--------------------------------------------------------------------------
  */

  const load = useCallback(
    async () => {
      setLoading(true);

      try {
        const response =
          await fetch(
            `/api/admin/${collection}`,
            {
              cache: "no-store",
            }
          );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Unable to load entries."
          );
        }

        const loadedItems:
          Item[] =
          Array.isArray(
            result.items
          )
            ? result.items
            : [];

        setItems(
          loadedItems
        );

        if (
          isSingleton(collection)
        ) {
          /*
          |--------------------------------------------------------------------------
          | SINGLETON AUTO LOAD
          |--------------------------------------------------------------------------
          */

          const existing =
            loadedItems[0] ||
            null;

          setEditing(
            existing
          );

          setValues(
            toValues(
              fields,
              existing ||
                undefined
            )
          );
        }
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Unable to load entries."
        );
      } finally {
        setLoading(false);
      }
    },
    [
      collection,
      fields,
    ]
  );

  useEffect(() => {
    setEditing(null);

    setValues(
      toValues(fields)
    );

    setMessage("");

    void load();
  }, [
    collection,
    fields,
    load,
  ]);

  function change(
    field: AdminField,

    event: ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) {
    const target =
      event.target;

    const nextValue =
      field.type ===
        "checkbox" &&
      target instanceof
        HTMLInputElement
        ? target.checked
        : target.value;

    setValues(
      (current) => ({
        ...current,

        [field.name]:
          nextValue,
      })
    );
  }

  function setValue(
    name: string,
    value: string | boolean
  ) {
    setValues(
      (current) => ({
        ...current,
        [name]: value,
      })
    );
  }

  /*
  |--------------------------------------------------------------------------
  | SAVE
  |--------------------------------------------------------------------------
  |
  | Singleton:
  |
  | Existing document:
  | PATCH
  |
  | No document:
  | POST
  |
  | This prevents the CMS UI from intentionally creating a new
  | Site Settings document when one already exists.
  |--------------------------------------------------------------------------
  */

  async function save(
    event: FormEvent
  ) {
    event.preventDefault();

    if (pending) {
      return;
    }

    setPending(true);

    setMessage("");

    try {
      const data =
        toData(
          fields,
          values
        );

      const shouldUpdate =
        Boolean(editing);

      const body =
        shouldUpdate
          ? {
              id: getItemId(
                editing!
              ),
              data,
            }
          : {
              data,
            };

      const response =
        await fetch(
          `/api/admin/${collection}`,
          {
            method:
              shouldUpdate
                ? "PATCH"
                : "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                body
              ),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to save this entry."
        );
      }

      setMessage(
        singleton
          ? "Settings saved successfully."
          : shouldUpdate
            ? "Changes saved successfully."
            : "Entry created successfully."
      );

      await load();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to save entry."
      );
    } finally {
      setPending(false);
    }
  }

  function edit(
    item: Item
  ) {
    setEditing(item);

    setValues(
      toValues(
        fields,
        item
      )
    );

    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEditing() {
    if (singleton) {
      return;
    }

    setEditing(null);

    setValues(
      toValues(fields)
    );

    setMessage("");
  }

  async function remove(
    id: string
  ) {
    if (singleton) {
      return;
    }

    if (
      !window.confirm(
        "Delete this entry? This cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response =
        await fetch(
          `/api/admin/${collection}?id=${encodeURIComponent(
            id
          )}`,
          {
            method: "DELETE",
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to delete entry."
        );
      }

      if (
        editing &&
        getItemId(
          editing
        ) === id
      ) {
        cancelEditing();
      }

      await load();

      setMessage(
        "Entry deleted successfully."
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to delete entry."
      );
    }
  }

  return (
    <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_24rem]">
      <section>
        <h1 className="font-display text-4xl">
          {label}
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-muted">
          {singleton
            ? loading
              ? "Loading your current website settings..."
              : editing
                ? "Your current website settings are loaded below. Edit anything you want and save."
                : "No settings entry exists yet. You can fill only the fields you want."
            : editing
              ? "Update the selected entry."
              : "Create a new entry."}
        </p>

        {loading ? (
          <div className="mt-8 border border-line bg-surface/40 p-6">
            <p className="text-sm text-muted">
              Loading...
            </p>
          </div>
        ) : (
          <form
            onSubmit={save}
            className="mt-8 grid gap-7"
          >
            {groupedFields.map(
              (group) => (
                <fieldset
                  key={group.title}
                  className="border border-line bg-surface/40"
                >
                  <legend className="ml-4 px-2 text-xs font-medium uppercase tracking-[0.18em] text-gold">
                    {group.title}
                  </legend>

                  <div className="grid gap-5 p-5">
                    {group.fields.map(
                      (field) => (
                        <Field
                          key={
                            field.name
                          }
                          field={field}
                          value={
                            values[
                              field.name
                            ]
                          }
                          onChange={
                            change
                          }
                          onValueChange={
                            setValue
                          }
                        />
                      )
                    )}
                  </div>
                </fieldset>
              )
            )}

            <div className="flex flex-wrap gap-3">
              <Button
                disabled={pending}
                type="submit"
              >
                {pending
                  ? "Saving..."
                  : singleton
                    ? "Save Settings"
                    : editing
                      ? "Save Changes"
                      : "Create Entry"}
              </Button>

              {editing &&
                !singleton && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={
                      cancelEditing
                    }
                  >
                    Cancel
                  </Button>
                )}
            </div>

            {message && (
              <p
                role="status"
                className="text-sm text-muted"
              >
                {message}
              </p>
            )}
          </form>
        )}
      </section>

      {!singleton && (
        <section className="xl:sticky xl:top-6 xl:h-fit">
          <h2 className="font-display text-2xl">
            Entries
          </h2>

          <div className="mt-5 divide-y border-y border-line">
            {items.length ? (
              items.map(
                (item) => (
                  <article
                    key={getItemId(
                      item
                    )}
                    className="flex items-start justify-between gap-4 py-4"
                  >
                    <div className="min-w-0">
                      <h3 className="font-medium">
                        {titleOf(
                          item
                        )}
                      </h3>
                    </div>

                    <div className="flex shrink-0 gap-3 text-sm">
                      <button
                        type="button"
                        className="hover:text-gold"
                        onClick={() =>
                          edit(
                            item
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="text-muted hover:text-red-600"
                        onClick={() =>
                          void remove(
                            getItemId(
                              item
                            )
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                )
              )
            ) : (
              <p className="py-5 text-sm text-muted">
                No entries yet.
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

function Field({
  field,
  value,
  onChange,
  onValueChange,
}: {
  field: AdminField;

  value:
    | string
    | boolean
    | undefined;

  onChange: (
    field: AdminField,

    event: ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) => void;

  onValueChange: (
    name: string,
    value: string | boolean
  ) => void;
}) {
  const common = {
    id: field.name,

    name: field.name,

    required:
      Boolean(
        field.required
      ),

    value:
      typeof value ===
      "boolean"
        ? ""
        : value || "",

    onChange: (
      event: ChangeEvent<
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement
      >
    ) =>
      onChange(
        field,
        event
      ),

    className:
      "w-full border border-line bg-background px-3 py-3 text-sm",
  };

  if (
    field.type ===
    "checkbox"
  ) {
    return (
      <label className="flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={Boolean(
            value
          )}
          onChange={(event) =>
            onChange(
              field,
              event
            )
          }
        />

        {field.label}
      </label>
    );
  }

  if (
    field.type ===
    "markdown"
  ) {
    return (
      <label className="grid gap-2 text-sm">
        {field.label}

        <MarkdownEditor
          id={field.name}
          required={Boolean(
            field.required
          )}
          value={String(
            value || ""
          )}
          onChange={(next) =>
            onValueChange(
              field.name,
              next
            )
          }
        />

        {field.hint && (
          <span className="text-xs text-muted">
            {field.hint}
          </span>
        )}
      </label>
    );
  }

  if (
    field.type === "image"
  ) {
    return (
      <ImageField
        field={field}
        value={String(
          value || ""
        )}
        onChange={(url) =>
          onValueChange(
            field.name,
            url
          )
        }
      />
    );
  }

  return (
    <label className="grid gap-2 text-sm">
      {field.label}

      {field.type ===
      "select" ? (
        <select {...common}>
          <option value="">
            Select...
          </option>

          {field.options?.map(
            (option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            )
          )}
        </select>
      ) : field.type ===
        "textarea" ? (
        <textarea
          {...common}
          rows={5}
          className={`${common.className} resize-y`}
        />
      ) : (
        <input
          {...common}
          type={field.type}
        />
      )}

      {field.hint && (
        <span className="text-xs text-muted">
          {field.hint}
        </span>
      )}
    </label>
  );
}

function ImageField({
  field,
  value,
  onChange,
}: {
  field: AdminField;

  value: string;

  onChange: (
    url: string
  ) => void;
}) {
  const [
    uploading,
    setUploading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  async function upload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      setError(
        "Only JPG, JPEG, PNG, WebP and AVIF images are allowed."
      );

      event.target.value =
        "";

      return;
    }

    if (
      file.size >
      10 * 1024 * 1024
    ) {
      setError(
        "Image must be smaller than 10MB."
      );

      event.target.value =
        "";

      return;
    }

    setUploading(true);

    setError("");

    try {
      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const response =
        await fetch(
          "/api/admin/media",
          {
            method: "POST",
            body: formData,
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Image upload failed."
        );
      }

      if (!result.url) {
        throw new Error(
          "Cloudinary did not return an image URL."
        );
      }

      onChange(
        String(
          result.url
        )
      );
    } catch (
      uploadError
    ) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Unable to upload image."
      );
    } finally {
      setUploading(false);

      event.target.value =
        "";
    }
  }

  function removeImage() {
    if (
      !window.confirm(
        "Remove this image?"
      )
    ) {
      return;
    }

    setError("");

    onChange("");
  }

  return (
    <div className="grid gap-3">
      <div>
        <p className="text-sm font-medium">
          {field.label}
        </p>

        {field.hint ? (
          <p className="mt-1 text-xs text-muted">
            {field.hint}
          </p>
        ) : (
          <p className="mt-1 text-xs text-muted">
            Upload an image directly to Cloudinary.
          </p>
        )}
      </div>

      {value ? (
        <div className="overflow-hidden border border-line bg-background p-4">
          <img
            src={value}
            alt={
              field.label
            }
            className="max-h-64 w-full object-contain"
          />
        </div>
      ) : (
        <div className="flex min-h-32 items-center justify-center border border-dashed border-line text-sm text-muted">
          No image uploaded.
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <label
          className={`inline-flex cursor-pointer border border-line px-4 py-2 text-sm transition hover:border-gold hover:text-gold ${
            uploading
              ? "cursor-not-allowed opacity-60"
              : ""
          }`}
        >
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
            onChange={
              upload
            }
            disabled={
              uploading
            }
            className="hidden"
          />

          {uploading
            ? "Uploading..."
            : value
              ? "Replace Image"
              : "Upload Image"}
        </label>

        {value && (
          <button
            type="button"
            className="text-sm text-red-600 transition hover:opacity-70"
            onClick={
              removeImage
            }
          >
            Remove Image
          </button>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
