<div align="center">
  <img src="https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1000&h=400&fit=crop" alt="Nivaas Banner" style="border-radius: 12px; margin-bottom: 20px;">

  # Nivaas 🏠✨  
  *The modern, premium student accommodation platform.*

  [![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)

  <br />
  
  [**View Live Demo**](#) • [**Report Bug**](#) • [**Request Feature**](#)
</div>

---

## 🌟 Overview

**Nivaas** (formerly amber-clone) is a state-of-the-art, full-stack student accommodation platform designed to help students globally find their perfect "Home away from Home."

It was crafted from the ground up to feature an incredibly immersive **Glassmorphism UI**, fluid micro-animations, and a highly responsive layout powered by Next.js and Tailwind CSS v4. On the backend, Nivaas leverages **Supabase** for secure authentication, real-time messaging between students and landlords, and robust PostgreSQL data management.

---

## 🔥 Key Features

### 🎨 Premium Glassmorphism UI
- **Plus Jakarta Sans** typography providing a sleek, modern startup aesthetic.
- Interactive, multi-colored gradient tags and badges.
- Frosted glass (`backdrop-blur`) utility cards, floating sticky headers, and smooth drop-shadow handling.
- Pill-shaped tab interfaces and micro-animations tied to hover states.

### 🔐 Secure & Seamless Authentication
- Fully integrated **Supabase Auth** handling Email/Password setup.
- Automatic User Profile generation via PostgreSQL triggers.
- Dynamic layout adaptations based on authentication state (e.g., custom Dashboard dropdowns).

### 🔍 Powerful Property Discovery
- **Global Reach**: Browse accommodations by country (UK, US, Australia, etc.) or specific cities.
- **Dynamic Search**: Interactive hero-section search bar connected straight to the filtered query engine.
- **Complex Filtering**: Real-time filtering by price sliders, room types, and relevance sorting.
- **Wishlist Engine**: Instantly save or unsave properties to your account wishlist.

### 📅 Booking & Management
- Sticky sidebar booking widget allowing dynamic check-in and check-out selection.
- Detailed receipt breakdowns (Deposit logic, months calculator, and tax tracking).
- Dynamic Dashboard displaying active bookings, saved properties, and quick actions.

### 💬 Real-Time Landlord Messaging
- Fully integrated real-time chats using **Supabase Realtime subscriptions**.
- Contact landlords directly from the property page and negotiate instantly in the dashboard messaging portal.
- Instantly syncs new messages across all user sessions.

---

## 🛠️ Technology Stack

| Architecture | Technologies |
|--------------|--------------|
| **Frontend Framework** | Next.js 15+ (App Router, Server Actions, RSC) |
| **Styling** | Tailwind CSS v4, Lucide React (Icons) |
| **Database** | Supabase (PostgreSQL), Row Level Security (RLS) |
| **Authentication** | Supabase Auth (Middleware protected routes) |
| **Real-Time** | Supabase Realtime Channels |
| **Deployment** | Vercel (Configured for Edge and Node runtimes) |

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── (main)/             # Core Pages (Search, Property, Dashboard)
│   │   ├── dashboard/      # Protected user control panel & Real-time Messages
│   │   ├── property/[id]/  # Dynamic property listings & Booking checkout
│   │   ├── search/         # The Grid, sorting, and filter logic
│   │   └── page.tsx        # Immersive Hero & Home Page Sections
│   ├── auth/               # Login & Registration Flows
│   ├── api/seed/           # Dummy data generation API
│   ├── layout.tsx          # Root Layout & Font Definitions
│   └── globals.css         # Custom Theme Variables & Glass Utilities
├── components/
│   ├── layout/             # Sticky Header, Footer, Notification Dropdown
│   ├── home/               # Modular Homepage Sections (Hero, Cities, Stats)
│   ├── property/           # Grid Cards, Details, Image Carousels
│   └── dashboard/          # Chat Interface, List Forms, Notification Panels
├── lib/
│   ├── supabase/           # Next.js SSR Supabase Clients
│   ├── actions.ts          # Server Actions (Mutations, Booking creation)
│   ├── queries.ts          # Read-only Server Queries
│   └── constants.ts        # Global static configurations
└── middleware.ts           # Supabase Session Refresh mechanism
```

---

## 🚀 Getting Started

Follow these steps to get a local copy up and running quickly!

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or pnpm
- A Supabase Project (Create one for free at [supabase.com](https://supabase.com))

### 2. Setup

Clone the repository and install dependencies:
```bash
git clone https://github.com/saharsh3008/project_pg.git
cd project_pg
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root of your project:
```bash
cp .env.local.example .env.local
```
Update `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Database Initialization
Go to your Supabase project dashboard -> **SQL Editor** and paste the contents of `supabase/schema.sql`. This will:
- Create all necessary tables (`profiles`, `properties`, `messages`, `bookings`, `wishlists`, `reviews`).
- Setup Row Level Security (RLS) policies.
- Build trigger functions to auto-create profiles on user sign-up.

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### 6. Seed Sample Data (Optional)
To test the platform, you can seed it with sample properties! Create an account via the UI, then open your browser's Developer Console and run:
```javascript
fetch('/api/seed', { method: 'POST' })
  .then(res => res.json())
  .then(console.log);
```

---

## 🗺️ Roadmap & Milestones

- [x] Immersive Homepage & Hero Redesign
- [x] Secure Auth (Login/Signup via Supabase)
- [x] Advanced Property Search engine with debounced filters
- [x] Property Listing Details, Maps, and Amenities
- [x] Dynamic User Dashboard & Notification Panel
- [x] Advanced Drop-in Booking Flow
- [x] **Real-Time Landlord/Student Messaging System**
- [ ] Stripe Payment Gateway Integration
- [ ] Multi-User Role Segregation (Landlord specific portal views)
- [ ] Automated Review verification & calculation

---

## 👤 Author

Developed by **Saharsh**  
[GitHub](https://github.com/saharsh3008)

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.
