import asyncio
import websockets
from websockets import ConnectionClosed


class Server:
    HOST = ''
    PORT = 28367

    def __init__(self, width, height):
        self.width = width
        self.height = height

        self.board = [[0 for _ in range(width)] for _ in range(height)]

        self.clients = set()

    async def handler(self, websocket, path):
        self.clients.add(websocket)

        try:
            async for message in websocket:
                print('>', message)
                if message[:4] == 'GMAP':
                    data = ''
                    for y in range(len(self.board)):
                        for x in range(len(self.board[y])):
                            data += hex(self.board[y][x])[2:]
                    await websocket.send(f'MAP{self.width:05d}{self.height:05d}{data}')

                elif message[:4] == 'STLE':
                    x = int(message[4:9])
                    y = int(message[9:14])
                    tile_code = int(message[14], 16)
                    self.board[y][x] = tile_code

                    await self.broadcast(message)
        except ConnectionClosed:
            pass

        self.clients.remove(websocket)

    async def broadcast(self, message):
        for client in self.clients:
            await client.send(message)

    def start(self):
        asyncio.get_event_loop().run_until_complete(
            websockets.serve(self.handler, Server.HOST, Server.PORT))
        print(f'서버가 {Server.HOST}:{Server.PORT}에서 열렸습니다.')
        asyncio.get_event_loop().run_forever()
