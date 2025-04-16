FROM node:latest

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

WORKDIR /app/src/Backend/Express

EXPOSE 5001

CMD ["node", "server.js"]