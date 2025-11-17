# 🚀 WhisperAssist - Quick Start Checklist

## ✅ What You Need to Do Manually

### 1. Install Backend Dependencies

```powershell
cd backend
npm install
```

### 2. Install Frontend Dependencies

```powershell
cd frontend
npm install
```

### 3. Get OpenAI API Key

1. Go to: https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. **COPY IT IMMEDIATELY** (you won't see it again!)
5. Keep it safe

### 4. Set Up MongoDB

**Option A - MongoDB Atlas (Cloud - RECOMMENDED):**

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Replace `<password>` with your password
7. Add `/whisperassist` at end

**Option B - Local MongoDB:**

1. Install: https://www.mongodb.com/try/download/community
2. Start service: `net start MongoDB` (as Admin)
3. Use: `mongodb://localhost:27017/whisperassist`

### 5. Create Backend .env File

```powershell
cd backend
Copy-Item .env.example .env
notepad .env
```

**Edit .env with your actual values:**

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string_here
OPENAI_API_KEY=sk-your-actual-api-key-here
FRONTEND_URL=http://localhost:5173
```

### 6. Start Backend

```powershell
cd backend
npm run dev
```

**✅ Success if you see:**

```
╔════════════════════════════════════════╗
║     WhisperAssist Backend Server       ║
║  🚀 Server running on port 5000        ║
╚════════════════════════════════════════╝
✅ MongoDB Connected
```

### 7. Start Frontend (New Terminal)

```powershell
cd frontend
npm run dev
```

**✅ Success if you see:**

```
➜  Local:   http://localhost:5173/
```

### 8. Test in Browser

1. Open: http://localhost:5173/
2. Click microphone button
3. Allow microphone access
4. Record a message
5. See transcription + recommendation!

---

## 🧪 Test APIs with Postman

### Quick Test Sequence:

1. **Health Check**

   - GET `http://localhost:5000/api/health`
   - Should return: `{"success": true}`

2. **Create Instruction**

   - POST `http://localhost:5000/api/instructions`
   - Body (JSON):

   ```json
   {
     "userId": "testuser",
     "instructionText": "You are a helpful assistant.",
     "isActive": true
   }
   ```

3. **Upload Audio**

   - POST `http://localhost:5000/api/recommendations`
   - Body: form-data
   - Add: `audio` (File) + `userId` (Text: "testuser")
   - Use any MP3/WAV/WebM audio file

4. **View History**
   - GET `http://localhost:5000/api/recommendations?userId=testuser`

---

## 🎯 Sample Voice Requests to Try

1. "Recommend a good laptop for web development"
2. "What should I learn to become a full-stack developer?"
3. "Suggest a healthy meal plan for weight loss"
4. "How can I improve my productivity at work?"
5. "Tell me about the best practices for React"

---

## ❌ Troubleshooting

### Backend won't start

- ✅ Check MongoDB is running
- ✅ Verify `.env` file exists with correct values
- ✅ Check OpenAI API key is valid
- ✅ Run `npm install` again

### Frontend errors

- ✅ Run `npm install` in frontend folder
- ✅ Check backend is running on port 5000
- ✅ Clear browser cache

### Microphone doesn't work

- ✅ Allow permissions in browser
- ✅ Use Chrome/Edge (best support)
- ✅ Check microphone works in other apps

### OpenAI errors

- ✅ Verify API key is correct
- ✅ Check you have credits in OpenAI account
- ✅ Remove any spaces from API key in .env

---

## 📚 Documentation Files

- `SETUP_GUIDE.md` - Complete detailed setup
- `POSTMAN_GUIDE.md` - API testing guide
- `README.md` - Project overview

---

## 🎉 You're Done!

Once both servers are running and you can record/see results, you're all set!

**Need help?** Check the detailed guides above or review console logs for errors.

---

**Total Setup Time: ~15-20 minutes**

Good luck! 🚀
