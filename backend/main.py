import logging
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from agent.generator import HTMLGenerator

# Logging Setup
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

app = FastAPI(title="Antigravity Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = HTMLGenerator()

class GenerateRequest(BaseModel):
    prompt: str

@app.get("/")
def read_root():
    return {"status": "online"}

@app.post("/api/generate")
async def generate_html(request: GenerateRequest):
    if not request.prompt:
        raise HTTPException(status_code=400, detail="Prompt required")
    try:
        html = agent.generate(request.prompt)
        return {"html": html}
    except Exception as e:
        logger.error(f"Endpoint Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
