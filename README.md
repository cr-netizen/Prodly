# Prodly

An AI-powered productivity and project management web application that helps users organize tasks, manage projects, and receive AI-assisted recommendations.

---

## 🌐 Live Demo

https://<your-vercel-url>.vercel.app

---

## 🎥 Demo Video

https://youtube.com/watch?v=<demo-video-link>

*(This will be updated after recording the final demonstration video.)*

---

## 📸 Screenshots

### Home Page

![Home](screenshots/home.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

### AI Feature

![AI Feature](screenshots/ai-feature.png)

### Login Page

![Login](screenshots/login.png)

> Place these images inside a `screenshots/` folder in the repository.

---

# ✨ Features

- User Registration
- Secure User Login & Authentication
- Dashboard for managing products/projects
- AI-powered recommendation/search feature
- Product search and filtering
- Responsive design for desktop and mobile
- Light/Dark mode
- REST API integration
- Loading states and error handling

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas

## AI

- Google Gemini API *(replace if using another provider)*

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

# 🚀 Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/<username>/Prodly.git
```

```bash
cd Prodly
```

---

## 2. Install Frontend

```bash
cd frontend
npm install
```

Run frontend:

```bash
npm run dev
```

---

## 3. Install Backend

```bash
cd ../backend
npm install
```

Run backend:

```bash
npm run dev
```

---

## 4. Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

*(Only include the variables your project actually uses.)*

---

## 5. Open Application

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

---

# 📡 API Documentation

## Authentication

### Register

```
POST /api/auth/register
```

Request

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "password123"
}
```

Response

```json
{
  "message": "User registered successfully"
}
```

---

### Login

```
POST /api/auth/login
```

Request

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response

```json
{
  "token": "<jwt-token>"
}
```

---

## Products

### Get All Products

```
GET /api/products
```

Response

```json
[
  {
    "_id": "...",
    "name": "Apple Jam"
  }
]
```

---

### Search Products

```
GET /api/products/search?q=apple
```

Response

```json
[
  {
    "name": "Apple Jam"
  }
]
```

---

## AI Feature

### AI Recommendation

```
POST /api/ai/recommend
```

Request

```json
{
  "prompt": "Suggest products for breakfast"
}
```

Response

```json
{
  "response": "..."
}
```

---

# 🏗 Architecture / Folder Structure

```
Prodly
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── server.js
│   └── package.json
│
└── README.md
```

The application follows a client-server architecture. The React frontend communicates with the Express backend through REST APIs. User data is stored in MongoDB Atlas, and AI-powered features are generated using the Google Gemini API.

---

# Known Limitations

- Free-tier hosting services may take a few seconds to wake up after inactivity.
- AI responses depend on external API availability.
- Internet connection is required for AI-powered features.
- Some advanced productivity features are planned for future development.
- OAuth authentication has not been implemented yet. *(Remove if you completed it.)*

---

# Credits & Acknowledgements

This project was developed as part of the **TBI-GEU Internship Program**.

Special thanks to:

- OpenAI ChatGPT (development assistance and documentation)
- Google Gemini API
- React Documentation
- Vite Documentation
- Express.js Documentation
- MongoDB Atlas Documentation
- Tailwind CSS Documentation
- Vercel
- Render

---

## Author

**<Your Name>**

GitHub: https://github.com/<username>

---

## License

This project was created for educational purposes as part of the TBI-GEU Internship Program.