import os
import uvicorn
from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import socketio
from agent import AbangAgent

load_dotenv()

# Initialize FastAPI
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Socket.IO
sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
socket_app = socketio.ASGIApp(sio, app)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("ERROR: GEMINI_API_KEY is not set in .env file")

class MissionRequest(BaseModel):
    url: str
    objective: str
    width: int = 1280
    height: int = 720

@app.post("/api/missions/deploy")
async def deploy_mission(request: MissionRequest, background_tasks: BackgroundTasks):
    agent = AbangAgent(GEMINI_API_KEY, sio)
    
    # Run agent in background
    background_tasks.add_task(
        agent.run, 
        request.url, 
        request.objective, 
        request.width, 
        request.height
    )
    
    return {"message": "Agent deployed successfully", "status": "IN_PROGRESS"}

@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")

if __name__ == "__main__":
    port = int(os.getenv("PORT", 3001))
    uvicorn.run(socket_app, host="0.0.0.0", port=port)
