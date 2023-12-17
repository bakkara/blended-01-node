FROM node:18-alpine

WORKDIR /app

# COPY ["package.json", "package-lock.json*", "./"]
COPY package*.json .

RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm" , "start"]

# $ docker build -t blended-node-js:1.1 .
# $ docker pull buvoro/blended-node-js:latest
# $ docker push buvoro/blended-node-js
# $ docker run -d -p 3000:3000 blended-node-js
# $ docker image tag blended-node-js buvoro/blended-node-js
# docker stop blended-node-js
