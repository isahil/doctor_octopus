import socketio
from .fix_client import FixClient

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

sio = socketio.AsyncServer(cors_allowed_origins=origins,async_mode='asgi')
socketio_app = socketio.ASGIApp(sio, socketio_path="/ws/socket.io")

fix_client = FixClient(env="qa", app="fix", fix_side="client", timeout=30, broadcast=True, sio=sio)
fix_dealer = FixClient(env="qa", app="fix", fix_side="dealer", timeout=30, broadcast=True, sio=sio)

__all__ = ["socketio_app", "sio", "fix_client"]

client_count = 0

@sio.on('connect')
async def connect(sid, environ):
    global client_count
    client_count += 1
    print(f"\tConnected to client... [{sid}] | Clients connected: {client_count}")
    await sio.emit('message', f'Hello from the FASTAPI W.S. server! | Clients connected: {client_count}', room=sid)
    #sio.start_background_task(fix_client.connect) # start background task to connect to the fix client session

@sio.on('disconnect')
async def disconnect(sid):
    global client_count
    client_count -= 1
    print(f"\tDisconnected from socket client... [{sid}] | Clients connected: {client_count}")

@sio.on('fixme-client')
async def fixme_client(sid, order_data):
    print(f"\tW.Socket client [{sid}] sent ob order: {order_data}")
    # add steps to process/send order to the fix client session
    # await fix_client.connect()
    await fix_client.submit_order(order_data)

@sio.on('fixme-dealer')
async def fixme_dealer(sid, axe_data):
    print(f"\tW.Socket client [{sid}] sent axe to upload: {axe_data}")
    # add steps to process/send axe to the fix dealer session
    await fix_dealer.connect()
    await fix_dealer.submit_order(axe_data)