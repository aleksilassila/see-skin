FROM node:18

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# COPY ./src /usr/src/app/src
COPY package.json /usr/src/app
RUN yarn install
# RUN npm install --platform=linux --arch=arm64 sharp
# RUN npm install --platform=linuxmusl --arch=arm64
# npm install --platform=linuxmusl --arch=arm64 sharp on host

CMD ["npm", "run", "dev"]
