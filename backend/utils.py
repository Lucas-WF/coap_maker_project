from fastapi import status
from coap.coap import Method

def coap_to_http(coap_code):
    coap_code = int(str(coap_code).replace(".", "")[0:3])

    if(coap_code == 202):
        return status.HTTP_204_NO_CONTENT
    elif(coap_code == 203):
        return status.HTTP_304_NOT_MODIFIED
    elif(coap_code == 205):
        return status.HTTP_200_OK
    elif(coap_code == 402):
        return status.HTTP_400_BAD_REQUEST
    else:
        return coap_code

def check_method(method: str) -> Method:
    if method.lower() == "get":
        return Method.GET
    elif method.lower() == "post":
        return Method.POST
    elif method.lower() == "put":
        return Method.PUT
    elif method.lower() == "delete":
        return Method.DELETE
    else:
        raise TypeError