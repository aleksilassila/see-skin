FROM --platform=linux/amd64 nginx:1.24.0-alpine as production

COPY ./default.prod.conf /etc/nginx/conf.d/default.conf

FROM nginx:1.24.0-alpine as development

COPY ./default.prod.conf /etc/nginx/conf.d/default.conf
