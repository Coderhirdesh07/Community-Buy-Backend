FROM node:24-alphine AS base

WORKDIR /community-buy/backend/src

COPY package*.json ./

RUN npm ci

EXPOSE 3000

CMD ["npm","run","dev"]