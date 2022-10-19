FROM node:16

WORKDIR /code
COPY ./dist/ /code/dist/

CMD ["node", "/code/dist/clash-material/server/main.js"]

