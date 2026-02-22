# Amber Clone — Student Accommodation Platform

A modern, full-stack student accommodation platform built with **Next.js 16**, **Supabase**, and **Tailwind CSS**.

> 🌐 **Live Demo**: [Coming soon on Vercel]

## ✨ Features

### 🏠 Homepage
- Hero section with animated search bar
- Country-wise city browsing (UK, Australia, US, Canada, Germany, Spain, Ireland)
- Trust stats, features showcase, testimonials carousel
- Contact section with Live Chat, WhatsApp, Email

### 🔐 Authentication
- Email/Password signup & login
- Google OAuth integration
- Role-based access (Student / Landlord / Admin)
- Session management with Supabase Auth

### 🔍 Property Search
- Full-text search (city, university, property name)
- Price range & room type filters
- Sort by price, rating, or relevance
- Wishlist / favorites toggle

### 📄 Property Detail
- Image gallery with carousel navigation
- Amenities grid, description, ratings
- Sticky booking sidebar with date pickers
- Landlord contact (Chat / Call)

### 📊 Dashboard
- Stats overview (saved, bookings, messages, reviews)
- Quick action grid
- Recent bookings with status tracking

### 💾 Database
- PostgreSQL via Supabase with Row Level Security
- Tables: profiles, properties, bookings, reviews, wishlists, messages
- Auto-profile creation on signup
- Seed API for sample data

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 (App Router + RSC) |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Icons | Lucide React |
| Deployment | Vercel |

## 📁 Project Structure

```
src/
├── app/
│   ├── (main)/           # Pages with Header/Footer
│   │   ├── page.tsx      # Homepage
│   │   ├── search/       # Property search
│   │   ├── property/[id] # Property detail
│   │   └── dashboard/    # User dashboard
│   ├── auth/             # Login, Signup (no Header/Footer)
│   ├── api/seed/         # Database seeding endpoint
│   └── layout.tsx        # Root layout
├── components/
│   ├── layout/           # Header, Footer, ChatFab
│   └── home/             # Homepage sections
├── lib/
│   ├── supabase/         # Client, Server, Middleware
│   ├── queries.ts        # Server-side data fetching
│   ├── actions.ts        # Client-side mutations
│   ├── constants.ts      # App data & config
│   └── utils.ts          # Utilities
├── types/                # TypeScript definitions
└── middleware.ts         # Auth session refresh
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm
- A Supabase project

### Setup

```bash
# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Add your Supabase URL and anon key

# Run the database schema
# Go to Supabase SQL Editor and run supabase/schema.sql

# Start dev server
npm run dev
```

### Seed Sample Data
After signing up, run in browser console:
```js
fetch('/api/seed', { method: 'POST' }).then(r => r.json()).then(console.log)
```

## 📝 Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 🗺️ Roadmap

- [x] Homepage with all sections
- [x] Auth (Login/Signup)
- [x] Property search with filters
- [x] Property detail page
- [x] User dashboard
- [x] Supabase database schema
- [ ] Landlord portal (add/manage properties)
- [ ] Real booking flow with Stripe
- [ ] Real-time chat (Supabase Realtime)
- [ ] Reviews & ratings
- [ ] Map view (Google Maps / Mapbox)
- [ ] Mobile responsive testing
- [ ] PWA support

## 👤 Author

**Saharsh** — [GitHub](https://github.com/saharsh3008)

## 📄 License

MIT
