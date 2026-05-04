# Etapa 1: Build
FROM node:20-alpine as build-stage

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración de paquetes
COPY package.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Argumento para la URL de la API durante la construcción
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Serve
FROM nginx:alpine as production-stage

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos desde la etapa anterior
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exponer el puerto 80 (dentro del contenedor)
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
