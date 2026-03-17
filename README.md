# 🚀 SkillBid — Smart Freelance Marketplace

SkillBid is an intelligent freelance marketplace designed to connect clients with the most suitable freelancers through **skill-based project matching**.
The system analyzes project requirements and freelancer skill sets to automatically recommend the best candidates with a **dynamic match score**.

This project was developed as part of an academic software engineering project by **Team Omega Notation**.

---

## 👥 Team Omega Notation

**Team Leader**

- Anamika Negi

**Team Members**

- Jatin Kumar
- Chetaney Kant

---

## 📌 Project Overview

Traditional freelance platforms require manual searching and filtering to find suitable freelancers. SkillBid improves this process by automatically evaluating skills and project requirements to generate intelligent recommendations.

The platform includes a **modern dashboard** where freelancers can:

- View recommended projects
- See match percentages
- Analyze project requirements
- Submit proposals efficiently

---

## ✨ Key Features

- 🔎 **Skill-Based Freelancer Recommendation System**
- 📊 **Dynamic Project Match Score Calculation**
- 👨‍💻 **Freelancer Dashboard Interface**
- ⚡ **Modern UI using React and Tailwind CSS**
- 🔗 **REST API integration between frontend and backend**
- 🧠 **Backend skill matching algorithm**
- 📱 **Responsive design**

---

## 🏗 System Architecture

SkillBid follows a **full-stack architecture** consisting of:

Frontend → Next.js / React
Backend → Flask (Python) REST API
Database → MySQL

The frontend communicates with backend APIs to fetch projects and compute freelancer matching scores.

---

## 🛠 Technology Stack

### Frontend

- React
- Next.js
- Tailwind CSS

### Backend

- Python
- Flask

### Database

- MySQL

### Development Tools

- Node.js
- Git
- GitHub
- VS Code

---

## 📂 Project Structure

```
SkillBid
│
├── backend
│   ├── routes
│   ├── services
│   ├── utils
│   └── app.py
│
├── frontend
│   └── skillbid-ui
│
├── docs
│
├── README.md
├── LICENSE
└── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/anamikanegi05/skillbid.git
```

### 2️⃣ Start the Backend Server

```
cd backend
python app.py
```

Backend runs at:

```
http://127.0.0.1:5000
```

---

### 3️⃣ Start the Frontend

```
cd frontend/skillbid-ui
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🧠 Skill Matching Algorithm

The recommendation system works by:

1. Fetching project skills from the database
2. Comparing freelancer skills with project requirements
3. Calculating skill intersections
4. Generating a **match score**
5. Ranking freelancers based on:
   - Skill Match
   - Freelancer Rating

This enables the platform to recommend the **most relevant freelancers for each project**.

---

## 📸 Project Preview

Dashboard displaying recommended projects and freelancer profile information.

_(Screenshots can be added in the future)_

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Developed By

**Team Omega Notation**

Team Leader:
Anamika Negi

Team Members:
Chetaney Kant
Jatin Kumar

---
