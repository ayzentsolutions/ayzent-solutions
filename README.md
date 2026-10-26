# Ayzent Solutions

Ayzent Solutions' website is a Next.js App Router application with a MongoDB-backed CMS and a protected administration area.

## Technology

- Next.js 16, React 19 and TypeScript
- Tailwind CSS 3
- MongoDB for CMS content, inquiries and newsletter subscriptions
- Cloudinary environment settings for media integrations
- Optional Resend email notifications for inquiry submissions

## Local setup

Use a supported Node.js version for the installed Next.js release.

```bash
npm install
cp .env.example .env.local
```

Fill in the required values in `.env.local` for your own environment, then start the development server:

```bash
npm run dev
```

Do not commit `.env.local`, API keys, database URLs or administrator passwords.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `MONGODB_DB` | Database name |
| `NEXT_PUBLIC_SITE_URL` | Public site base URL used by metadata, canonical URLs, robots and the sitemap |
| `ADMIN_EMAIL` | Email address for the initial administrator |
| `ADMIN_INITIAL_PASSWORD` | Temporary initial administrator password |
| `ADMIN_SESSION_SECRET` | Unique session secret of at least 32 characters |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Optional media integration settings |
| `RESEND_API_KEY` | Optional inquiry notification email provider key |
| `RESEND_FROM_EMAIL` | Sender identity verified with the selected email provider |
| `INQUIRY_NOTIFICATION_EMAIL` | Recipient for inquiry notifications |

Inquiry records are stored separately from email notification delivery. Configure all three Resend variables to enable notification email. A missing or failed notification does not undo an inquiry already saved to MongoDB.

## CMS workflow

1. Sign in through the administrator login page using the configured administrator account.
2. Edit the relevant CMS collection or site settings.
3. Preview the changes where the CMS provides a preview.
4. Publish changes only after checking the content, links and images.

Public collection queries exclude draft and archived records. Portfolio projects, articles, FAQs, testimonials and company-story details should be published only when the information is genuine and approved. An empty CMS collection should remain empty rather than displaying invented examples.

## Validation commands

```bash
npm run lint
npm run test
npx tsc --noEmit
npm run build
```

The test command runs Node's built-in test runner against `tests/**/*.test.mjs`. Run the commands in the repository environment with dependencies installed. Production builds may require the configured environment variables and access to the configured database.

## Initial administrator

Set `ADMIN_EMAIL`, `ADMIN_INITIAL_PASSWORD` and a unique `ADMIN_SESSION_SECRET` before first login. The first successful login provisions the Super Admin account. Replace or remove the initial password after provisioning. Never store production credentials in source control.
