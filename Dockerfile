FROM node:22-alpine

WORKDIR /ping-auth-service

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"] 
