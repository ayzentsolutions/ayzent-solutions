# Ayzent Solutions

Production-oriented Next.js marketing site with a MongoDB CMS and protected admin area.

## Setup
```
npm install
cp .env.example .env.local   # configure MongoDB and admin variables
npm run dev
```

## What's included
- Next.js 14 (App Router) + TypeScript + Tailwind
- Light/dark theme via `next-themes`, persisted, manual toggle in header
- Responsive public pages, SEO metadata, sitemap, robots, and optional Google Analytics
- MongoDB-backed project inquiries and newsletter subscriptions
- Protected admin dashboard and CMS management APIs with Super Admin and Editor roles
- Reusable `Button`/`ButtonLink`, `Container`, `Logo` components
- `lib/mongodb.ts` connection helper and admin session utilities
- Brand logo processed into transparent black/white PNGs in `public/logo`

## First administrator

Set `ADMIN_EMAIL`, `ADMIN_INITIAL_PASSWORD`, and a 32+ character `ADMIN_SESSION_SECRET`. The first successful login at `/admin/login` creates the Super Admin account. Remove or change `ADMIN_INITIAL_PASSWORD` after provisioning.
