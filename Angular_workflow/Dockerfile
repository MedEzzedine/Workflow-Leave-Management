##Stage 1

FROM node:16.16.0 as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm update -g npm \
    && npm config set fetch-retries 3 \
    && npm config set fetch-retry-mintimeout 100000 \
    && npm config set fetch-retry-maxtimeout 600000 \
    && npm config set cache-min 3600 \
	&& npm ci --legacy-peer-deps --maxsockets=3

RUN npm run build

## Stage 2

FROM nginx:1.22-alpine

COPY --from=build /usr/local/app/dist/workflow-frontend /usr/share/nginx/html

EXPOSE 80