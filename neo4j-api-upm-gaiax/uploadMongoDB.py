import json
import uuid
from pymongo import MongoClient

def upload_json_to_Mongo(data, uuid, db_name="gaiax_catalogue", collection_name="upm"):
    # Conexión al servidor MongoDB
    # Nota: mongodb-upm-gaiax es el nombre del servicio definido en docker-compose
    client = MongoClient("mongodb://upm:upmgaiax@mongodb-upm-gaiax:27017")  # Incluye usuario y contraseña
    db = client[db_name]
    collection = db[collection_name]
    data['uuid']= uuid

    # Verificar si el JSON ya tiene un UUID
    #if 'uuid' not in data:
    #   data['uuid'] = str(uuid.uuid4())  # Generar un UUID único

    # Insertar el documento en la colección
    result = collection.insert_one(data)

    print(f"Documento insertado con ID: {result.inserted_id}")
    print(f"UUID del documento: {data['uuid']}")

