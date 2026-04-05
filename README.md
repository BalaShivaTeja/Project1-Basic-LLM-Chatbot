# Project1-Basic-LLM-Chatbot

A Basic LLM Chatbot built with the **MERN** stack (MongoDB, Express, React, Node.js) and powered by the **OpenAI GPT-4** API.

---

## Project Structure

```
Project1-Basic-LLM-Chatbot/
├── client/                        # React 18 + Vite + Tailwind CSS frontend
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── src/
│       ├── components/
│       │   ├── Auth/
│       │   ├── Chat/
│       │   │   ├── ChatWindow.jsx  # Message history with auto-scroll
│       │   │   └── ChatInput.jsx   # Controlled input + send button
│       │   └── Common/
│       ├── context/
│       ├── pages/
│       ├── services/
│       │   └── chatService.js      # Axios calls to /api/chat
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx
└── server/                        # Express.js backend
    ├── server.js
    ├── package.json
    ├── config/
    │   └── db.js                  # MongoDB Atlas connection
    ├── controllers/
    │   └── chatController.js
    ├── middleware/
    │   └── validation.js          # Input validation (1–4000 chars)
    ├── models/
    │   └── Chat.js                # Mongoose schema
    ├── routes/
    │   └── chat.js
    └── services/
        └── llmService.js          # OpenAI GPT-4 integration
```

---

## Prerequisites

- **Node.js** ≥ 18
- **MongoDB Atlas** account (or a local MongoDB instance)
- **OpenAI API key**

---

## Getting Started

### 1. Environment Variables

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/chatbot
OPENAI_API_KEY=sk-...
CLIENT_ORIGIN=http://localhost:5173
```

### 2. Install & Run the Server

```bash
cd server
npm install
npm run dev
```

### 3. Install & Run the Client

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## API Endpoints

| Method | Path        | Description               |
|--------|-------------|---------------------------|
| POST   | /api/chat   | Send a message to GPT-4   |
| GET    | /health     | Server health check       |

**POST /api/chat** request body:
```json
{ "message": "Hello!", "sessionId": "<uuid>" }
```

**Response:**
```json
{ "reply": "Hello! How can I help you today?" }
```
