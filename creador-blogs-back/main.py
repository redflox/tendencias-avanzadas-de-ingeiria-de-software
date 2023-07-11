from fastapi import FastAPI, UploadFile, HTTPException, File, Response, status, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from lxml import etree
from typing import Optional
import re
from models.api import ApiResponse
from datetime import datetime
import os
import zipfile
import shutil

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
        # Leemos el archivo XSD de nuestro sistema local------------------------------------
        with open("./resources/xsd0.1.xsd", 'rb') as xsd_file:
            schema_root = etree.XML(xsd_file.read())
        schema = etree.XMLSchema(schema_root)
        # Ahora leemos el archivo XML que se subió------------------------------------------
        xml_content = await file.read()
        xml_content = re.sub(b'\<\?xml.*\?\>', b'', xml_content)
        doc = etree.fromstring(xml_content)
        # Validamos el archivo XML con el XSD-----------------------------------------------
        if not schema.validate(doc):
            error = schema.error_log.last_error
            raise Exception(str(error))
        # Transformamos el XML a HTML-------------------------------------------------------
        with open('./resources/transform.xslt', 'rb') as xslt_file:
            xslt_root = etree.XML(xslt_file.read())
        transform = etree.XSLT(xslt_root)
        result_tree = transform(doc)
        result_str = etree.tostring(result_tree, pretty_print=True)
        result = result_str.decode('utf-8')

        # Generar comprimido----------------------------------------------------------------
        # Obtener la hora actual
        current_time = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        # Crear el nombre del archivo con la hora actual
        filename = f"result_{current_time}.html"
        zipname = f'zip_{current_time}'
        # Crear carpeta de proyectos generados
        os.makedirs('GENERATORS', exist_ok=True)
        # Crear carpeta
        os.makedirs(f'./GENERATORS/result_{filename}', exist_ok=True)
        # Guardar el código generado en el archivo HTML
        with open(f'./GENERATORS/result_{filename}/index.html', 'w') as file:
            file.write(result)
        # Crear archivo ZIP
        zip_filename = f'./GENERATORS/result_{filename}.zip'
        css_folder_path = './resources/css'
        assets_folder_path = './resources/assets'
        with zipfile.ZipFile(f'./GENERATORS/{zipname}.zip', 'w') as zip_file:
            # Agregar carpeta 'assets' al archivo ZIP
            for root, _, files in os.walk(assets_folder_path):
                for file in files:
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, css_folder_path)
                    zip_file.write(file_path, arcname=os.path.join('css', arcname))
            # Agregar carpeta 'css' al archivo ZIP
            for root, _, files in os.walk(css_folder_path):
                for file in files:
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, css_folder_path)
                    zip_file.write(file_path, arcname=os.path.join('css', arcname))
            zip_file.write(f'./GENERATORS/result_{filename}/index.html', arcname='index.html')
        # Borrar la carpeta:
        shutil.rmtree(f'./GENERATORS/result_{filename}')
        res.status_code = status.HTTP_200_OK
        response.status = status.HTTP_200_OK
        # response.data = [str(result)]
        response.data = f"http://localhost:8000/download/{zipname}"
        response.message = "XML VALIDO"
    except Exception as e:
        print('ERROR:', str(e))
        res.status_code = status.HTTP_200_OK
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = []
        response.message = str(e)
    return response

@app.get("/download/{filename}")
async def download_file(filename: str):
    try:
        return FileResponse(path=f'./GENERATORS/{filename}.zip', filename=filename, media_type='application/zip')
    except Exception as e:
        return Response(content={"message": "Archivo no encontrado."}, status_code=404)
