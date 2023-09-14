from pydantic import BaseModel

class CoapRequest(BaseModel):
    host: str
    port: int = 5683
    topic: str
    method: str
    payload: str | None = None

