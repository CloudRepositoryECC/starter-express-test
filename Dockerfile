FROM node:18.19-alpine3.18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest && \
    npm install && \
    npm cache clean --force

# Salin sisa kode aplikasi
ENV APP_VERSION=API_VERSION

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
