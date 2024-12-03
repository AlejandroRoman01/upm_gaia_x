# Catálogo XFSC: Indexación y consulta de credenciales con metadatos ampliados específicos del dominio.

## Índice
1. [Objetivo](#objetivo)
2. [Descripción](#descripcion)
3. [Herramientas](#herramientas)
4. [Instalación y Acceso a los Servicios](#instalacion-y-acceso-a-los-servicios)

---

## Objetivo
El objetivo del proyecto es desarrollar una base de datos de grafos que sea fácilmente escalable. Este sistema permitirá almacenar, consultar y manipular grandes volúmenes de datos interrelacionados de manera eficiente.

---

## Descripción
Este proyecto utiliza **Docker Compose** para desplegar un entorno completo orientado a grafos y bases de datos. Incluye:

- **Neo4j**: Base de datos de grafos principal, con soporte para restricciones y configuraciones iniciales.
- **MongoDB**: Base de datos para almacenar documentos JSON y generar un UUID, con persistencia de datos habilitada.
- **Mongo Express**: Herramienta de administración visual para gestionar MongoDB.
- **FastAPI**: API específica para interactuar con Neo4j y MongoDB, facilitando la comunicación entre servicios.

Este sistema está diseñado para ser modular, fácil de escalar y administrar, asegurando una integración fluida entre los componentes.

---

## Herramientas

### Signer Tool
- **Descripción**: Herramienta utilizada para firmar digitalmente datos.

### Service Offering
- **Descripción**: Conjunto definido de servicios que una organización ofrece a sus clientes o usuarios.

### Mongo + MongoExpress
- **Descripción**: Almacenamiento de los datos del cual se genera un UUID.
- **URL de acceso**: [http://localhost:8081/](http://localhost:8081/)

### FastAPI
- **Descripción**: Inyecta el archivo a MongoDB, Neo4j y CES.
- **Documentación interactiva**: [http://localhost:8000/docs](http://localhost:8000/docs)

### Neo4j
- **Descripción**: Vista de los grafos donde se visualizan esquemáticamente los servicios que se ofrecen.
- **URL de acceso**: [http://localhost:7474/browser/](http://localhost:7474/browser/) (Credenciales: `upm/upmgaiax`)

---

## Instalación y Acceso a los Servicios

### Instalación
1. Asegúrate de tener **Docker** y **Docker Compose** instalados.
2. Levanta el entorno con el siguiente comando:
   ```bash
   docker compose up -d
   ```

### Acceso a los Servicios
- **Mongo Express**: [http://localhost:8081/](http://localhost:8081/)
- **FastAPI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Neo4j**: [http://localhost:7474/browser/](http://localhost:7474/browser/) (Credenciales: `upm/upmgaiax`)
