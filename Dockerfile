FROM node:10.19.0

USER root

WORKDIR /home/caiogallo/Documents/allchat

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]