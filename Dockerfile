FROM redis

COPY redis.conf /home/caiogallo/Documents/allchat/redis.conf

CMD [ "redis-server", "/home/caiogallo/Documents/allchat/redis.conf" ]

EXPOSE 6379

FROM node:10.19.0

USER root

WORKDIR /home/caiogallo/Documents/allchat

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]