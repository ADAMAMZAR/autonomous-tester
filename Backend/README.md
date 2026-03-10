# Backend - ABANG Autonomous Agent (Python FASTAPI)

This is the backend service for the ABANG platform, responsible for executing autonomous browser tests using Playwright and Google Gemini AI.

## Features
- **FastAPI**: Modern, fast (high-performance) web framework for building APIs with Python 3.8+ based on standard Python type hints.
- **Playwright Integration**: High-performance browser automation (Chromium).
- **AI-Powered Reasoning**: Uses Google Gemini 1.5 Flash to analyze screenshots and decide on the next testing steps.
- **WebSocket Streaming**: Real-time log updates to the frontend using Socket.io (python-socketio).
- **Live UI**: Launches a non-headless browser so you can see the agent in action.

## Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Environment Variables**:
   Create a `.env` file in the `Backend` directory:
   ```env
   PORT=3001
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Install Playwright Browsers**:
   ```bash
   playwright install chromium
   ```

4. **Run the Server**:
   ```bash
   python src/server.py
   ```

## Agent Capabilities
The agent processes each step by:
1. Capturing a screenshot of the current viewport.
2. Sending the screenshot + objective to Gemini 1.5 Flash.
3. Receiving a structured action (click, type, scroll).
4. Executing the action and emitting logs via WebSockets.

