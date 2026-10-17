# SkilledBoys — Local Services Marketplace

SkilledBoys is a full-stack web application concept for discovering local service professionals and helping workers create an online profile. The repository contains a static HTML/CSS/JavaScript frontend and a Node.js/Express API backed by MongoDB.

**Live website:** https://www.skilledboys.com


## Project highlights

- Browse service categories and locations.
- Search and view worker listings.
- Worker registration and login with password hashing.
- JWT-based worker authentication.
- Authenticated worker profile and availability status endpoints.
- REST API built with Express and MongoDB/Mongoose.

> **Assessment note:** This is a student project. Job alerts shown in the worker dashboard are demo data; they are not connected to a production job-management system.

## Technology stack

- **Frontend:** HTML, CSS, JavaScript, Tailwind CSS (CDN on selected pages)
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas or a local MongoDB instance, through Mongoose
- **Authentication:** JSON Web Tokens (JWT) and bcryptjs

## Repository structure

```text
Skilledboys/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── index.html
│   ├── landing.html
│   ├── category.html
│   ├── login.html
│   ├── register.html
│   ├── worker-login.html
│   ├── worker-register.html
│   └── worker-dashboard.html
├── img/
├── .gitignore
└── README.md
```

## Run locally

### Prerequisites

- Node.js 18 or newer
- npm
- MongoDB connection string (Atlas or local)

### 1. Configure the backend

Open a terminal in the repository root:

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` from inside the `backend/` directory, then set your own values. Never commit `.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/SkilledBoys
JWT_SECRET=replace_with_a_long_random_secret
```

For MongoDB Atlas, use your own Atlas connection string as `MONGO_URI`. URL-encode special characters in the database username/password. Use a unique, randomly generated JWT secret.

Start the API:

```bash
npm start
```

The API root should return a short status message and `/api/health` should return a JSON health response.

### 2. Open the frontend

Open `frontend/index.html` using a local static server or your editor's Live Server extension. Some pages currently use a deployed API URL directly; update those URLs to your local API when testing locally.

## API endpoints

| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| GET | `/` | API status | Public |
| GET | `/api/health` | Health check | Public |
| POST | `/api/workers/register` | Register a worker | Public |
| POST | `/api/workers/login` | Authenticate a worker | Public |
| GET | `/api/workers` | Search workers by category/location | Public |
| GET | `/api/workers/profile` | Get the signed-in worker's profile | JWT required |
| PUT | `/api/workers/status/:id` | Toggle own availability | JWT required; own profile only |
| PUT | `/api/workers/:id` | Update allowed profile fields | JWT required; own profile only |

Send the JWT in the request header as `Authorization: Bearer <token>`.

## Security

- Keep `.env`, database credentials, and JWT secrets out of Git.
- If a credential has ever been committed to a public repository, rotate it; removing it from the latest commit is not enough.
- Configure a strong `JWT_SECRET` and a valid `MONGO_URI` in the hosting provider's environment settings.
- Do not use real customer or worker personal data in demo screenshots.

## Current limitations

- Job alerts on the worker dashboard are hard-coded demonstration data.
- Frontend pages use static HTML rather than a component framework.
- Production deployment URLs may need to be configured consistently before local or hosted end-to-end testing.
- Automated API integration tests and deployment checks should be added before production use.

## Author

**Abhishek Mishra**

Repository: https://github.com/abhishekmishr07/Skilledboys
