FROM node:16.13.0-alpine

RUN mkdir -p /home/next

COPY package.json /home/next
WORKDIR /home/next

COPY . /home/next

RUN cd /home/next && yarn install

RUN ls -l

EXPOSE 3000

RUN yarn global add prisma
RUN yarn add prisma --save-dev
RUN yarn add @prisma/client
#RUN prisma migrate dev
RUN prisma migrate deploy
RUN prisma generate


RUN yarn build

CMD yarn dev

