import os
from dotenv import load_dotenv
load_dotenv('.env')
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.socket import socket_io
from src.fastapi import router as fastapi_router

app = FastAPI()

local_dir = os.environ.get("LOCAL_DIRECTORY", "../../") # Path to test results directory
test_reports_dir = os.environ.get("TEST_REPORTS_DIR", "test_reports")

app.add_middleware(
    CORSMiddleware,
    allow_origins='*',
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(fastapi_router)

app.mount("/ws/socket.io", socket_io)

if __name__ == "__main__":
    uvicorn.run(socket_io, host="0.0.0.0", port=8000, lifespan="on", reload=True)