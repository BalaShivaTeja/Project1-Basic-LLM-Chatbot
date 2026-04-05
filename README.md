# Project 1: Basic LLM Chatbot

A full-stack MERN (MongoDB, Express, React, Node.js) chatbot application that integrates with OpenAI's GPT models to provide an interactive conversational interface.

## Features

- **User Authentication**: Secure JWT-based authentication with registration and login
- **Real-time Chat**: Interactive chat interface with OpenAI GPT integration
- **Session Management**: Create, view, and manage multiple chat sessions
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **Message History**: Persistent storage of conversations in MongoDB
- **Security**: Rate limiting, input validation, and secure password hashing

## Tech Stack

### Backend
- **Express.js 4.x**: REST API server
- **MongoDB/Mongoose**: Database and ODM
- **JWT**: Token-based authentication
- **OpenAI SDK**: LLM integration
- **Bcrypt**: Password hashing
- **Express-validator**: Input validation
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing

### Frontend
- **React 18**: UI library with functional components
- **Vite 5**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **Axios**: HTTP client with interceptors
- **React Router**: Client-side routing
- **Context API**: State management

## Project Structure

```
Project1-Basic-LLM-Chatbot/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Chat/       # Chat-related components
│   │   │   ├── Common/     # Shared components
│   │   │   └── Auth/       # Authentication components
│   │   ├── services/       # API service layer
│   │   ├── context/        # React Context providers
│   │   ├── utils/          # Utility functions and hooks
│   │   ├── pages/          # Page components
│   │   └── main.jsx        # Application entry point
│   ├── public/             # Static assets
│   └── package.json
│
├── server/                 # Backend Express application
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   ├── middleware/         # Custom middleware
│   ├── services/           # Business logic services
│   └── server.js           # Server entry point
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BalaShivaTeja/Project1-Basic-LLM-Chatbot.git
   cd Project1-Basic-LLM-Chatbot
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**

   **Server** (`server/.env`):
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_ACCESS_EXPIRY=15m
   JWT_REFRESH_EXPIRY=7d
   OPENAI_API_KEY=your_openai_api_key
   CLIENT_URL=http://localhost:5173
   ```

   **Client** (`client/.env`):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start the frontend (in a new terminal)**
   ```bash
   cd client
   npm run dev
   ```
   Client will run on `http://localhost:5173`

3. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`
   - Register a new account or login
   - Start chatting with the AI!

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token

### Chat
- `POST /api/chat/message` - Send message and get AI response
- `GET /api/chat/sessions` - Get user's chat sessions
- `GET /api/chat/sessions/:sessionId` - Get session history
- `POST /api/chat/sessions` - Create new chat session
- `DELETE /api/chat/sessions/:sessionId` - Delete chat session

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT tokens with expiration (15m access, 7d refresh)
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- CORS protection
- Security headers with Helmet
- Protected routes requiring authentication

## Development

### Available Scripts

**Server**:
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests

**Client**:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests

## Environment Variables

See `.env.example` files in both `server/` and `client/` directories for required environment variables.

## Future Enhancements

- [ ] Message markdown rendering
- [ ] Code syntax highlighting
- [ ] File upload support
- [ ] Image generation capabilities
- [ ] Export chat history
- [ ] Dark mode toggle
- [ ] Admin dashboard
- [ ] Advanced prompt engineering
- [ ] Multi-language support
- [ ] Voice input/output

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- OpenAI for providing the GPT API
- MongoDB Atlas for database hosting
- All open-source contributors whose libraries make this project possible

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---

Built with ❤️ using the MERN stack