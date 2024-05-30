from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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
    test_results_dir = "./playwright-report"
    test_results = []
    for file in os.listdir(test_results_dir):
        if file.endswith(".json"):
            with open(f"{test_results_dir}/{file}", "r") as f:
                test_results.append(json.load(f))
    print(f"\tSending {len(test_results)} test results...")
    return test_results

@app.get("/help")
def get_help():
    print("\tSending help...")
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