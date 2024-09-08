import socketio
import time

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

sio = socketio.AsyncServer(cors_allowed_origins=origins,async_mode='asgi')
socket_io = socketio.ASGIApp(sio, socketio_path="/ws/socket.io")

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
    time.sleep(1)
    await sio.emit('suite', f"{suite_name} test suite is running...", room=sid)
    time.sleep(2)
    await sio.emit('suite', f"{suite_name} test suite passed!", room=sid)
