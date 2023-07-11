from fastapi import FastAPI, UploadFile, HTTPException, File, Response, status
from fastapi.middleware.cors import CORSMiddleware
from lxml import etree
from typing import Optional
import re
from models.api import ApiResponse

app = FastAPI()

# Configuración de políticas de acceso desde orígenes cruzados (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/validate_xml/', response_model=ApiResponse)
async def validate_xml(file: UploadFile = File(...), res: Response = None):
    try:
        response = ApiResponse(status="", data=[], message="")
        # Leemos el archivo XSD de nuestro sistema local
        with open("./resources/xsd0.1.xsd", 'rb') as xsd_file:
            schema_root = etree.XML(xsd_file.read())
        schema = etree.XMLSchema(schema_root)
        # Ahora leemos el archivo XML que se subió
        xml_content = await file.read()
        xml_content = re.sub(b'\<\?xml.*\?\>', b'', xml_content)
        doc = etree.fromstring(xml_content)
        # Validamos el archivo XML con el XSD
        if not schema.validate(doc):
            error = schema.error_log.last_error
            raise Exception(str(error))
        res.status_code = status.HTTP_200_OK
        response.status = status.HTTP_200_OK
        response.data = []
        response.message = "XML VALIDO"
    except Exception as e:
        print('ERROR:', str(e))
        res.status_code = status.HTTP_200_OK
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = []
        response.message = str(e)
    return response
