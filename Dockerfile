FROM node:16-alpine as ssr

WORKDIR /code
COPY ./dist/ /code/dist/
CMD ["node", "/code/dist/clash-ui/server/main.js"]

FROM nginx:alpine

COPY ./nginx-default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=ssr /code/dist/clash-ui/browser /usr/share/nginx/html
CMD nginx -g "daemon off;"
