FROM node:12-alpine AS base
WORKDIR /usr/app

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

COPY package.json package.json
COPY yarn.lock yarn.lock
COPY tsconfig.json tsconfig.json
RUN yarn install --production=true

FROM base AS builder
RUN yarn install --production=false

COPY src src
RUN yarn build

FROM base

COPY --from=builder /usr/app/dist ./dist

CMD ["yarn", "start"]
