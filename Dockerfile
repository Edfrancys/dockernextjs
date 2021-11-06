FROM node:16.13.0-alpine

WORKDIR /home/next

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn build

CMD ["yarn", "dev"]

