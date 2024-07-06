from dotenv import load_dotenv
load_dotenv('.env')
import os
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
import uvicorn
import socketio
import time
import json
from S3 import download_s3_objects

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

local_test_reports_dir = os.environ.get('LOCAL_REPORTS_DIR') # Path to test results directory
remote_test_reports_dir = os.environ.get('REPORTS_DIR') # Path to test results directory


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

@app.get("/help")
def get_help():
    print("Sending help...")
    return [ "api", "fix", "perf", "ui", "ws"]

# get test results summary "json_report" and "html_report" path from the test_report directory 
# for the card component to display on the portal
@app.get("/cards")
def cards(source: str):
    test_results = []
    print(f"source: {source}")
    test_reports_directory = ""
    if source == "local": 
        test_reports_directory = local_test_reports_dir
    else: 
        test_reports_directory = remote_test_reports_dir
        download_s3_objects(aws_bucket_name)

    for folder in os.listdir(test_reports_directory):
        folder_path = os.path.join(test_reports_directory, folder)
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


# get all the test reports in the test_report directory
# @app.get("/reports")
# def reports():
#     html_reports = []
#     for folder in os.listdir(local_test_reports_dir):
#         folder_path = os.path.join(local_test_reports_dir, folder)
#         print(f"folder path: {folder_path}")
#         if os.path.isdir(folder_path):
#             for file in os.listdir(folder_path):
#                 file_path = os.path.join(folder_path, file)
#                 if file.endswith(".html"):
#                     html_reports.append(file_path)
#     return html_reports

# get the specific html report content when 'View Report' button is clicked
@app.get("/report", response_class=HTMLResponse)
async def get_report(html: str = Query(..., title="HTML Report Name", description="Name of the html report file to be retrieved", example="index.html")):
    html_file_path = os.path.join(local_test_reports_dir, html)
    with open(html_file_path, "r") as f:
        html_file_content = f.read()
        return HTMLResponse(content=html_file_content, status_code=200, media_type="text/html")

@app.get("logs")
async def get_logs():
    logs = []
    for folder in os.listdir(local_test_reports_dir):
        folder_path = os.path.join(local_test_reports_dir, folder)
        print(f"folder path: {folder_path}")

        if os.path.isdir(folder_path):
            for file in os.listdir(folder_path):
                file_path = os.path.join(folder_path, file)

                if file.endswith(".log"):
                    with open(file_path, "r") as f:
                        logs.append(f.read())
                
    return logs


# @app.get("/ws/socket.io/help/{test}")
# def get_help_test():
#     print("\tRunning {test} Test...")
#     print("\t{test} Test Passed!")
#     return ["{test} Test Trigger Request Receive."]

if __name__ == "__main__":
    uvicorn.run(socket_app, host="0.0.0.0", port=8000, lifespan="on", reload=True)