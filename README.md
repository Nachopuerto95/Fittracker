<p align="end">
   <strong>🌐 Change language:</strong><br>
   <a href="README.es.md">
    <img src="https://github.com/Nachopuerto95/multilang/blob/main/ES.png" alt="Español" width="50">
  </a>&nbsp;&nbsp;&nbsp;
  <a href="/README.md">
    <img src="https://github.com/Nachopuerto95/multilang/blob/main/EN.png" alt="English" width="50">
  </a>
</p>

# 🏋️ Fittracker

<p align="center">
  <img src="https://github.com/Nachopuerto95/Nachopuerto95/blob/main/assets/fittracker.gif?raw=true" alt="Fittracker demo" width="600"/>
</p>

<p align="center">
  <a href="https://fit-tracker.fly.dev/login">
    <img src="https://custom-icon-badges.demolab.com/badge/Live%20app-6f42c1?logo=link&logoColor=fff" alt="Live app"/>
  </a>
</p>

## 📜 About

Fittracker is a full-stack app to keep track of your training and what you eat on the same dashboard. I built it to scratch my own itch: I wanted one place to log a workout, write down what I cooked, and see how both things were going over time without juggling two or three different apps.

Stack: **React + Vite** on the frontend, **Node + Express + MongoDB** on the backend, deployed on **Fly.io**.

## ✨ What it does

- **Auth**: register / login with JWT, bcrypt for passwords.
- **Workouts**: create routines, log sessions, see history.
- **Exercises**: catalog of exercises reused across routines.
- **Calendar**: every training day and every meal in a monthly view.
- **Food & Recipes**: search a food database, log meals, save your own recipes with a rich-text editor.
- **Profile**: edit your info and stats.
- **Charts**: `recharts` for quick visual feedback over time.

## 🧱 Stack

**Backend (`api/`)**
- Node.js + Express
- MongoDB + Mongoose
- JWT auth, bcrypt
- nodemon for local dev

**Frontend (`web/`)**
- React 18 + Vite
- `react-router-dom` v6
- `axios` for the API layer
- `recharts` (progress charts)
- `react-calendar` (calendar view)
- TinyMCE (recipe editor)
- `dayjs` for dates

## 🔧 Run locally

```bash
# Backend
cd api
npm install
npm run dev        # http://localhost:3000

# Frontend (another terminal)
cd web
npm install
npm run dev        # http://localhost:5173
```

You'll need a `.env` inside `api/` with at least `MONGO_URI` and `JWT_SECRET`.

## 🚀 Deploy

The app is deployed on Fly.io. The repo ships with a `Dockerfile` and `fly.toml` that build the backend and serve the frontend static bundle.

```bash
fly deploy
```

Live: [fit-tracker.fly.dev](https://fit-tracker.fly.dev/login)

## 📂 Layout

```
Fittracker/
├── api/              # Express API
│   ├── controllers/  # user, workout, exercise, food, recipe, calendarEntry
│   ├── models/
│   ├── routes/
│   └── index.js
├── web/              # React + Vite
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
│   └── vite.config.js
├── Dockerfile
└── fly.toml
```

## 🛣️ Where I took it next

Fittracker is the V1. The follow-up is **[gymtrackerv2](https://github.com/Nachopuerto95/gymtrackerv2)**, where I rebuilt the gym side of the app with a better routine builder (drag-and-drop), in-session tracking and a cleaner stack (React 19, Zustand, Tailwind v4, split fly.io apps for frontend/backend).
