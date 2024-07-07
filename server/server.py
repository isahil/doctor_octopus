from dotenv import load_dotenv
load_dotenv('.env')
import os
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
import uvicorn
import socketio
import time
from local import get_all_local_cards
from S3 import get_a_s3_object
from remote import get_all_s3_cards

aws_bucket_name = os.environ.get('AWS_BUCKET_NAME')

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

local_dir = os.environ.get('LOCAL_DIRECTORY') # Path to test results directory
local_test_reports_dir = os.path.join(local_dir, 'test_reports')

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

@app.get("/run")
def get_help():
    print("Sending run commands...")
    return [ "api", "fix", "perf", "ui", "ws"]

@app.get("/cards")
async def cards(source: str):
    print(f"source: {source}")
    if source == "remote":
        return get_all_s3_cards(aws_bucket_name)
    else:
        return get_all_local_cards()

# get the specific html report content when 'View Report' button is clicked
@app.get("/report", response_class=HTMLResponse)
async def get_report(
    source: str = Query(..., title="Source Name", description="Source of the html report file to be retrieved", example="local"),
    html: str = Query(..., title="HTML Report Name", description="Name of the html report file to be retrieved", example="index.html")):
    if source == "remote":
        html_file_content = get_a_s3_object(aws_bucket_name, html)
        return HTMLResponse(content=html_file_content, status_code=200, media_type="text/html")
    else:
        html_file_path = os.path.join(local_test_reports_dir, html)
        with open(html_file_path, "r") as f:
            html_file_content = f.read()
            return HTMLResponse(content=html_file_content, status_code=200, media_type="text/html")


if __name__ == "__main__":
    uvicorn.run(socket_app, host="0.0.0.0", port=8000, lifespan="on", reload=True)