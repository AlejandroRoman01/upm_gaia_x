import json
import uuid
from pymongo import MongoClient

def subir_json_a_mongo(json_path, db_name="gaiax_catalogue", collection_name="upm"):
    # Conexión al servidor MongoDB
    client = MongoClient("mongodb://mongodb-upm.gaiax:27017")  # Cambia la URI si tu MongoDB está en otro lugar
    db = client[db_name]
    collection = db[collection_name]

    # Cargar el JSON desde un archivo
    with open(json_path, 'r') as file:
        data = json.load(file)

    # Verificar si el JSON ya tiene un UUID
    if 'uuid' not in data:
        data['uuid'] = str(uuid.uuid4())  # Generar un UUID único

    # Insertar el documento en la colección
    result = collection.insert_one(data)

    print(f"Documento insertado con ID: {result.inserted_id}")
    print(f"UUID del documento: {data['uuid']}")

    # Retornar el UUID generado
    return data['uuid']

# Llamar a la función con la ruta del archivo JSON
json_path = './mi_json.json'  # Cambia esto a la ubicación de tu archivo JSON
uuid_generado = subir_json_a_mongo(json_path)

print(f"UUID generado o existente: {uuid_generado}")
