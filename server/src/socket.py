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
    print(f"\tConnected to socket client... [{sid}]")
    await sio.emit('message', 'Hello from the FASTAPI WS!', room=sid)

@sio.on('disconnect')
async def disconnect(sid):
    print(f"\tDisconnected from socket client... [{sid}]")

@sio.on('suite')
async def suite(sid, suite_name):
    print(f"\tClient sent request to run test suite: {suite_name}")
    await sio.emit('suite', f"server received trigger request for: {suite_name}", room=sid)
    await sio.emit('suite', f"{suite_name} test suite is running...", room=sid)
    time.sleep(1)
    await sio.emit('suite', f"{suite_name} test suite passed!", room=sid)

@sio.on("fixme")
def fixme(sid, order_data):
    print(f"\tClient sent fix order: {order_data}")
    # add steps to process/send fix order to fix client
    sio.emit('fixme', f"Server received fixme request for: {order_data}", room=sid)