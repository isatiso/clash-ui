FROM node:18-buster-slim

WORKDIR /code
COPY ./dist/ /code/dist/

CMD ["node", "/code/dist/clash-ui/server/main.js"]

