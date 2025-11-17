# WhisperAssist

AI Voice Recommendation System built with MERN Stack + OpenAI

## 🎯 Overview

WhisperAssist is a full-stack application that converts speech to text using OpenAI Whisper, retrieves contextual instructions from MongoDB, and generates intelligent recommendations using GPT. All interactions are stored for future reference and analysis.

## ✨ Features

## 🛠️ Tech Stack

### Frontend

### Backend

## 🚀 Quick Start

### Prerequisites

# WhisperAssist

AI Voice Recommendation System built with MERN Stack + Groq (Whisper & Llama-3.3)

## 🎯 Overview

WhisperAssist is a full-stack application that converts speech to text using Groq Whisper, retrieves contextual instructions from MongoDB, and generates intelligent recommendations using Llama-3.3. All interactions are stored for future reference and analysis.

## ✨ Features

- 🎤 **Voice Recording**: Browser-based audio recording
- 🗣️ **Speech-to-Text**: Powered by Groq Whisper
- 🤖 **AI Recommendations**: Llama-3.3-powered intelligent responses
- 💾 **History Tracking**: All recommendations stored in MongoDB
- 📝 **Custom Instructions**: Configurable AI behavior per user
- 🎨 **Modern UI**: Beautiful interface with Tailwind CSS

## 🛠️ Tech Stack

### Frontend

- React 18
- Vite
- Tailwind CSS
- Axios
- Lucide React (Icons)

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- Groq SDK (Whisper & Llama-3.3)
- Multer (File uploads)

## 🚀 Quick Start

### Prerequisites

- Node.js v16+
- MongoDB (local or Atlas)
- Groq API Key (get one at https://console.groq.com/keys)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/mandinumaneth/whisperAssist.git
cd whisperAssist
```

2. **Install backend dependencies**

```bash
cd backend
npm install
```

3. **Install frontend dependencies**

```bash
cd ../frontend
npm install
```

4. **Configure environment variables**

Create `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/whisperassist
OPENAI_API_KEY=your_openai_api_key_here
FRONTEND_URL=http://localhost:5173
```

4. **Configure environment variables**

Create `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/whisperassist
USE_GROQ=true
GROQ_API_KEY=your_groq_api_key_here
FRONTEND_URL=http://localhost:5173
```

5. **Start the backend**

```bash
cd backend
npm run dev
```

6. **Start the frontend** (in a new terminal)

```bash
cd frontend
npm run dev
```

7. **Open your browser**

```
http://localhost:5173
```

## 📖 Documentation

- [Complete Setup Guide](./SETUP_GUIDE.md) - Detailed installation and configuration
- [Postman API Guide](./POSTMAN_GUIDE.md) - API testing instructions

## 🎮 Usage

1. Click the microphone button
2. Allow microphone permissions
3. Speak your request clearly
4. Click stop when finished
5. Wait for AI transcription and recommendation
6. View your history anytime

## 📁 Project Structure

```
whisperAssist/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── server.js        # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # React components
    │   ├── services/        # API integration
    │   └── App.jsx          # Main component
    └── package.json
```

## 🔌 API Endpoints

### Recommendations

- `POST /api/recommendations` - Create new recommendation from audio
- `GET /api/recommendations` - Get recommendation history
- `GET /api/recommendations/:id` - Get specific recommendation

### Instructions

- `GET /api/instructions` - Get all instructions
- `GET /api/instructions/active` - Get active instruction
- `POST /api/instructions` - Create new instruction
- `PUT /api/instructions/:id` - Update instruction
- `DELETE /api/instructions/:id` - Delete instruction

### Health

- `GET /api/health` - Server health check

## 🧪 Testing

Test the API using Postman:

1. Import the collection from [POSTMAN_GUIDE.md](./POSTMAN_GUIDE.md)
2. Test each endpoint sequentially
3. Verify responses match expected format

## 🔐 Security

- Environment variables for sensitive data
- CORS protection
- File size limits (25MB)
- Input validation and sanitization
- MongoDB injection prevention

## 🚧 Future Enhancements

- [ ] User authentication (JWT)
- [ ] Multiple language support
- [ ] Real-time transcription
- [ ] Voice profile customization
- [ ] Export history (PDF/CSV)
- [ ] Audio playback of recordings
- [ ] Rate limiting
- [ ] Caching layer

## 📝 License

MIT License - feel free to use this project for learning and development

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**mandinumaneth**

- GitHub: [@mandinumaneth](https://github.com/mandinumaneth)

## 🙏 Acknowledgments

- OpenAI for Whisper and GPT APIs
- MongoDB for database
- React and Vite communities

---

**Built with ❤️ using MERN Stack + Groq**
