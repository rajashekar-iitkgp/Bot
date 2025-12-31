import logging
from google import genai
from dotenv import load_dotenv
import os
import yaml
import time
import random   
# Setup Logger
logger = logging.getLogger(__name__)

# Load Env
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env'))

class HTMLGenerator:
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_API_KEY")
        self.client = genai.Client(api_key=self.api_key)
        self.prompts = self._load_prompts()

    def _load_prompts(self):
        try:
            path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "prompts.yaml")
            with open(path, "r") as f:
                return yaml.safe_load(f)
        except Exception as e:
            return {"system": "You are a helpful assistant.", "examples": []}

    def generate(self, user_prompt: str) -> str:
        full_prompt = f"{self.prompts.get('system', '')}\n\nUser Request: {user_prompt}\n\nHTML Code (No markdown):"
        
        try:
            response = self.client.models.generate_content(model='gemini-flash-latest', contents=full_prompt)
            text = response.text.strip()
            # fast markdown stripping
            if text.startswith("```html"): text = text[7:]
            if text.startswith("```"): text = text[3:]
            if text.endswith("```"): text = text[:-3]
            return text.strip()
        except Exception as e:
            logger.error(f"Generation failed: {e}")
            return f"Error: {str(e)}"
