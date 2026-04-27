# ⚡ TaskFlow

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Sequelize-4169E1?style=flat-square&logo=postgresql)
![JWT](https://img.shields.io/badge/Auth-JWT-F7B93E?style=flat-square&logo=jsonwebtokens)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

> TaskFlow is a full stack task and project management app inspired by Jira and Trello.  
> Create projects, manage tasks, and track progress through a clean and intuitive Kanban dashboard.

---

## 🚀 Live Demo

👉 **[danielstam-taskflow.netlify.app](https://danielstam-taskflow.netlify.app)**

---

## 🌍 Deployment

De applicatie is volledig gedeployed als een moderne full-stack setup:

| Laag | Platform | |
|------|----------|-|
| Frontend | Netlify | [![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://netlify.com) |
| Backend API | Render | [![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=black)](https://render.com) |
| Database | Supabase (PostgreSQL) | [![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com) |

---

## 🧪 Demo gebruik

1. Maak een account aan of log in
2. Maak projecten en voeg taken toe
3. Verplaats taken tussen **Todo / Doing / Done**

---

## ⚠️ Belangrijk

> De backend draait op een gratis tier van Render en kan in slaapstand gaan bij inactiviteit.  
> De eerste request kan daardoor **30-60 seconden** duren.

---

## 🔗 API

De frontend communiceert met een REST API die authenticatie (JWT) en data-opslag afhandelt via de backend en database.

## 📸 Screenshots

<p align="left">
  <img src="./screenshots/loginscherm.png" width="32%" />
  <img src="./screenshots/accountaanmaken.png" width="32%" />
  <img src="./screenshots/homepage.png" width="32%" />
  <br/>
  <img src="./screenshots/nieuwproject.png" width="32%" />
  <img src="./screenshots/projecten.png" width="32%" />
  <img src="./screenshots/taken.png" width="32%" />
</p>

---

## 🛠️ Tech Stack

| Laag      | Technologie |
|-----------|------------|
| Frontend  | React 18, React Router v6, Axios |
| Backend   | Node.js, Express |
| Database  | PostgreSQL + Sequelize ORM |
| Auth      | JWT (JSON Web Tokens) |
| Deployment| Vercel (frontend) + Render (backend) |

---

## ✨ Features

- 🔐 User authentication — register & login met JWT  
- 📁 Projecten aanmaken, bewerken en verwijderen  
- ✅ Taken toevoegen, verplaatsen en verwijderen  
- 📊 Kanban-kolommen — **Todo / Doing / Done**  
- 🛡️ Protected routes — alleen toegankelijk na inloggen  
- 📱 Responsive — werkt op desktop en mobiel  
- 🐳 Docker Compose setup met hot reload  

---

## 📁 Project Structure

```
taskflow/
├── backend/
│   ├── config/         → Database connectie (Sequelize)
│   ├── middleware/     → JWT authenticatie
│   ├── models/         → User, Project, Task
│   ├── routes/         → auth, projects, tasks
│   ├── server.js
│   └── .env.example
└── frontend/
    ├── public/
    └── src/
        ├── context/    → AuthContext
        ├── components/ → Navbar, ProtectedRoute, Footer
        └── pages/      → Login, Register, Dashboard, ProjectDetail
```

---

## ⚙️ Getting Started

### Vereisten

- Node.js v18+  
- PostgreSQL (lokaal of via ElephantSQL)  
- of Docker Desktop  

---

### 🐳 Optie 1 — Docker (aanbevolen)

```bash
git clone <jouw-repo-url>
cd taskflow
docker compose up --build
```

App draait op: http://localhost:3000

---

### 💻 Optie 2 — Lokaal

#### 1. Clone het project

```bash
git clone https://github.com/Daan026/TaskFlow
cd taskflow
```

#### 2. Backend instellen

```bash
cd backend
npm install
cp .env.example .env
```

Vul `.env` in:

```env
DATABASE_URL=postgres://gebruiker:wachtwoord@localhost:5432/taskflow
JWT_SECRET=vervang_dit_met_een_lang_geheim
CLIENT_URL=http://localhost:3000
PORT=5000
NODE_ENV=development
```

Start de backend:

```bash
npm run dev
```

Backend: http://localhost:5000

---

#### 3. Frontend instellen

```bash
cd ../frontend
npm install
npm start
```

Frontend: http://localhost:3000

---

## 🔗 API Endpoints

### Auth

| Method | Route | Beschrijving |
|--------|-------|--------------|
| POST   | /api/auth/register | Registreren |
| POST   | /api/auth/login    | Inloggen |

### Projecten *(JWT vereist)*

| Method | Route | Beschrijving |
|--------|-------|--------------|
| GET    | /api/projects           | Alle projecten ophalen |
| POST   | /api/projects           | Nieuw project aanmaken |
| GET    | /api/projects/:id       | Project details |
| PUT    | /api/projects/:id       | Project bewerken |
| DELETE | /api/projects/:id       | Project verwijderen |
| GET    | /api/projects/:id/tasks | Taken van een project |
| POST   | /api/projects/:id/tasks | Taak toevoegen |

### Taken *(JWT vereist)*

| Method | Route | Beschrijving |
|--------|-------|--------------|
| PUT    | /api/tasks/:id    | Taak bewerken of verplaatsen |
| DELETE | /api/tasks/:id    | Taak verwijderen |

---

## 🔐 Environment Variables

| Variabele     | Beschrijving |
|---------------|--------------|
| DATABASE_URL  | PostgreSQL connectiestring |
| JWT_SECRET    | Geheime sleutel voor JWT tokens |
| PORT          | Serverpoort (standaard 5000) |
| CLIENT_URL    | Frontend URL voor CORS |
| NODE_ENV      | development of production |

---

## 🧠 What This Project Demonstrates

- Full stack development met React + Node.js  
- REST API design met Express  
- Authenticatie en autorisatie via JWT  
- Database modellering met PostgreSQL en Sequelize  
- Frontend-backend integratie met Axios  
- Docker-based development workflow  

---

## 📌 Future Improvements

- [ ] Drag & drop voor taken  
- [ ] Notificaties en deadlines  
- [ ] Teamleden uitnodigen per project  
- [ ] Zoeken en filteren van taken  
- [ ] Meer features…  

---

## 👤 Author

**Daan**

- 🌐 https://danielstam.nl  
- 💻 https://github.com/Daan026  

---

*Built by Daan*
