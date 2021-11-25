FROM node:16.13.0-alpine

RUN mkdir /home/next

COPY package.json /home/next
WORKDIR /home/next

RUN ls -l

RUN yarn install

COPY . /home/next

EXPOSE 3000

RUN yarn global add prisma
RUN prisma generate

RUN yarn build


