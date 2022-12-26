FROM node:16-alpine AS dev

WORKDIR /app

COPY package*.json ./

RUN npm install --only=dev

COPY . .

RUN npm run build

FROM node:16-alpine AS prod

ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

RUN npm install --only=prod

COPY . .

COPY --from=dev /usr/src/app/dist ./dist

CMD ["node", "dist/main"]