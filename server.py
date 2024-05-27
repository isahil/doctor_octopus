from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import socketio

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
    print(f"connected to socket client... [{sid}]")
    await sio.emit('message', 'Hello from the FASTAPI WS server!', room=sid)

@sio.on('disconnect')
async def disconnect(sid):
    print(f"disconnected from socket client... [{sid}]")

@sio.on('message')
async def message(sid, message):
    print(f"client message received: {message}")
    await sio.emit('message', f"WS SERVER RECEIVED: {message}", room=sid)

@app.get("/")
def root():
    print("\tsending root")
    return ["Hello, World!"]

# # This is not needed?
# @app.get("/ws/socket.io")
# def message():
#     print("\tmessage api called...")

@app.get("/help")
def get_help():
    print("\tsending help")
    return ["joke", "weather", "art"]

@app.get("/riddle")
def get_riddle():
    print("\tsending riddle")
    return ["love", "happiness", "life"]

@app.get("/weather")
def get_weather():
    print("\tsending weather")
    return ["Always Sunny"]

@app.get("/art")
def get_art():
    return ["Mona Lisa"]

if __name__ == "__main__":
    uvicorn.run(socket_app, host="0.0.0.0", port=8000, lifespan="on", reload=True)