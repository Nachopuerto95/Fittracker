<p align="end">
   <strong>🌐 Cambiar idioma:</strong><br>
   <a href="/README.es.md">
    <img src="https://github.com/Nachopuerto95/multilang/blob/main/ES.png" alt="Español" width="50">
  </a>&nbsp;&nbsp;&nbsp;
  <a href="/README.md">
    <img src="https://github.com/Nachopuerto95/multilang/blob/main/EN.png" alt="English" width="50">
  </a>
</p>

# 🏋️ Fittracker

<p align="center">
  <img src="https://github.com/Nachopuerto95/Nachopuerto95/blob/main/assets/fittracker.gif?raw=true" alt="Demo de Fittracker" width="600"/>
</p>

<p align="center">
  <a href="https://fit-tracker.fly.dev/login">
    <img src="https://custom-icon-badges.demolab.com/badge/App%20en%20vivo-6f42c1?logo=link&logoColor=fff" alt="App en vivo"/>
  </a>
</p>

## 📜 Sobre el proyecto

Fittracker es una app fullstack para llevar en un mismo sitio lo que entrenas y lo que comes. La construí para mí: quería un único lugar donde registrar un entrenamiento, apuntar lo que había cocinado y poder ver cómo iban ambas cosas en el tiempo sin tener que saltar entre dos o tres apps distintas.

Stack: **React + Vite** en el frontend, **Node + Express + MongoDB** en el backend, desplegado en **Fly.io**.

## ✨ Qué hace

- **Auth**: registro / login con JWT y bcrypt para las contraseñas.
- **Workouts**: crear rutinas, registrar sesiones, ver el histórico.
- **Ejercicios**: catálogo de ejercicios reutilizables en las rutinas.
- **Calendario**: cada día de entrenamiento y cada comida en vista mensual.
- **Comidas y recetas**: buscar en una base de datos de alimentos, registrar comidas, guardar recetas propias con editor rich-text.
- **Perfil**: editar datos y stats personales.
- **Gráficas**: `recharts` para feedback visual rápido a lo largo del tiempo.

## 🧱 Stack

**Backend (`api/`)**
- Node.js + Express
- MongoDB + Mongoose
- JWT, bcrypt
- nodemon para desarrollo

**Frontend (`web/`)**
- React 18 + Vite
- `react-router-dom` v6
- `axios` para llamadas al API
- `recharts` (gráficas de progreso)
- `react-calendar` (vista calendario)
- TinyMCE (editor de recetas)
- `dayjs` para fechas

## 🔧 Ejecución local

```bash
# Backend
cd api
npm install
npm run dev        # http://localhost:3000

# Frontend (otra terminal)
cd web
npm install
npm run dev        # http://localhost:5173
```

Hace falta un `.env` dentro de `api/` con al menos `MONGO_URI` y `JWT_SECRET`.

## 🚀 Despliegue

La app está desplegada en Fly.io. El repo incluye `Dockerfile` y `fly.toml` que construyen el backend y sirven el bundle estático del frontend.

```bash
fly deploy
```

En vivo: [fit-tracker.fly.dev](https://fit-tracker.fly.dev/login)

## 📂 Estructura

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

## 🛣️ Continuación del proyecto

Fittracker es la V1. El siguiente paso es **[gymtrackerv2](https://github.com/Nachopuerto95/gymtrackerv2)**, donde rehíce la parte de gimnasio con un mejor builder de rutinas (drag-and-drop), tracking en sesión y un stack más limpio (React 19, Zustand, Tailwind v4, apps separadas en Fly.io para frontend y backend).
