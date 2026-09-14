FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache --virtual .build-deps python3 make g++ git

COPY package*.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runner
LABEL org.opencontainers.image.description="numeraid-ui docker image"

RUN apk add --no-cache curl

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod -R 755 /usr/share/nginx/html \
  && chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/run /var/log/nginx

EXPOSE 80

STOPSIGNAL SIGTERM

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]