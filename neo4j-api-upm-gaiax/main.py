from fastapi import FastAPI, UploadFile, HTTPException, Depends, File
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database import get_db, close_db
from services import create_nodes_and_relationships
from uploadMongoDB import upload_json_to_Mongo 
import json
import requests

app = FastAPI()

@app.post("/insert_json")
async def process_json(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        # Verifica que el archivo sea de tipo JSON
        if not file.filename.endswith(".json"):
            raise HTTPException(status_code=400, detail="El archivo debe ser un archivo JSON")

        # Carga el contenido del archivo JSON en memoria
        contents = await file.read()  # Leer el contenido del archivo
        data = json.loads(contents)  # Cargar el contenido JSON
        #complianceCredential = data["complianceCredential"]
        complianceCredential = data.get("data", {}).get("completeSD", {}).get("complianceCredential", {})
        # TODO añadirlo al data y meterlo en CES

        destination_json = {
        "specversion": "1.0",
        "type": "eu.gaia-x.credential",
        "source": "/mycontext",
        "time": "2024-01-01T06:00:00Z",
        "datacontenttype": "application/json",
        "data": {}
        }

        # Insertar "complianceCredential" dentro del apartado "data"
        destination_json["data"] = complianceCredential

        # Guardar el JSON destino actualizado 
        #with open('./serviceOfferings/cestemplateUpdate.json', 'w') as destination_file:
        #    json.dump(destination_json, destination_file, indent=4)

        # TODO subirlo a CES
        response = requests.post("https://ces-main.lab.gaia-x.eu/credentials-events", json=destination_json, headers={"Content-Type": "application/json"})
        print(response)

        # Recupera el valor del encabezado 'Location'
        location_header = response.headers.get("Location")

        if location_header:
            print(f"Location: {location_header}")
        else:
            print("El encabezado 'Location' no está presente en la respuesta.")
        uuid = location_header.split("/")[-1]
        print(f"UUID: {uuid}")
        # Cargar el JSON desde un archivo y que el uuid sea el que nos devuelve lo CES
        upload_json_to_Mongo(data, uuid)

        # TODO añadir el uuid al grafo
        create_nodes_and_relationships(db, data)
        # TODO añadir el json a CES
        create_nodes_and_relationships(db, data)
        return JSONResponse(content={"message": "Archivo JSON subido exitosamente", "filename": file.filename})

    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="El archivo no es un JSON válido")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al procesar el archivo JSON: {str(e)}")

# Cerrar la conexión a Neo4j al apagar la aplicación
@app.on_event("shutdown")
def shutdown():
    close_db()
