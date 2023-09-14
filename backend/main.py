from fastapi import FastAPI, Response, status
from coap.coap import Client
from utils import coap_to_http, check_method
from models import CoapRequest
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client_list = []

@app.get("/")
async def main():
    return {"Message": "It's working"}

@app.post('/coap_request', status_code=status.HTTP_200_OK)
async def create(response: Response, coapRequest: CoapRequest):
    client = Client(host=coapRequest.host, port=coapRequest.port)
    client_list.append(client)
    
    try:
        coap_code, coap_response = await client.create_request(coapRequest.topic, 
                    method=check_method(coapRequest.method).value, payload=coapRequest.payload)
        payload = coap_response.decode("utf-8")
        response.status_code = coap_to_http(coap_code)
        return {"message": payload}

    except:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"Message": "Coap Method Not Found"}
