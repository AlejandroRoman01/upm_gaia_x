FROM node:18.17.0

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala las dependencias de producción
RUN npm ci

# Copia el resto del código al contenedor
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto en el que la app escucha
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]