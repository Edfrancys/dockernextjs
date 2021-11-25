FROM node:16.13.0-alpine

RUN yarn global add prisma

WORKDIR /home/next

COPY package*.json ./

RUN yarn install

COPY . ./

EXPOSE 3000

RUN prisma migrate dev

RUN yarn build


