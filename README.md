# Catálogo XFSC: Indexación y consulta de credenciales con metadatos ampliados específicos del dominio.

## Objetivo
El objetivo del proyecto es desarrollar una base de datos de grafos que sea fácilmente escalable. Este sistema permitirá almacenar, consultar y manipular grandes volúmenes de datos interrelacionados de manera eficiente.

## Descripción
Este proyecto utiliza **Docker Compose** para desplegar un entorno completo orientado a grafos y bases de datos. Incluye un contenedor de **Neo4j** como base de datos de grafos principal, acompañado de un servicio para aplicar restricciones y configuraciones iniciales. Además, incorpora **MongoDB** como base de datos para guardar el json y extraer un UUID, con persistencia de datos habilitada, y **Mongo Express** para la administración visual de MongoDB. Finalmente, se incluye una **API** específica para interactuar con Neo4j y MongoDB, facilitando la comunicación entre servicios. 

## Herrrmaientas
Signer tool: herramienta utilizada para firmar digitalmente datos 

Service offering: conjunto definido de servicios que una organización ofrece a sus clientes o usuarios

Mongo + MongoExpress: Almacenamiento de los datos del cual se genera un UUID
http://localhost:8081/

FastAPI: inyecta el archivo a mongo, a neo4j y al CES 
http://localhost:8000/docs

neo4j: vista de los grafos donde se ve esquematicamente los servicios que se ofrecen
http://localhost:7474/browser/  upm/upmgaiax

## Instalación y acceso a los servicios
Levantar el entorno con:
docker compose up -d

Acceder a los servicios: 
Pinchando en el localhost de la API y de neo4j




