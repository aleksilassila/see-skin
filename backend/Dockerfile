FROM --platform=linux/amd64 node:18 as prod-base

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
COPY *.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM --platform=linux/amd64 node:18-alpine as production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY prisma ./prisma
COPY package.json ./
COPY *.lock ./

RUN yarn install --frozen-lockfile --prod

COPY --from=prod-base /usr/src/app/dist ./dist
COPY --from=prod-base /usr/src/app/node_modules/.prisma ./node_modules/.prisma

CMD ["yarn", "start"]

FROM node:18 as development

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
COPY *.lock ./
RUN yarn install --frozen-lockfile

RUN npx prisma generate

ENV NODE_ENV=development

CMD ["yarn", "dev"]
