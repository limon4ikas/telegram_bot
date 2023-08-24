FROM node:20-alpine3.17

RUN npm install -g pnpm

WORKDIR /app
COPY ./pnpm-lock.yaml pnpm-lock.yaml
COPY ./package.json package.json

COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm build

EXPOSE 3000
CMD ["node", "./dist/index.js"]