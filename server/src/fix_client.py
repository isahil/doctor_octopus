import time

class FixClient():
    env = None
    app = None
    fix_side = None
    sio = None

    def __init__(self, **kwargs):
        self.env = kwargs.get('env', 'prod')
        self.app = kwargs.get('app', 'fix')
        self.fix_side = kwargs.get('fix_side', 'buy')
        self.timeout = kwargs.get('timeout', 30)
        self.broadcast = kwargs.get('broadcast', False)
        self.sio = kwargs.get('sio', None)
    
    async def connect(self):
        env = self.env
        app = self.app
        fix_side = self.fix_side
        timeout = self.timeout
        broadcast = self.broadcast

        print(f"Connecting to {env} env | {app} app | {fix_side} fix_side | Broadcast: {broadcast}")
        # return order_data
        while timeout > 0:
            message = f"Message : {timeout}"
            if broadcast is True:
                print(f"Broadcasting: {message}")
                await self.sio.emit('fixme-client', message)
            timeout -= 1
            time.sleep(1)
    
    async def submit_order(self, order_data):
        print(f"submitting order: {order_data}")
        await self.sio.emit('fixme-client', order_data)
        return order_data

__name__ == "__main__" and FixClient(env="dev", app="fix", fix_side="dealer", timeout=10)