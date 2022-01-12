FROM node:15.12.0-alpine3.10 AS development

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install glob rimraf
RUN npm install
COPY . .
RUN npm run build


