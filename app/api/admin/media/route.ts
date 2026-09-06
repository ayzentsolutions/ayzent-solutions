import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import {
  logActivity,
  requireAdmin,
} from "@/lib/admin";

export const runtime = "nodejs";

const allowedImageTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];

export async function POST(
  request: NextRequest
) {
  try {
    console.log(
      "=== CLOUDINARY UPLOAD STARTED ==="
    );

    /*
    |--------------------------------------------------------------------------
    | Check authentication
    |--------------------------------------------------------------------------
    */

    const user =
      await requireAdmin(request);

    if (!user) {
      console.error(
        "Media upload failed: Unauthorized"
      );

      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Check environment variables
    |--------------------------------------------------------------------------
    */

    const cloudName =
      process.env.CLOUDINARY_CLOUD_NAME;

    const apiKey =
      process.env.CLOUDINARY_API_KEY;

    const apiSecret =
      process.env.CLOUDINARY_API_SECRET;

    console.log(
      "Cloudinary configuration:",
      {
        cloudName: Boolean(cloudName),
        apiKey: Boolean(apiKey),
        apiSecret: Boolean(apiSecret),
        environment:
          process.env.VERCEL_ENV ||
          process.env.NODE_ENV,
      }
    );

    if (
      !cloudName ||
      !apiKey ||
      !apiSecret
    ) {
      console.error(
        "Cloudinary environment variables are missing."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Cloudinary configuration is missing on the server.",
        },
        {
          status: 500,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Configure Cloudinary
    |--------------------------------------------------------------------------
    */

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    /*
    |--------------------------------------------------------------------------
    | Get uploaded file
    |--------------------------------------------------------------------------
    */

    const formData =
      await request.formData();

    const file =
      formData.get("file");

    if (!(file instanceof File)) {
      console.error(
        "Media upload failed: No file provided."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "No image file was provided.",
        },
        {
          status: 400,
        }
      );
    }

    console.log(
      "File received:",
      {
        name: file.name,
        type: file.type,
        size: file.size,
      }
    );

    /*
    |--------------------------------------------------------------------------
    | Validate image type
    |--------------------------------------------------------------------------
    */

    if (
      !allowedImageTypes.includes(
        file.type
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only JPG, JPEG, PNG, WebP and AVIF images are allowed.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Validate size
    |--------------------------------------------------------------------------
    */

    const maximumFileSize =
      10 * 1024 * 1024;

    if (
      file.size >
      maximumFileSize
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Image must be smaller than 10MB.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Convert image to Buffer
    |--------------------------------------------------------------------------
    */

    const arrayBuffer =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(
        arrayBuffer
      );

    console.log(
      "Uploading image to Cloudinary..."
    );

    /*
    |--------------------------------------------------------------------------
    | Upload to Cloudinary
    |--------------------------------------------------------------------------
    */

    const result =
      await new Promise<{
        secure_url: string;
        public_id: string;
        width: number;
        height: number;
        format: string;
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
                uploadResult
              ) => {
                if (error) {
                  console.error(
                    "Cloudinary API error:",
                    {
                      message:
                        error.message,

                      name:
                        error.name,
                    }
                  );

                  reject(error);

                  return;
                }

                if (
                  !uploadResult
                ) {
                  reject(
                    new Error(
                      "Cloudinary returned no upload result."
                    )
                  );

                  return;
                }

                console.log(
                  "Cloudinary upload successful:",
                  {
                    publicId:
                      uploadResult.public_id,

                    format:
                      uploadResult.format,
                  }
                );

                resolve({
                  secure_url:
                    uploadResult.secure_url,

                  public_id:
                    uploadResult.public_id,

                  width:
                    uploadResult.width,

                  height:
                    uploadResult.height,

                  format:
                    uploadResult.format,
                });
              }
            );

          uploadStream.end(buffer);
        }
      );

    /*
    |--------------------------------------------------------------------------
    | Log activity
    |--------------------------------------------------------------------------
    */

    try {
      await logActivity(
        user,
        "uploaded",
        `Cloudinary image: ${file.name}`
      );
    } catch (error) {
      console.error(
        "Activity logging failed:",
        error
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Success
    |--------------------------------------------------------------------------
    */

    return NextResponse.json(
      {
        success: true,

        url:
          result.secure_url,

        publicId:
          result.public_id,

        width:
          result.width,

        height:
          result.height,

        format:
          result.format,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "=== CLOUDINARY UPLOAD FAILED ==="
    );

    console.error(error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Unknown server error.";

    return NextResponse.json(
      {
        success: false,

        message:
          `Upload failed: ${errorMessage}`,
      },
      {
        status: 500,
      }
    );
  }
}
