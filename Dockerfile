# Etapa 1: Build de React con Vite
FROM node:22-alpine as build

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias con una versión específica de pnpm (v9)
RUN npm install -g pnpm@9 && pnpm install

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN pnpm run build

# Etapa 2: Servidor Nginx
FROM nginx:alpine

# Eliminar la configuración predeterminada de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos construidos desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
