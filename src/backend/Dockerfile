# Usar una imagen oficial de Node.js como base (ligera)
FROM node:20-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json (no el de la raíz del workspace, sino solo el del backend)
# Wait, the application uses yarn workspace. We need to be careful.
# If we just copy the backend package.json, we might not have the yarn.lock.
# Actually, since it's just the backend package.json without workspace dependencies, npm install/yarn install might work fine. Let's copy it.
COPY package.json ./

# Instalar las dependencias del backend usando npm o yarn.
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto en el que la app correrá (por defecto 3000)
EXPOSE 3000

# Iniciar la aplicación
CMD ["npm", "start"]
