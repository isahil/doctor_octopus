from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
import uvicorn
import socketio
import time
import os
import json

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]
app = FastAPI()
sio = socketio.AsyncServer(cors_allowed_origins=origins,async_mode='asgi')
socket_app = socketio.ASGIApp(sio, socketio_path="/ws/socket.io")
app.mount("/ws/socket.io", socket_app)

app.add_middleware(
    CORSMiddleware,
    allow_origins='*',
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

test_results_dir = "../playwright/test_report/" # Path to test results directory

@sio.on('connect')
async def connect(sid, environ):
    print(f"\tconnected to socket client... [{sid}]")
    await sio.emit('message', 'Hello from the FASTAPI WS server!', room=sid)

@sio.on('disconnect')
async def disconnect(sid):
    print(f"\tdisconnected from socket client... [{sid}]")

@sio.on('suite')
async def suite(sid, suite_name):
    print(f"\tclient sent: {suite_name}")
    await sio.emit('suite', f"server received trigger request for: {suite_name}", room=sid)
    time.sleep(2)
    await sio.emit('suite', f"{suite_name} test suite is running...", room=sid)
    time.sleep(3)
    await sio.emit('suite', f"{suite_name} test suite passed!", room=sid)

@app.get("/cards")
def cards():
    test_results = []
    for folder in os.listdir(test_results_dir):
        folder_path = os.path.join(test_results_dir, folder)
        print(f"folder path: {folder_path}")
        report_card = {"json_report": {}, "html_report": ""}

        if os.path.isdir(folder_path):
            for file in os.listdir(folder_path):
                file_path = os.path.join(folder_path, file)

                if file.endswith(".json"):
                    with open(file_path, "r") as f:
                        # test_results.append(json.load(f))
                        report_card["json_report"] = json.load(f)
                if file.endswith(".html"):       
                    html_file_path = os.path.join(folder, file)             
                    print(f"html file path: {html_file_path}")
                    report_card["html_report"] = str(html_file_path)
                
        test_results.append(report_card)

    return test_results

@app.get("/reports", response_class=HTMLResponse)
async def get_report(html: str = Query(..., title="HTML Report Name", description="Name of the html report file to be retrieved", example="index.html")):
    print(f"Sending {html} report...")
    html_file_path = os.path.join(test_results_dir, html)
    with open(html_file_path, "r") as f:
        html_file_content = f.read()
        return HTMLResponse(content=html_file_content, status_code=200, media_type="text/html")


@app.get("/help")
def get_help():
    print("Sending help...")
    return [ "api", "fix", "perf", "ui", "ws"]

# @app.get("/ws/socket.io/help/{test}")
# def get_help_test():
#     print("\tRunning {test} Test...")
#     print("\t{test} Test Passed!")
#     return ["{test} Test Trigger Request Receive."]

# @app.get("/api")
# def get_api():
#     print("\tRunning API Test...")
#     print("\tAPI Test Passed!")
#     return ["API Test Result: Passed"]

# def get_fix():
#     print("\tRunning FIX Test...")
#     print("\tFIX Test Passed!")
#     return ["FIX Test Result: Passed"]

# def get_perf():
#     print("\tRunning Performance Test...")
#     print("\tPerformance Test Passed!")
#     return ["Performance Test Result: Passed"]

# def get_ui():
#     print("\tRunning UI Test...")
#     print("\tUI Test Passed!")
#     return ["UI Test Result: Passed"]

if __name__ == "__main__":
    uvicorn.run(socket_app, host="0.0.0.0", port=8000, lifespan="on", reload=True)