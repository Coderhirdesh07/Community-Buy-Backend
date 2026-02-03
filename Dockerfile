FROM node:24-alpine AS base

WORKDIR /community-buy/backend/src

COPY package*.json ./

RUN npm ci

COPY .. /community-buy/backend/src/ 

EXPOSE 3000

CMD ["npm","run","dev"]