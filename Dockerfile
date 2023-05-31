# Establece la imagen base
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos al directorio de trabajo
COPY . .

# Expone el puerto 3000 (o el puerto que necesites para tu aplicación)
EXPOSE 3000

# Comando que se ejecutará cuando se inicie el contenedor
CMD [ "npm", "start" ]
