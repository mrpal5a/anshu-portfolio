# Anshu Portfolio — Next.js 14

Professional portfolio + blog + admin dashboard built with Next.js 14, Tailwind CSS, Supabase, and Framer Motion.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, RSC) |
| Styling | Tailwind CSS + custom design tokens |
| Animations | Framer Motion |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Email | Resend |
| Hosting | Vercel |
| DNS | Cloudflare |

## Setup — Step by Step

### 1. Install dependencies
```bash
npm install
```

### 2. Environment variables
```bash
cp .env.local.example .env.local
# Fill in your values
```

### 3. Supabase setup
1. Create project at supabase.com
2. Go to SQL Editor → run `supabase-schema.sql`
3. Go to Authentication → create your admin account
4. Copy URL and anon key to `.env.local`

### 4. Resend setup (email notifications)
1. Sign up at resend.com (free)
2. Get API key → add to `.env.local`

### 5. Run locally
```bash
npm run dev
# → http://localhost:3000
```

### 6. Deploy to Vercel
```bash
# Push to GitHub, import repo in Vercel
# Add all env vars in Vercel dashboard
# Done — live in 30 seconds
```

## URLs

| URL | Description |
|---|---|
| `/` | Public homepage |
| `/blog` | Blog list |
| `/blog/[slug]` | Individual blog post |
| `/login` | Admin login |
| `/admin` | Admin dashboard |
| `/admin/posts` | Manage blog posts |
| `/admin/projects` | Manage portfolio projects |
| `/admin/messages` | View contact form submissions |

## What to Update Before Going Live

1. **Name** — search for `Anshu` and replace with your full name
2. **Email** — update `your@email.com` in Contact section and `.env.local`
3. **WhatsApp** — update `91XXXXXXXXXX` in Contact and WhatsAppFloat
4. **LinkedIn** — update profile URL in Contact section
5. **Prices** — update service pricing in `components/sections/Services.tsx`
6. **Site URL** — set `NEXT_PUBLIC_SITE_URL` in Vercel env vars
7. **Domain** — add custom domain in Vercel dashboard
