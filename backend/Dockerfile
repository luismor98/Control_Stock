FROM node:22-alpine

WORKDIR /app

# Copiar package.json del backend
COPY package.json package-lock.json* pnpm-lock.yaml* ./

# Instalar dependencias con una versión específica de pnpm (v9)
RUN npm install -g pnpm@9 && pnpm install

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 3001

# Comando para ejecutar la app
CMD ["pnpm", "run", "start"]
