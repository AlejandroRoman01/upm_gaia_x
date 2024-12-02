import os
from neo4j import GraphDatabase

# Configuración de Neo4j
NEO4J_URI = os.getenv("NEO4J_URI", "bolt://neo4j-upm-gaiax:7687")
NEO4J_USER = os.getenv("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD", "upmgaiax")

# Crear el driver de conexión a Neo4j
driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

# Obtener la sesión de la base de datos
def get_db():
    return driver.session()

# Cerrar la conexión
def close_db():
    driver.close()