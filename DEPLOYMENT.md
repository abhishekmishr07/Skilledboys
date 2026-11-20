# 🚀 SkilledBoys Production Deployment Guide

This guide walks you through deploying the modernized SkilledBoys platform live on the web in less than 5 minutes.

- **Frontend (Next.js):** Deploy to **Vercel** (Recommended, Free tier available)
- **Backend (Express & MongoDB):** Deploy to **Render** or **Railway** (Free tier available)
- **Database:** **MongoDB Atlas** (Cloud managed database)

---

## Step 1: Push Code to GitHub

1. Open your terminal in the project root:
   ```bash
   git init
   git add .
   git commit -m "Complete frontend modernization with Next.js App Router, React 19, TypeScript and Tailwind"
   ```

2. Create a new repository on [GitHub](https://github.com/new) named `Skilledboys`.

3. Push your repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/Skilledboys.git
   git push -u origin main
   ```

---

## Step 2: Deploy Backend to Render (Free)

1. Go to [Render.com](https://render.com) and log in.
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository (`Skilledboys`).
4. Configure the service settings:
   - **Name:** `skilledboys-backend`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** `Free`
5. In **Environment Variables**, add:
   | Key | Value |
   |---|---|
   | `PORT` | `5000` |
   | `NODE_ENV` | `production` |
   | `MONGO_URI` | `mongodb+srv://abhishekmishraadev_db_user:Abhishek%402003@abhishekdb.idmxnex.mongodb.net/SkilledBoys` |
   | `JWT_SECRET` | `skilledboys_production_jwt_secret_key_2025` |
   | `ADMIN_USERNAME` | `admin` |
   | `ADMIN_PASSWORD` | `admin123` |
6. Click **Deploy Web Service**.
7. Once deployed, copy your Render URL (for example: `https://skilledboys.onrender.com`).

---

## Step 3: Deploy Frontend to Vercel (Free)

1. Go to [Vercel.com](https://vercel.com) and log in with GitHub.
2. Click **Add New...** → **Project**.
3. Import your `Skilledboys` repository.
4. Configure the project:
   - **Framework Preset:** `Next.js`
   - **Root Directory:** Click **Edit** and choose `frontend`
5. Expand **Environment Variables** and add:
   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_API_URL` | Your Render URL from Step 2 (e.g. `https://skilledboys.onrender.com`) |
   | `NEXT_PUBLIC_SITE_URL` | `https://www.skilledboys.com` (or your vercel app URL) |
   | `NEXT_PUBLIC_SITE_NAME` | `SkilledBoys` |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | `8176033198` |
   | `NEXT_PUBLIC_CONTACT_EMAIL` | `skilledboyss@gmail.com` |
6. Click **Deploy**.
7. In ~60 seconds, your site is live with a custom `.vercel.app` URL and free SSL certificate!

---

## Step 4: Connecting Custom Domain (`skilledboys.com`)

1. In Vercel Project Settings → **Domains**.
2. Add `skilledboys.com` and `www.skilledboys.com`.
3. Add the displayed DNS records (CNAME and A record) in your domain registrar (GoDaddy, Namecheap, Hostinger, etc.).
4. Vercel automatically generates and renews your SSL certificate.

---

## 🔒 Production Security Checklist

- [x] Passwords hashed with bcrypt (10 salt rounds)
- [x] JWT sessions with expiration
- [x] CORS configured for production requests
- [x] Credentials protected through environment variables
- [x] Graceful shutdown handling for container deployments
- [x] Production image optimization through Next.js
