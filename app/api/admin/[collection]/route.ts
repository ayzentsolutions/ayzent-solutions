import {
  ObjectId,
} from "mongodb";

import {
  NextRequest,
  NextResponse,
} from "next/server";
import { revalidatePath } from "next/cache";

import {
  canEditCollection,
  isCmsCollection,
  validateCmsData,
} from "@/lib/cms";

import {
  logActivity,
  requireAdmin,
} from "@/lib/admin";

import {
  getDb,
} from "@/lib/mongodb";
import { csrfValid } from "@/lib/security";

export const dynamic = "force-dynamic";

const singletonCollections = [
  "siteSettings",
  "aboutContent",
];

function safeDocument(
  value: unknown
): Record<string, unknown> | null {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return null;
  }

  const entries =
    Object.entries(
      value as Record<
        string,
        unknown
      >
    ).filter(
      ([key, item]) =>
        !key.startsWith("$") &&
        key !== "_id" &&
        (
          typeof item !== "object" ||
          item === null ||
          Array.isArray(item)
        )
    );

  return Object.fromEntries(
    entries
  );
}

async function access(
  request: NextRequest,
  collection: string,
  method: "read" | "write"
) {
  if (
    !isCmsCollection(
      collection
    )
  ) {
    return null;
  }

  const user =
    await requireAdmin(request);

  if (
    !user ||
    (
      method === "write" &&
      !canEditCollection(
        collection,
        user.role
      )
    )
  ) {
    return null;
  }

  return {
    user,
    collection,
  };
}

function isSingleton(
  collection: string
) {
  return singletonCollections.includes(
    collection
  );
}

function revalidatePublicContent(
  collection: string,
  data: Record<string, unknown> = {}
) {
  try {
    // The root layout owns site settings, navigation, branding and footer data.
    revalidatePath("/", "layout");
    revalidatePath("/sitemap.xml");

    const slug = typeof data.slug === "string" ? data.slug.trim() : "";
    if (collection === "projects" && slug) revalidatePath(`/projects/${slug}`);
    if (collection === "products" && slug) revalidatePath(`/products/${slug}`);
    if (collection === "posts" && slug) revalidatePath(`/blog/${slug}`);

    if (collection === "pageContent" || collection === "pageSections") {
      const pageKey = typeof data.pageKey === "string" ? data.pageKey : "";
      if (pageKey) revalidatePath(pageKey === "search" ? "/search" : `/${pageKey}`);
    }

    if (collection === "services") revalidatePath("/services");
    if (collection === "jobs") revalidatePath("/careers");
    if (collection === "team" || collection === "aboutContent") revalidatePath("/about");
    if (collection === "categories" || collection === "tags" || collection === "comments") revalidatePath("/blog");
    if (collection === "socialLinks") revalidatePath("/contact");
  } catch (error) {
    // A cache invalidation failure should be visible in logs, but must not
    // turn a successful database write into a misleading save failure.
    console.error("CMS public cache invalidation failed", { collection, error });
  }
}

/**
 * Identifies records that represent the same logical CMS item.
 * This prevents repeat creates without deleting or rewriting existing data.
 */
function duplicateIdentity(
  collection: string,
  data: Record<string, unknown>
): Record<string, unknown> | null {
  const identityFields: Record<string, string[]> = {
    services: ["slug"],
    projects: ["slug"],
    products: ["slug"],
    posts: ["slug"],
    jobs: ["slug"],
    categories: ["slug"],
    tags: ["slug"],
    pageContent: ["pageKey"],
    pageSections: ["pageKey", "sectionKey"],
    homeSections: ["sectionKey"],
    navigation: ["label", "href", "location"],
    team: ["name"],
    testimonials: ["clientName", "quote"],
    announcements: ["title"],
    faqs: ["question"],
    socialLinks: ["label", "url"],
  };

  const fields = identityFields[collection];
  if (!fields || fields.some((field) => {
    const value = data[field];
    return typeof value !== "string" || !value.trim();
  })) {
    return null;
  }

  return Object.fromEntries(
    fields.map((field) => [
      field,
      (data[field] as string).trim(),
    ])
  );
}

/*
|--------------------------------------------------------------------------
| GET
|--------------------------------------------------------------------------
*/

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ collection: string }>;
  }
) {
  try {
    const collection =
      (await params).collection;

    const result =
      await access(
        request,
        collection,
        "read"
      );

    if (!result) {
      return NextResponse.json(
        {
          message:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const db =
      await getDb();

    /*
    | Singleton
    */

    if (
      isSingleton(
        result.collection
      )
    ) {
      const item =
        await db
          .collection(
            result.collection
          )
          .find()
          .sort({
            createdAt: 1,
          })
          .limit(1)
          .next();

      return NextResponse.json({
        items: item
          ? [item]
          : [],
      });
    }

    /*
    | Normal Collection
    */

    const limit = Math.min(
      Number(
        request.nextUrl.searchParams.get(
          "limit"
        )
      ) || 50,
      100
    );

    const items =
      await db
        .collection(
          result.collection
        )
        .find()
        .sort({
          displayOrder: 1,
          createdAt: -1,
        })
        .limit(limit)
        .toArray();

    return NextResponse.json({
      items,
    });
  } catch (error) {
    console.error("Admin collection GET failed", {
      collection: (await params).collection,
      error,
    });

    return NextResponse.json(
      {
        message:
          "Unable to load content.",
      },
      {
        status: 500,
      }
    );
  }
}

async function validateAndPrepare(
  collection: string,
  data: Record<string, unknown>,
  id?: string
) {
  if (
    !isCmsCollection(
      collection
    )
  ) {
    return {
      error:
        "Invalid collection.",
    };
  }

  const errors =
    validateCmsData(
      collection,
      data
    );

  if (errors.length) {
    return {
      error:
        errors.join(" "),
    };
  }

  const db =
    await getDb();

  const identity = duplicateIdentity(collection, data);
  if (identity) {
    const duplicate = await db.collection(collection).findOne({
      ...identity,
      ...(id && ObjectId.isValid(id) ? { _id: { $ne: new ObjectId(id) } } : {}),
    });
    if (duplicate) {
      return { error: "An entry with the same identifying details already exists." };
    }
  }

  if (
    (
      collection === "projects" || collection === "products" ||
      collection === "posts"
    ) &&
    data.slug
  ) {
    /*
     * Do not build the unique index during a user request.
     * Legacy duplicate slugs can make MongoDB reject createIndex()
     * and turn a normal product create into a 500.
     */
    const duplicate =
      await db
        .collection(collection)
        .findOne({
          slug: data.slug,

          ...(id
            ? {
                _id: {
                  $ne:
                    new ObjectId(
                      id
                    ),
                },
              }
            : {}),
        });

    if (duplicate) {
      return {
        error:
          "This slug is already in use.",
      };
    }
  }

  return {
    db,
  };
}

/*
|--------------------------------------------------------------------------
| POST
|--------------------------------------------------------------------------
*/

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ collection: string }>;
  }
) {
  if (!csrfValid(request)) return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  const result =
    await access(
      request,
      (await params).collection,
      "write"
    );

  if (!result) {
    return NextResponse.json(
      {
        message:
          "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const body =
    await request.json();

  const data =
    safeDocument(
      body.data
    );

  if (!data) {
    return NextResponse.json(
      {
        message:
          "Invalid data.",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const prepared =
      await validateAndPrepare(
        result.collection,
        data
      );

    if (prepared.error) {
      return NextResponse.json(
        {
          message:
            prepared.error,
        },
        {
          status: 400,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | SINGLETON
    |--------------------------------------------------------------------------
    */

    if (
      isSingleton(
        result.collection
      )
    ) {
      const existing =
        await prepared.db!
          .collection(
            result.collection
          )
          .findOne();

      if (existing) {
        await prepared.db!
          .collection(
            result.collection
          )
          .updateOne(
            {
              _id:
                existing._id,
            },
            {
              $set: {
                ...data,
                updatedAt:
                  new Date(),
              },
            }
          );

        await logActivity(
          result.user,
          "updated",
          `${result.collection} settings`
        );
        revalidatePublicContent(result.collection, data);

        return NextResponse.json(
          {
            id:
              existing._id,
          },
          {
            status: 200,
          }
        );
      }
    }

    /*
    |--------------------------------------------------------------------------
    | INSERT
    |--------------------------------------------------------------------------
    */

    const now =
      new Date();

    const inserted =
      await prepared.db!
        .collection(
          result.collection
        )
        .insertOne({
          ...data,

          createdAt: now,

          updatedAt: now,
        });

    try {
      await logActivity(
        result.user,
        "created",
        `${result.collection} entry`
      );
    } catch (activityError) {
      console.error("Admin activity log failed after create", activityError);
    }
    revalidatePublicContent(result.collection, data);

    return NextResponse.json(
      {
        id:
          inserted.insertedId,
      },
      {
        status: 201,
      }
    );
  } catch (
    error
  ) {
    if (
      (
        error as {
          code?: number;
        }
      ).code === 11000
    ) {
      return NextResponse.json(
        {
          message:
            "This slug is already in use.",
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json(
      {
        message:
          "Unable to save content.",
      },
      {
        status: 500,
      }
    );
  }
}

/*
|--------------------------------------------------------------------------
| PATCH
|--------------------------------------------------------------------------
*/

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ collection: string }>;
  }
) {
  if (!csrfValid(request)) return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  const result =
    await access(
      request,
      (await params).collection,
      "write"
    );

  if (!result) {
    return NextResponse.json(
      {
        message:
          "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const body =
    await request.json();

  const data =
    safeDocument(
      body.data
    );

  if (
    !data ||
    !ObjectId.isValid(
      body.id
    )
  ) {
    return NextResponse.json(
      {
        message:
          "Invalid update.",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const prepared =
      await validateAndPrepare(
        result.collection,
        data,
        body.id
      );

    if (prepared.error) {
      return NextResponse.json(
        {
          message:
            prepared.error,
        },
        {
          status: 400,
        }
      );
    }

    const updateResult = await prepared.db!
      .collection(
        result.collection
      )
      .updateOne(
        {
          _id:
            new ObjectId(
              body.id
            ),
        },
        {
          $set: {
            ...data,

            updatedAt:
              new Date(),
          },
        }
      );

    if (!updateResult.matchedCount) {
      return NextResponse.json({ message: "Entry not found. Reload the CMS and try again." }, { status: 404 });
    }

    try {
      await logActivity(
        result.user,
        "updated",
        `${result.collection} entry`
      );
    } catch (activityError) {
      console.error("Admin activity log failed after update", activityError);
    }
    revalidatePublicContent(result.collection, data);

    return NextResponse.json({
      ok: true,
    });
  } catch (
    error
  ) {
    if (
      (
        error as {
          code?: number;
        }
      ).code === 11000
    ) {
      return NextResponse.json(
        {
          message:
            "This slug is already in use.",
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json(
      {
        message:
          "Unable to update content.",
      },
      {
        status: 500,
      }
    );
  }
}

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ collection: string }>;
  }
) {
  if (!csrfValid(request)) return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  const result =
    await access(
      request,
      (await params).collection,
      "write"
    );

  if (!result) {
    return NextResponse.json(
      {
        message:
          "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  /*
  | Do not allow singleton deletion.
  */

  if (
    isSingleton(
      result.collection
    )
  ) {
    return NextResponse.json(
      {
        message:
          "This settings page cannot be deleted.",
      },
      {
        status: 400,
      }
    );
  }

  const id =
    request.nextUrl.searchParams.get(
      "id"
    );

  if (
    !id ||
    !ObjectId.isValid(id)
  ) {
    return NextResponse.json(
      {
        message:
          "Invalid entry.",
      },
      {
        status: 400,
      }
    );
  }

  const deleteDb = await getDb();
  const collection = deleteDb.collection(result.collection);
  const existing = await collection.findOne({ _id: new ObjectId(id) });
  const deleted = await collection.deleteOne({ _id: new ObjectId(id) });

  if (!deleted.deletedCount) {
    return NextResponse.json({ message: "Entry not found. It may already have been deleted." }, { status: 404 });
  }

  try {
    await logActivity(
      result.user,
      "deleted",
      `${result.collection} entry`
    );
  } catch (activityError) {
    console.error("Admin activity log failed after delete", activityError);
  }
  revalidatePublicContent(result.collection, (existing || {}) as Record<string, unknown>);

  return NextResponse.json({
    ok: true,
  });
}
