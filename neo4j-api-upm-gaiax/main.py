from fastapi import FastAPI, UploadFile, HTTPException, Depends, File
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database import get_db, close_db
from services import create_nodes_and_relationships
from uploadMongoDB import upload_json_to_Mongo 
import json

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
        upload_json_to_Mongo(data)
         # Leer el archivo JSON
        #data = load_json_file('jsons/vp_serviceOffering.json')
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
