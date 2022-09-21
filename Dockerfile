FROM node:16.13.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN yarn install

CMD [ "npm", "run", "dev" ]
