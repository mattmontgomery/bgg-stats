FROM node:12

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN npm run build	

EXPOSE 5000

CMD ["yarn", "start"]
