from fastapi import FastAPI, UploadFile, HTTPException, File
from fastapi.middleware.cors import CORSMiddleware
from lxml import etree
from typing import Optional
import re

app = FastAPI()

# Configuración de políticas de acceso desde orígenes cruzados (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/validate_xml/")
async def validate_xml(file: UploadFile = File(...)):
    # Leemos el archivo XSD de nuestro sistema local
    with open("blog.xsd", 'rb') as xsd_file:
        schema_root = etree.XML(xsd_file.read())

    schema = etree.XMLSchema(schema_root)

    # Ahora leemos el archivo XML que se subió
    xml_content = await file.read()
    xml_content = re.sub(b'\<\?xml.*\?\>', b'', xml_content)

    
    try:
        doc = etree.fromstring(xml_content)
    except Exception as e:
        raise HTTPException(status_code=400, detail="XML mal formado") from e

    # Validamos el archivo XML con el XSD
    if not schema.validate(doc):
        error = schema.error_log.last_error
        raise HTTPException(status_code=400, detail=str(error))

    return {"detail": "Archivo XML válido"}
