import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import {
  logActivity,
  requireAdmin,
} from "@/lib/admin";

export const runtime = "nodejs";

const imageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

cloudinary.config({
  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME,

  api_key:
    process.env.CLOUDINARY_API_KEY,

  api_secret:
    process.env.CLOUDINARY_API_SECRET,
});

export async function POST(
  request: NextRequest
) {
  const user = await requireAdmin(request);

  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const formData =
      await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          message:
            "Please select an image.",
        },
        {
          status: 400,
        }
      );
    }

    if (!imageTypes.includes(file.type)) {
      return NextResponse.json(
        {
          message:
            "Only JPG, PNG, WebP and AVIF images are supported.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      file.size >
      10 * 1024 * 1024
    ) {
      return NextResponse.json(
        {
          message:
            "Image must be smaller than 10MB.",
        },
        {
          status: 400,
        }
      );
    }

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const result =
      await new Promise<{
        secure_url: string;
        public_id: string;
      }>((resolve, reject) => {
        const uploadStream =
          cloudinary.uploader.upload_stream(
            {
              folder:
                "ayzent-solutions",
              resource_type: "image",
            },

            (error, result) => {
              if (error || !result) {
                reject(
                  error ||
                    new Error(
                      "Cloudinary upload failed."
                    )
                );

                return;
              }

              resolve({
                secure_url:
                  result.secure_url,

                public_id:
                  result.public_id,
              });
            }
          );

        uploadStream.end(buffer);
      });

    await logActivity(
      user,
      "uploaded",
      "Cloudinary media asset"
    );

    return NextResponse.json(
      {
        url: result.secure_url,
        publicId:
          result.public_id,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Cloudinary upload failed:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Unable to upload image to Cloudinary.",
      },
      {
        status: 500,
      }
    );
  }
}
