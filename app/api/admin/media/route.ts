import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  v2 as cloudinary,
} from "cloudinary";

import {
  logActivity,
  requireAdmin,
} from "@/lib/admin";

export const runtime =
  "nodejs";

const allowedImageTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];

const maximumFileSize =
  10 * 1024 * 1024;

function configureCloudinary() {
  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME;

  const apiKey =
    process.env.CLOUDINARY_API_KEY;

  const apiSecret =
    process.env.CLOUDINARY_API_SECRET;

  if (
    !cloudName ||
    !apiKey ||
    !apiSecret
  ) {
    throw new Error(
      "Cloudinary environment variables are missing."
    );
  }

  cloudinary.config({
    cloud_name:
      cloudName,

    api_key:
      apiKey,

    api_secret:
      apiSecret,

    secure: true,
  });
}

export async function POST(
  request: NextRequest
) {
  try {
    const user =
      await requireAdmin(request);

    if (!user) {
      return NextResponse.json(
        {
          message:
            "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    configureCloudinary();

    const formData =
      await request.formData();

    const file =
      formData.get("file");

    if (
      !(file instanceof File)
    ) {
      return NextResponse.json(
        {
          message:
            "No image file was provided.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !allowedImageTypes.includes(
        file.type
      )
    ) {
      return NextResponse.json(
        {
          message:
            "Only JPG, JPEG, PNG, WebP and AVIF images are allowed.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      file.size >
      maximumFileSize
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

    const arrayBuffer =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(
        arrayBuffer
      );

    const uploadResult =
      await new Promise<{
        secure_url: string;
        public_id: string;
        width?: number;
        height?: number;
        format?: string;
      }>(
        (
          resolve,
          reject
        ) => {
          const uploadStream =
            cloudinary.uploader.upload_stream(
              {
                folder:
                  "ayzent-solutions",

                resource_type:
                  "image",

                use_filename:
                  true,

                unique_filename:
                  true,

                overwrite:
                  false,
              },

              (
                error,
                result
              ) => {
                if (error) {
                  reject(error);
                  return;
                }

                if (!result) {
                  reject(
                    new Error(
                      "Cloudinary returned no upload result."
                    )
                  );

                  return;
                }

                resolve({
                  secure_url:
                    result.secure_url,

                  public_id:
                    result.public_id,

                  width:
                    result.width,

                  height:
                    result.height,

                  format:
                    result.format,
                });
              }
            );

          uploadStream.end(
            buffer
          );
        }
      );

    try {
      await logActivity(
        user,
        "uploaded",
        `image: ${file.name}`
      );
    } catch {
      /*
      |--------------------------------------------------------------------------
      | Activity logging must never
      | break a successful upload.
      |--------------------------------------------------------------------------
      */
    }

    return NextResponse.json(
      {
        success: true,

        url:
          uploadResult.secure_url,

        publicId:
          uploadResult.public_id,

        width:
          uploadResult.width,

        height:
          uploadResult.height,

        format:
          uploadResult.format,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Cloudinary upload error:",
      error
    );

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to upload image.",
      },
      {
        status: 500,
      }
    );
  }
}
