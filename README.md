# AI Code Generator

An AI-powered web application that generates production-ready HTML and Vanilla CSS components based on natural language descriptions.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![FastAPI](https://img.shields.io/badge/FastAPI-latest-green)
![Gemini](https://img.shields.io/badge/Gemini-Flash-purple)

## ✨ Features

- 🎨 **Full-Screen Input Experience** - Beautiful centered input before generation
- 🎤 **Voice Input** - Describe components using speech recognition
- 📜 **Chat History** - Track and reuse previous prompts
- 👁️ **Live Preview** - See generated UI in real-time with Shadow DOM isolation
- 💻 **Code View** - View and copy raw HTML/CSS code
- 🔄 **Auto-Retry** - Smart rate limit handling
- ⚡ **Fast Generation** - Powered by Gemini Flash Latest

## 🏗️ Architecture

```
┌─────────────────┐      ┌──────────────┐
│  Next.js        │─────▶│  FastAPI     │
│  Frontend       │      │  Backend     │
│  (Port 3000)    │      │  (Port 8000) │
│                 │      │              │
│  - ChatPanel    │      │  - Generator │
│  - PreviewPanel │      │  - Prompts   │
│  - FullScreen   │      │  - Logging   │
└─────────────────┘      └──────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- Gemini API Key ([Get one here](https://ai.google.dev/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd bot
   ```

2. **Setup Backend**
   ```bash
   cd backend
   python -m venv venv
   .\venv\Scripts\Activate  # Windows
   # source venv/bin/activate  # macOS/Linux
   pip install -r requirements.txt
   ```

3. **Configure API Key**
   
   Create `backend/.env`:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
.\venv\Scripts\Activate
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### Basic Flow

1. **Enter Prompt** - Describe the UI component you want
   - Example: "Create a modern login form with email and password"
   
2. **Generate** - Click the button or press Enter

3. **View Result** - See the live preview or switch to code view

4. **Copy Code** - Click "Copy" to get the HTML/CSS

### Voice Input

1. Click the microphone icon
2. Speak your prompt
3. Click again to stop recording
4. Click "Generate"

### Chat History

- All prompts are saved in the sidebar
- Click any previous prompt to reuse it
- History persists during the session

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16.1 (React 19)
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Language:** TypeScript

### Backend
- **Framework:** FastAPI
- **AI Model:** Google Gemini Flash Latest
- **Server:** Uvicorn (ASGI)
- **Language:** Python 3.9+

## 📁 Project Structure

```
bot/
├── frontend/
│   ├── app/
│   │   ├── page.tsx           # Main app with conditional layout
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ChatPanel.tsx      # Sidebar with input & history
│   │   ├── PreviewPanel.tsx   # Live preview & code view
│   │   └── FullScreenInput.tsx # Landing page input
│   └── hooks/
│       └── useVoiceInput.ts   # Web Speech API hook
│
└── backend/
    ├── agent/
    │   ├── generator.py       # Gemini API integration
    │   └── prompts.yaml       # System prompts
    ├── main.py                # FastAPI app
    └── requirements.txt       # Python dependencies
```

## ⚙️ Configuration

### Backend (`backend/.env`)
```env
GEMINI_API_KEY=your_key_here
# or
GOOGLE_API_KEY=your_key_here
```

### Frontend CORS
The backend allows requests from `http://localhost:3000` by default. Update `backend/main.py` if needed.

## 🎨 Customization

### Modify System Prompt
Edit `backend/agent/prompts.yaml` to change generation behavior:
```yaml
system: |
  Your custom instructions here...
```

### Change Model
Update `backend/agent/generator.py`:
```python
model='gemini-flash-latest'  # Change to another model
```

## 🐛 Troubleshooting

### "API Key not found"
- Ensure `.env` file exists in `backend/` directory
- Check the key name is `GEMINI_API_KEY` or `GOOGLE_API_KEY`

### Port Already in Use
- Kill existing processes: `taskkill /IM python.exe /F` (Windows)
- Or change ports in `main.py` and frontend API calls

### CSS Leaking Issues
- The app uses Shadow DOM to isolate generated styles
- If issues persist, check `PreviewPanel.tsx` ShadowDOM implementation

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Powered by [Google Gemini](https://ai.google.dev/)
- Built with [Next.js](https://nextjs.org/) and [FastAPI](https://fastapi.tiangolo.com/)
- Icons by [Lucide](https://lucide.dev/)

---

**Made with ❤️ using AI**
