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
        field.type === "tags"
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
          return [
            field.name,

            value === ""
              ? undefined
              : Number(value),
          ];
        }

        if (
          field.type === "tags"
        ) {
          return [
            field.name,

            String(value)
              .split(",")
              .map((item) =>
                item.trim()
              )
              .filter(Boolean),
          ];
        }

        return [
          field.name,
          String(value).trim(),
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
    ([title, fields]) => ({
      title,
      fields,
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

  const load = useCallback(
    async () => {
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

        setItems(
          result.items || []
        );
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Unable to load entries."
        );
      }
    },
    [collection]
  );

  useEffect(() => {
    void load();

    setEditing(null);

    setValues(
      toValues(fields)
    );

    setMessage("");
  }, [
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
    setValues((current) => ({
      ...current,

      [field.name]:
        field.type ===
          "checkbox" &&
        event.target instanceof
          HTMLInputElement
          ? event.target.checked
          : event.target.value,
    }));
  }

  function setValue(
    name: string,
    value: string | boolean
  ) {
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function save(
    event: FormEvent
  ) {
    event.preventDefault();

    setPending(true);

    setMessage("");

    try {
      const response =
        await fetch(
          `/api/admin/${collection}`,
          {
            method: editing
              ? "PATCH"
              : "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              editing
                ? {
                    id:
                      editing._id,

                    data: toData(
                      fields,
                      values
                    ),
                  }
                : {
                    data: toData(
                      fields,
                      values
                    ),
                  }
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
        editing
          ? "Changes saved successfully."
          : "Entry created successfully."
      );

      setEditing(null);

      setValues(
        toValues(fields)
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
    setEditing(null);

    setValues(
      toValues(fields)
    );

    setMessage("");
  }

  async function remove(
    id: string
  ) {
    if (
      !confirm(
        "Delete this entry? This cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response =
        await fetch(
          `/api/admin/${collection}?id=${id}`,
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
        editing?._id === id
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

          {editing
            ? "Update the selected entry."
            : "Create a new entry."}

        </p>

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
                        key={field.name}
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
                ? "Saving…"
                : editing
                  ? "Save changes"
                  : "Create entry"}

            </Button>

            {editing && (

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

      </section>

      <section className="xl:sticky xl:top-6 xl:h-fit">

        <h2 className="font-display text-2xl">
          Entries
        </h2>

        <div className="mt-5 divide-y border-y border-line">

          {items.length ? (

            items.map(
              (item) => (

                <article
                  key={item._id}
                  className="flex items-start justify-between gap-4 py-4"
                >

                  <div className="min-w-0">

                    <h3 className="font-medium">

                      {titleOf(item)}

                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm text-muted">

                      {String(
                        item.excerpt ||
                          item.text ||
                          item.answer ||
                          item.description ||
                          item.email ||
                          item.status ||
                          ""
                      )}

                    </p>

                  </div>

                  <div className="flex shrink-0 gap-3 text-sm">

                    <button
                      type="button"
                      className="hover:text-gold"
                      onClick={() =>
                        edit(item)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="text-muted hover:text-red-600"
                      onClick={() =>
                        void remove(
                          item._id
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
      field.required,

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
          checked={Boolean(value)}
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
          required={
            field.required
          }
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

      return;
    }

    if (
      file.size >
      10 * 1024 * 1024
    ) {
      setError(
        "Image must be smaller than 10MB."
      );

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
        result.url
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

      event.target.value = "";
    }
  }

  return (

    <div className="grid gap-3">

      <div>

        <p className="text-sm font-medium">

          {field.label}

        </p>

        <p className="mt-1 text-xs text-muted">

          Upload directly to Cloudinary.
          The image URL is automatically saved.

        </p>

      </div>

      {value ? (

        <div className="overflow-hidden border border-line bg-background">

          <img
            src={value}
            alt={field.label}
            className="max-h-80 w-full object-contain"
          />

        </div>

      ) : (

        <div className="flex min-h-32 items-center justify-center border border-dashed border-line text-sm text-muted">

          No image uploaded.

        </div>

      )}

      <div className="flex flex-wrap gap-3">

        <label
          className={`inline-flex cursor-pointer border border-line px-4 py-2 text-sm transition hover:border-gold hover:text-gold ${
            uploading
              ? "cursor-not-allowed opacity-60"
              : ""
          }`}
        >

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={upload}
            disabled={uploading}
            className="hidden"
          />

          {uploading
            ? "Uploading…"
            : value
              ? "Replace image"
              : "Upload image"}

        </label>

        {value && (

          <button
            type="button"
            className="text-sm text-red-600"
            onClick={() =>
              onChange("")
            }
          >
            Remove image
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
