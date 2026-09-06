"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { Button } from "@/components/ui/button";

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
        field.type === "checkbox"
      ) {
        return [
          field.name,
          Boolean(value),
        ];
      }

      if (field.type === "tags") {
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
          field.type === "checkbox"
        ) {
          return [
            field.name,
            Boolean(value),
          ];
        }

        if (
          field.type === "number"
        ) {
          return [
            field.name,
            value === ""
              ? 0
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
          value !== ""
      )
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

  const [items, setItems] =
    useState<Item[]>([]);

  const [editing, setEditing] =
    useState<Item | null>(null);

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
      const response =
        await fetch(
          `/api/admin/${collection}`
        );

      const result =
        await response.json();

      setItems(
        result.items || []
      );
    },
    [collection]
  );

  useEffect(() => {
    void load();

    setEditing(null);

    setValues(
      toValues(fields)
    );
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
        setMessage(
          result.message ||
            "Unable to save this entry."
        );

        return;
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
    } finally {
      setPending(false);
    }
  }

  function edit(item: Item) {
    setEditing(item);

    setValues(
      toValues(fields, item)
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

    await fetch(
      `/api/admin/${collection}?id=${id}`,
      {
        method: "DELETE",
      }
    );

    await load();
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,.9fr)_minmax(22rem,1.1fr)]">

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
          className="mt-7 grid gap-4"
        >
          {fields.map(
            (field) => (
              <Field
                key={field.name}
                field={field}
                value={
                  values[field.name]
                }
                onChange={change}
                onUpload={(
                  url
                ) => {
                  setValues(
                    (current) => ({
                      ...current,

                      [field.name]:
                        url,
                    })
                  );
                }}
              />
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
                onClick={() => {
                  setEditing(
                    null
                  );

                  setValues(
                    toValues(
                      fields
                    )
                  );
                }}
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

      <section>
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
                  <div>
                    <h3 className="font-medium">
                      {titleOf(
                        item
                      )}
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
                        remove(
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
  onUpload,
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

  onUpload: (
    url: string
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
      "w-full border border-line bg-transparent px-3 py-3 text-sm",
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
          onChange={(
            event
          ) =>
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
          onChange={(
            next
          ) =>
            onChange(
              field,
              {
                target: {
                  value:
                    next,
                },
              } as ChangeEvent<HTMLTextAreaElement>
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
    field.type ===
    "image"
  ) {
    return (
      <ImageField
        field={field}
        value={String(
          value || ""
        )}
        onChange={onChange}
        onUpload={onUpload}
      />
    );
  }

  return (
    <label className="grid gap-2 text-sm">

      {field.label}

      {field.type ===
      "select" ? (

        <select
          {...common}
        >
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
          rows={4}
          className={`${common.className} resize-y`}
        />

      ) : (

        <input
          {...common}
          type={
            field.type
          }
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
  onUpload,
}: {
  field: AdminField;

  value: string;

  onChange: (
    field: AdminField,

    event: ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) => void;

  onUpload: (
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

    if (!file) return;

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

      onUpload(
        result.url
      );
    } catch (
      uploadError
    ) {
      setError(
        uploadError instanceof
          Error
          ? uploadError.message
          : "Unable to upload image."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-3">

      <span className="text-sm">
        {field.label}
      </span>

      {value && (
        <div className="border border-line p-2">

          <img
            src={value}
            alt=""
            className="max-h-64 w-full object-cover"
          />

        </div>
      )}

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={upload}
        disabled={uploading}
        className="block w-full text-sm"
      />

      {uploading && (
        <p className="text-sm text-gold">
          Uploading to
          Cloudinary…
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      <p className="text-xs text-muted">
        Upload an image directly.
        It will automatically
        upload to Cloudinary.
      </p>

      <div className="border-t border-line pt-3">

        <p className="mb-2 text-xs text-muted">
          Or use an existing image
          URL:
        </p>

        <input
          type="url"
          value={value}
          placeholder="https://..."
          onChange={(
            event
          ) =>
            onChange(
              field,
              event
            )
          }
          className="w-full border border-line bg-transparent px-3 py-3 text-sm"
        />

      </div>

    </div>
  );
}
