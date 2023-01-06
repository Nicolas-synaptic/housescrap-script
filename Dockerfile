FROM node:19.3.0-alpine3.16

WORKDIR /app

COPY package*.json ./

RUN  npm install

COPY . .

CMD ['npm', 'start']