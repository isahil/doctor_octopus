import socketio
import time
from .fix_client import FixClient

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

sio = socketio.AsyncServer(cors_allowed_origins=origins,async_mode='asgi')
socketio_app = socketio.ASGIApp(sio, socketio_path="/ws/socket.io")
fix_client = FixClient(env="qa", app="fix", fix_side="client", timeout=30, broadcast=True, sio=sio)

__all__ = ["socketio_app", "sio", "fix_client"]

client_count = 0

@sio.on('connect')
async def connect(sid, environ):
    global client_count
    client_count += 1
    print(f"\tConnected to client... [{sid}] | Clients connected: {client_count}")
    await sio.emit('message', 'Hello from the FASTAPI W.S. server!', room=sid)

@sio.on('disconnect')
async def disconnect(sid):
    global client_count
    client_count -= 1
    print(f"\tDisconnected from socket client... [{sid}] | Clients connected: {client_count}")

@sio.on('fixme')
async def fixme(sid, order_data):
    print(f"\tW.Socket client sent fix order: {order_data}")
    # add steps to process/send order to the fix client
    # return order_data
    await fix_client.connect(sid, order_data)