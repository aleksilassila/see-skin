FROM node:18-alpine as base

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
COPY *.lock .

RUN yarn install --frozen-lockfile

FROM --platform=linux/amd64 node:18-alpine as production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV production

COPY . .

COPY --from=base /usr/src/app/node_modules ./node_modules

RUN yarn build

CMD [ "yarn", "start" ]

FROM base as development

ENV NODE_ENV development

CMD [ "yarn", "dev" ]
