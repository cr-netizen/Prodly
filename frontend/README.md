# Prodly 🚀

AI-powered product description generator built with React, Express, MongoDB and Google Gemini.

## Project Overview

Prodly helps users create professional product descriptions using AI.

Users can register, login securely, create products, generate AI descriptions, update products and manage their personal product dashboard.

---

# Features

## Authentication

- User registration
- Secure password hashing using bcrypt
- JWT authentication
- Protected routes
- Google OAuth login
- Logout support

---

## Product Management

Complete CRUD functionality:

- Create products
- View products
- Update products
- Delete products

Each user's products are private and scoped using JWT authentication.

---

## AI Product Description Generator

Powered by Google Gemini.

Users can enter:

- Product name
- Ingredients
- Weight
- Features
- Tone

The AI generates a professional product description.

Features:

- AI generation endpoint
- Loading states
- Error handling
- Toast notifications

---

## Dashboard

Authenticated users can:

- View profile information
- View their products
- Manage created products
- Toggle dark/light mode

---

# Tech Stack

## Frontend

- React + Vite
- React Router
- Tailwind CSS
- Axios
- React Hot Toast

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Passport Google OAuth

## AI

- Google Gemini API

---

# Project Structure

```
Prodly

├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── api
│   │   └── context
│
└── backend
    ├── controllers
    ├── models
    ├── routes
    ├── middleware
    └── config
```

---

# Installation

## Clone Repository

```bash
git clone <your-repository-url>
```

---

# Backend Setup

Navigate:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env`

Example:

```
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

GEMINI_API_KEY=your_gemini_key
```

Start backend:

```bash
npm run dev
```

Backend runs:

```
http://localhost:5000
```

---

# Frontend Setup

Navigate:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start:

```bash
npm run dev
```

Frontend runs:

```
http://localhost:5173
```

---

# API Endpoints

## Authentication

Register:

```
POST /api/auth/register
```

Login:

```
POST /api/auth/login
```

Google OAuth:

```
GET /api/auth/google
```

---

## Products

Get products:

```
GET /api/products
```

Create product:

```
POST /api/products
```

Update product:

```
PUT /api/products/:id
```

Delete product:

```
DELETE /api/products/:id
```

All product operations require JWT authentication.

---

## AI

Generate description:

```
POST /api/ai/generate-description
```

---

# Security

Implemented:

- JWT authentication
- Password hashing
- Protected API routes
- User-specific data access
- Environment variables
- Input validation
- Rate limiting

---

# Week 8 Improvements

Completed:

✅ Live backend data integration  
✅ Authenticated dashboard  
✅ Complete CRUD flows  
✅ AI feature UI integration  
✅ Toast notifications  
✅ Error boundary handling  
✅ Responsive improvements  

