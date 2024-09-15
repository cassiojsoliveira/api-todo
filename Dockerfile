FROM node:latest

WORKDIR /api

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

CMD ["npm","run","start"]

EXPOSE 3000
