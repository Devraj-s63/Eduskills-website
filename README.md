# 🎓 EduSkills Website

A full-stack **Institute Website** built with **HTML, CSS, JavaScript (frontend)**, **Node.js + Express (backend)**, and **PostgreSQL (database)**.  
Deployed on **Netlify (frontend)** and **Render (backend + DB)**.

---

## 🚀 Live Demo

- **Frontend (Netlify):** [https://dainty-bombolone-51cd81.netlify.app](https://dainty-bombolone-51cd81.netlify.app)  
- **Backend API (Render):** [https://eduskills-website-1.onrender.com](https://eduskills-website-1.onrender.com)  

---

## 📌 Features

- 📞 Contact form (stored in PostgreSQL DB)  
- 🎓 Courses section  
- 📝 Student applications (with resume upload)  
- 🔗 REST API built with Express + PostgreSQL  
- 🌐 Deployed with Netlify + Render  

---

## 🛠️ Tech Stack

**Frontend:** HTML, CSS, JavaScript  
**Backend:** Node.js, Express.js  
**Database:** PostgreSQL (Render Cloud Database)  
**Deployment:** Netlify (Frontend), Render (Backend + DB)  

---

## ⚙️ Running Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/eduskills-website.git
cd eduskills-website
2️⃣ Backend Setup
bash
Copy code
cd Backend
npm install
Create a .env file inside Backend/:

env
Copy code
PORT=5000
DATABASE_URL=postgres://username:password@hostname:5432/eduskills
Run backend:

bash
Copy code
npm start
Backend will be running at:
👉 http://localhost:5000

3️⃣ Frontend Setup
No build tools required.
Just open index.html in a browser, or serve it with any static server.

If you want to link frontend → backend locally, update your JavaScript fetch URLs:

js
Copy code
const API_URL = "http://localhost:5000/api";
📡 API Endpoints
Contacts

POST /api/contact → Submit contact form

GET /api/contact → Fetch all contacts

Courses

GET /api/courses → Fetch all courses

Applications

POST /api/apply → Submit application

GET /api/apply → Fetch applications

📂 Database Setup
Run these SQL commands in PostgreSQL:

sql
Copy code
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  duration VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20),
  resume VARCHAR(255),
  course_id INT REFERENCES courses(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
