# 🚀 Mini ATS – AI-Powered Hiring Workflow

A modern fullstack Applicant Tracking System built with React, Supabase, and applied AI.

---

## ✨ Features

- 🔐 Authentication with Supabase
- 💼 Job management system
- 👤 Candidate profiles (LinkedIn, CV summary)
- 📊 Kanban recruitment pipeline
- 🔎 Filtering (by job & candidate name)
- 🤖 AI match scoring (MVP)
- 👑 Admin panel (create users securely)
- ☁️ Cloud-ready architecture

---

## 🏗️ Architecture

React → Supabase (Auth + DB) → Edge Functions → AI Scoring Logic

---

## 🌍 Live Demo

Frontend: *(add your link here later)*  
Backend: Supabase  

---

## ⚙️ Local Setup

### Clone repo
```bash
git clone https://github.com/your-username/mini-ats.git
cd mini-ats

---

Install dependencies
npm install

---

Environment variables

Create a .env file in the root:

VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key

---

Run app
npm run dev

---

🧠 AI Scoring (MVP)

Simple rule-based AI system:

.Compares job description with candidate notes
.Extracts matching keywords
.Generates:
.Score (0–100)
.Matched skills summary

Example:

AI Score: 24/100  
Matched skills: react, ai

---

📊 Kanban Workflow
Applied
Interview
Offer
Rejected

✔ Clean visual pipeline
✔ Status dropdown per candidate
✔ Real-time updates via Supabase

---

👤 Admin Panel
Create users (admin & customer)
Uses Supabase Edge Function
Secure (service_role key hidden)

---

🔐 Security
No service_role key exposed in frontend
Edge Functions handle sensitive logic
Role-based access via profiles table

---

📦 MVP Assumptions
Admin creates accounts
Customers use same interface
AI is rule-based (not ML yet)
No CV upload (text-based only)
Single-tenant system

---

🚀 Future Improvements
Drag & drop Kanban
CV parsing (PDF)
LLM integration (OpenAI / Claude)
Skill extraction & embeddings
Multi-tenant support
Analytics dashboard

---

🎬 Demo

Demo video includes:

Login
Job creation
Candidate management
Kanban workflow
AI scoring
Admin panel

---

👩‍💻 Author

Mahtab Nezam
AI Developer Student
Fullstack + Applied AI focus

---

⭐ Final Note

This project demonstrates a complete fullstack system with an extensible AI layer, designed as a real-world MVP with clear scalability toward advanced AI solutions.