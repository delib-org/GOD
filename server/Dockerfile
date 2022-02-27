FROM node:16.13.1-alpine

#Creating a new directory for app files and setting path in the container
RUN mkdir -p /usr/godapp/server/src
#setting working directory in the container
WORKDIR /usr/godapp/server

COPY package*.json ./
RUN npm install
COPY . ./

CMD ["npm", "run", "dev"]