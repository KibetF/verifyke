# VerifyKe - Independent Property Verification

Professional third-party property verification platform for Kenya. Conducts inspections, captures GPS data, uploads photo/video evidence, generates reports, and manages bookings.

## Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** TailwindCSS
- **Database:** Supabase PostgreSQL via Prisma ORM
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage (media uploads)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A Supabase project (free tier works)

### 1. Clone and install

```bash
git clone <repo-url>
cd verifyke
npm install
```

### 2. Configure environment

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env
```

Get your credentials from your [Supabase Dashboard](https://app.supabase.com):
- `NEXT_PUBLIC_SUPABASE_URL` — Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon/public key
- `DATABASE_URL` — Connection string (Settings > Database > Connection string > URI)

### 3. Set up the database

Generate Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Seed the database (optional)

```bash
npx prisma db seed
```

This creates sample users:
- **Admin:** admin@verifyke.com
- **Agent:** agent@verifyke.com
- **Client:** client@verifyke.com

> Note: You must also create these users in Supabase Auth (Dashboard > Authentication > Users) with matching email addresses and passwords.

### 5. Set up Supabase Storage

In your Supabase Dashboard:
1. Go to Storage
2. Create a bucket called `media`
3. Set it to public (for MVP)

### 6. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── app/
│   ├── page.tsx              # Landing page
│   ├── login/                # Login page
│   ├── signup/               # Signup page
│   ├── dashboard/            # Client dashboard
│   │   ├── properties/       # Property management
│   │   ├── book/             # Book verification service
│   │   ├── requests/         # View service requests
│   │   └── reports/          # View inspection reports
│   ├── admin/                # Admin dashboard
│   │   └── reports/          # All reports view
│   ├── agent/                # Agent dashboard
│   │   └── report/           # Submit inspection report
│   ├── api/                  # API routes
│   └── actions.ts            # Server actions
├── components/               # Shared UI components
├── lib/                      # Utilities
│   ├── auth.ts               # Auth helpers
│   ├── pricing.ts            # Pricing logic
│   ├── prisma.ts             # Prisma client
│   └── supabase/             # Supabase clients
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed script
└── types/                    # TypeScript types
```

## User Roles

| Role   | Access                                    |
|--------|-------------------------------------------|
| Client | Add properties, book services, view reports |
| Agent  | View assigned requests, submit reports     |
| Admin  | View all requests, assign agents, manage   |

## Pricing (KES)

| Service  | Base Price | Distance Fees                    |
|----------|-----------|-----------------------------------|
| Quick    | 3,000     | 0-15km: Free                      |
| Standard | 8,000     | 15-40km: +1,000                   |
| Premium  | 15,000    | 40-80km: +2,500 / 80+: Manual    |

## Deploy to Vercel

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy

Prisma will auto-generate on `postinstall`.
