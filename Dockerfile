#FROM node:19.3.0-alpine3.16

FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /app

COPY package*.json ./

RUN  npm install

COPY . .

EXPOSE 3000

CMD ['node', 'index.js']