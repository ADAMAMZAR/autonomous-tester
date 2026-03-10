import asyncio
import base64
import json
import os
import re
from datetime import datetime
from playwright.async_api import async_playwright
import google.generativeai as genai

class AbangAgent:
    def __init__(self, api_key, sio):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.5-flash-lite')
        self.sio = sio

    async def log(self, log_type, message):
        timestamp = datetime.now().strftime("%H:%M:%S")
        print(f"[{timestamp}] [{log_type}] {message}")
        await self.sio.emit('agent_log', {
            'timestamp': timestamp,
            'type': log_type,
            'message': message
        })

    async def emit_screenshot(self, screenshot_base64):
        await self.sio.emit('agent_screenshot', {
            'data': screenshot_base64
        })

    async def run(self, url, objective, width, height):
        await self.log('SYSTEM', f'Initializing Abang Agent for mission: {objective}')
        
        async with async_playwright() as p:
            # Running Headless since visual will be in terminal panel
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(
                viewport={'width': width, 'height': height},
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
            )
            page = await context.new_page()

            try:
                await self.log('ACTION', f'Navigating to {url}')
                await page.goto(url, wait_until='domcontentloaded', timeout=60000)
                await asyncio.sleep(2)

                steps = 0
                max_steps = 10

                while steps < max_steps:
                    steps += 1
                    
                    # Take screenshot for AI analysis and UI preview
                    screenshot_bytes = await page.screenshot(type='png')
                    screenshot_base64 = base64.b64encode(screenshot_bytes).decode('utf-8')
                    
                    # Emit screenshot to frontend
                    await self.emit_screenshot(screenshot_base64)
                    
                    await self.log('THOUGHT', f'Analyzing page state... (Step {steps})')
                    
                    prompt = f"""
                    You are an autonomous web testing agent named ABANG.
                    Objective: {objective}
                    Current URL: {page.url}
                    
                    Analyze the current page and suggest the next action to achieve the objective.
                    Provide your response in JSON format:
                    {{
                        "thought": "your reasoning",
                        "action": "click|type|scroll|wait|complete",
                        "selector": "css selector if needed",
                        "value": "text to type if needed"
                    }}
                    """

                    response = await self.model.generate_content_async([
                        prompt,
                        {'mime_type': 'image/png', 'data': screenshot_base64}
                    ])

                    response_text = response.text
                    plan = None
                    try:
                        # Clean the markdown if present
                        json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
                        plan = json.loads(json_match.group(0) if json_match else response_text)
                    except Exception as e:
                        await self.log('SYSTEM', f'Failed to parse AI response: {str(e)}. Retrying...')
                        continue

                    await self.log('THOUGHT', plan.get('thought', 'Thinking...'))

                    action = plan.get('action')
                    if action == 'complete':
                        await self.log('SYSTEM', 'Objective achieved!')
                        break

                    if action == 'click':
                        selector = plan.get('selector')
                        await self.log('ACTION', f'Clicking {selector}')
                        await page.click(selector)
                    elif action == 'type':
                        selector = plan.get('selector')
                        value = plan.get('value')
                        await self.log('ACTION', f'Typing "{value}" into {selector}')
                        await page.fill(selector, value)
                    elif action == 'scroll':
                        await self.log('ACTION', 'Scrolling page')
                        await page.mouse.wheel(0, 500)
                    
                    await asyncio.sleep(2)

            except Exception as e:
                await self.log('SYSTEM', f'CRITICAL ERROR: {str(e)}')
            finally:
                # await browser.close() # Keep open for a bit for demo or close? 
                # Node version didn't explicitly close in the try/catch logic shown but it should.
                await browser.close()
                await self.log('SYSTEM', 'Mission session ended.')
