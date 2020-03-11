FROM node:10.19.0

USER root

WORKDIR /home/caiogallo/Documents/allchat

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# FROM redis

# # Linux 
# # COPY redis.conf /home/caiogallo/Documents/allchat/redis.conf
# # Mac 
# COPY redis.conf /Users/caiogallo/documents/allchat/redis.conf

# # Linux 
# # CMD [ "redis-server", "/home/caiogallo/Documents/allchat/redis.conf" ]
# # Mac 
# CMD [ "redis-server", "/Users/caiogallo/documents/allchat/redis.conf" ]


# EXPOSE 6379