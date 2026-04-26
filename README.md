# 🚀 Mini ATS – AI-Powered Hiring Workflow

A modern fullstack Applicant Tracking System built with React, Supabase, and applied AI.

---

## ✨ Overview

Mini ATS is a lightweight recruitment platform designed to manage the entire hiring workflow — from job creation to candidate evaluation.

This project demonstrates:
- Fullstack system design
- Product thinking
- Applied AI (MVP)
- Secure backend architecture

---

## 🎯 Features

### 🔐 Authentication
- Secure login using Supabase Auth
- Role-based access (Admin / Customer)

### 💼 Job Management
- Create and manage job listings
- Store job descriptions for candidate matching

### 👤 Candidate Management
- Add candidates with:
  - Full name
  - Email
  - LinkedIn profile
  - Notes (CV summary)
- Link candidates to jobs

### 📊 Kanban Pipeline
- Visual recruitment workflow:
  - Applied
  - Interview
  - Offer
  - Rejected
- Update candidate status dynamically
- Clean and compact layout

### 🔎 Filtering
- Filter candidates by:
  - Name
  - Job
- Available directly in Kanban view

### 🤖 AI Candidate Scoring (MVP)
A rule-based AI system that compares:
- Job description
- Candidate notes

Outputs:
- Match score (0–100)
- Summary of matched skills

Example:
AI Score: 24/100  
Matched skills: react, ai

### 👑 Admin Panel
- Create real user accounts (admin & customer)
- Uses secure Supabase Edge Function
- Automatically creates:
  - Authentication user
  - Profile record

---

## 🧠 AI Approach

This project uses a rule-based AI scoring system as an MVP.

**Current implementation:**
- Keyword matching
- Score + summary

**Future improvements:**
- LLM-based CV analysis (OpenAI / Claude)
- Skill extraction from full CVs
- Embedding-based matching
- Learning from historical hiring data

---

## 🏗️ Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- React Router

**Backend**
- Supabase (PostgreSQL)
- Supabase Authentication
- Supabase Edge Functions

**AI**
- Custom JavaScript scoring logic

---

## 🧱 Architecture

React (Frontend)
↓
Supabase Auth
↓
Database (Jobs, Candidates, Profiles)
↓
Edge Functions (Admin actions)
↓
AI Scoring (client-side MVP)

---

## 🔐 Security

- Admin operations handled via Edge Functions
- service_role key never exposed in frontend
- Role-based logic via profiles table

---

## ⚙️ Setup

### 1. Clone repository
git clone https://github.com/mahtabb90/mini-ats-ai.git  
cd mini-ats

### 2. Install dependencies
npm install

### 3. Create .env file
VITE_SUPABASE_URL=https://zehszxnlgrwcpenevxoe.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_whOFmSqOuBPclrMGV2cI0Q_aZMgvT-U

### 4. Run app
npm run dev

---

## 🧪 Demo Credentials

Admin:
Email: mahtab@test.com  
Password: Test12345! 

Customer:
Email: customer@test.com  
Password: Test12345!  

---

## 📦 MVP Assumptions

- Admin creates user accounts
- Customers use the same interface
- AI scoring is simplified (rule-based)
- No CV file upload (text-based only)
- Single-tenant system

---

## 🚀 Future Improvements

- Drag & drop Kanban
- CV upload & parsing
- LLM integration
- Multi-tenant support
- Analytics dashboard

---

## 🌍 Live Demo

- Frontend: https://mini-ats-ai.onrender.com
- Backend: Supabase  

---

## 👩‍💻 Author

Mahtab Nezam  
AI Developer Student  
Focused on fullstack + applied AI systems

---

## ⭐ Final Note

This project demonstrates a complete fullstack system with an extensible AI layer, designed as a real-world MVP with clear scalability toward advanced AI solutions.