# 🚐 TourHub - A+ Grade Graduation Project

TourHub is a premium, full-stack adventure booking platform designed specifically for the Pakistani travel market. It features a modern design, high-grade security, and atomic booking transactions to ensure a market-ready experience.

## 🚀 Killer Features
- **Bus Seat Selection**: Interactive, bus-style layout for seat selection.
- **Dynamic Pricing (Fuel Multiplier)**: Operators can adjust prices platform-wide based on fuel inflation.
- **Local Payment Support**: Integrated UI for Easypaisa, JazzCash, and NayaPay.
- **Partial Payment Logic**: Users can pay a 20% deposit to lock seats.
- **Security Verification**: Mandatory CNIC and emergency contact collection.
- **AI Trip Planner**: Intelligent itinerary generation for custom adventures.

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase / PostgreSQL
- **ORM**: Prisma
- **Auth**: Auth.js / NextAuth (Role-based: Admin, Operator, User)
- **Styling**: Tailwind CSS & Shadcn UI
- **Icons**: Lucide React & Custom Brand SVGs

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/raza0310/tourhub.git
cd tourhub
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="your_postgresql_url"
DIRECT_URL="your_direct_database_url"
NEXTAUTH_SECRET="your_secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Database Initialization
```bash
npx prisma generate
npx prisma db push
```

### 5. Run Development Server
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Architecture
- `/src/app`: App router and API endpoints.
- `/src/components`: Reusable UI components and complex wizards.
- `/prisma`: Database schema and migration logic.
- `/src/lib`: Database client and shared utilities.

## 🛡️ License
This project is for educational/graduation purposes. All rights reserved.

---
Made with ❤️ in Pakistan 🇵🇰
