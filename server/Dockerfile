FROM node:18

WORKDIR /app

# install dependencies (including devDeps for build)
COPY package*.json ./
RUN npm ci

# copy source and build
COPY . .
RUN npm run build

ENV PORT=8080

EXPOSE 8080

CMD [ "npm", "start" ]