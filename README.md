# SkilledBoys — Local Services Marketplace

**Connecting local experts in one click.**  
*"काम कोई भी हो, सिर्फ़ एक क्लिक, और हर काम आसान।"*

SkilledBoys is a modernized full-stack web platform for discovering trusted local service professionals and empowering blue-collar technicians with online profiles, real-time availability toggling, and direct customer leads.

The platform has been completely modernized into a startup-grade **Next.js (App Router), React, TypeScript, Tailwind CSS, and Framer Motion** frontend while preserving and enhancing the original **Node.js, Express.js and MongoDB** backend architecture.

---

## 🌟 Modern Tech Stack

### Frontend (Modernized)
- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19, TypeScript
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **UI Components:** Custom components inspired by shadcn/ui (Button, Card, Badge, Input, Select, Modal, Toast)
- **Icons:** Lucide React
- **Animations:** Framer Motion, dynamic typing effect, animated stat counters, smooth carousels

### Backend (Node.js & Express)
- **Runtime & Framework:** Node.js, Express.js 5
- **Database:** MongoDB & Mongoose
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs password hashing
- **Environment Management:** dotenv with fallback graceful resilience

---

## 📁 Repository Structure

```text
Skilledboys/
├── backend/
│   ├── server.js                      # Express API server with Worker, Inquiry & Admin routes
│   ├── test-server-integration.js     # Automated backend integration test suite
│   ├── check-db.js                    # Database connection verifier
│   ├── add-sample-data.js             # Sample data population
│   ├── package.json                   # Backend dependencies (express, mongoose, bcryptjs, jwt, dotenv)
│   └── .env.example                   # Backend environment configuration
│
├── frontend/
│   ├── src/
│   │   ├── app/                       # Next.js App Router routes
│   │   │   ├── layout.tsx             # Root layout (Metadata, Glassmorphism Navbar, Footer, WhatsApp)
│   │   │   ├── page.tsx               # Modern Homepage (Hero, Stats, How it works, Carousel, Testimonials)
│   │   │   ├── find-workers/page.tsx  # Interactive search portal with instant filters
│   │   │   ├── categories/page.tsx    # 20+ service categories with live keyword search
│   │   │   ├── areas/page.tsx         # Pan-India service cities directory
│   │   │   ├── about/page.tsx         # Story, Mission, Why Us & Leadership Team
│   │   │   ├── contact/page.tsx       # Support portal with inquiry submissions
│   │   │   ├── results/page.tsx       # Worker search results with direct calling
│   │   │   ├── workers/[id]/page.tsx  # Detailed worker profile portfolio
│   │   │   ├── worker-login/page.tsx  # Worker authentication
│   │   │   ├── worker-register/page.tsx # Worker onboarding form
│   │   │   ├── worker-dashboard/page.tsx # Worker control panel with live availability switch & job leads
│   │   │   ├── login/page.tsx         # Customer sign in
│   │   │   ├── register/page.tsx      # Customer registration with user/worker role switch
│   │   │   └── admin/
│   │   │       ├── login/page.tsx     # Administrator sign in
│   │   │       └── dashboard/page.tsx # Complete Admin CRUD & KPI analytics dashboard
│   │   ├── components/
│   │   │   ├── ui/                    # Reusable shadcn-style components (Button, Card, Badge, Modal, Toast)
│   │   │   ├── layout/                # Navbar, Footer, Floating WhatsApp
│   │   │   ├── home/                  # HeroSection, StatsSection, HowItWorks, CategoryCarousel, Testimonials
│   │   │   ├── workers/               # WorkerCard, WorkerFilter
│   │   │   └── common/                # LoadingSpinner, Skeletons
│   │   ├── services/
│   │   │   └── api.ts                 # Centralized type-safe API client layer
│   │   ├── hooks/
│   │   │   ├── useAuth.ts             # Auth state management for workers & admin
│   │   │   └── useFavorites.ts        # Saved workers persistence hook
│   │   ├── types/
│   │   │   └── index.ts               # Shared TypeScript interfaces
│   │   └── lib/
│   │       ├── utils.ts               # Tailwind merge & utility helpers
│   │       └── constants.ts           # Categories, cities, team members, reviews, stats
│   ├── public/                        # Static assets, logos, and service category imagery
│   ├── legacy/                        # Preserved original HTML/CSS/JS frontend files
│   ├── tailwind.config.ts             # Tailwind CSS theme configuration
│   ├── tsconfig.json                  # TypeScript compiler settings
│   └── package.json                   # Frontend dependencies & Next.js scripts
│
├── package.json                       # Root convenience workspace scripts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested with Node 23.x)
- npm or pnpm
- MongoDB connection string (Atlas or local instance)

---

### 1. Run the Backend API

```bash
cd backend
npm install
node server.js
```

Or configure `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/SkilledBoys
JWT_SECRET=your_secure_jwt_secret_key_here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

The Express API will run on `http://localhost:5000`.

---

### 2. Run the Next.js Frontend

In a separate terminal window:

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ API Endpoints Summary

| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| GET | `/` | API Health & status | Public |
| GET | `/api/health` | Health check probe | Public |
| GET | `/api/workers` | Search workers by category, location, rating | Public |
| POST | `/api/workers/register` | Register new worker pro | Public |
| POST | `/api/workers/login` | Authenticate worker & get JWT | Public |
| GET | `/api/workers/profile` | Get signed-in worker profile | JWT Required |
| PUT | `/api/workers/status/:id` | Toggle live availability status | JWT Required (Own profile) |
| PUT | `/api/workers/:id` | Update profile fields | JWT Required (Own profile) |
| POST | `/api/contact` | Submit customer support inquiry | Public |
| POST | `/api/admin/login` | Administrator authentication | Admin |
| GET | `/api/admin/stats` | Platform KPIs & distribution metrics | Admin JWT |
| GET | `/api/admin/workers` | Full worker listings with search & filter | Admin JWT |
| POST | `/api/admin/workers` | Admin create worker (CRUD - Create) | Admin JWT |
| GET | `/api/admin/workers/:id`| Admin get worker details (CRUD - Read) | Admin JWT |
| PUT | `/api/admin/workers/:id`| Admin update worker (CRUD - Update) | Admin JWT |
| DELETE | `/api/admin/workers/:id`| Admin delete worker (CRUD - Delete) | Admin JWT |
| GET | `/api/admin/inquiries` | View customer contact inquiries | Admin JWT |

---

## 🔑 Admin Credentials (Default)

- **URL:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Username:** `admin`
- **Password:** `admin123`

---

## 📱 Features & Highlights

1. **Brand Identity:** Preserved original brand colors, logos, tagline *"Connecting local experts in one click"* and Hindi mission motto.
2. **Dynamic Hero:** Interactive typing text, role picker (Customer vs Worker), quick search box with immediate results.
3. **20+ Categories & 15+ Cities:** Rich service exploration with live keyword filtering and instant category search links.
4. **Direct Contact:** 1-click phone calling (`tel:`) without middleman fees or commissions.
5. **Worker Availability:** Real-time on/off duty status toggle in worker dashboard reflected across search results.
6. **Full Admin Control Panel:** Complete CRUD operations for worker listings, real-time KPI metrics, and customer inquiry management.
7. **Type-Safe Architecture:** Comprehensive TypeScript interfaces, clean service layer, and resilient error handling.

---

## Author

**Abhishek Mishra**  
Repository: https://github.com/abhishekmishr07/Skilledboys
