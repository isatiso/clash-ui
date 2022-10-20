FROM node:18-buster-slim

WORKDIR /code
COPY ./dist/ /code/dist/

CMD ["node", "/code/dist/clash-material/server/main.js"]

