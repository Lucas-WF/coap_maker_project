from aiocoap import *
from aiocoap import Code
from enum import Enum

class Method(Enum):
    GET = Code.GET
    POST = Code.POST
    PUT = Code.PUT
    DELETE = Code.DELETE

class Client:
    def __init__(self, host: str, port: int) -> None:
        self.host = host
        self.port = port

    async def create_request(self, topic: str, method: Method, payload: str | None = None):

        protocol = await Context.create_client_context()

        if payload != None:
            encoded_payload = payload.encode()
            request = Message(code=method, uri=f'coap://{self.host}:{self.port}/{topic}', payload=encoded_payload)
        else:
            request = Message(code=method, uri=f'coap://{self.host}:{self.port}/{topic}')

        try:
            response = await protocol.request(request).response
        except Exception as e:
            print(e)
        else:
            return response.code, response.payload
