FROM node:18-alpine
RUN npm install -g ts-node
RUN npm install -g nodemon
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]