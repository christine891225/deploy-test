FROM node:16-alpine as fe-builder

COPY frontend /app
WORKDIR /app

RUN yarn install
RUN yarn build

FROM node:16-alpine

EXPOSE 4000

COPY backend /app/backend
COPY --from=fe-builder /app/build /app/frontend/build
WORKDIR /app/backend

RUN corepack enable
RUN yarn install

CMD ["yarn", "deploy"]