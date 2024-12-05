FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build --configuration=production

FROM nginx:alpine

RUN apk update && apk upgrade

# Create nginx user and set up permissions
RUN addgroup -g 101 -S nginx || true && \
    adduser -S -D -H -u 101 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx || true && \
    mkdir -p /var/cache/nginx/client_temp /var/run/nginx /tmp && \
    chown -R nginx:nginx /var/cache/nginx /var/run/nginx /tmp && \
    chmod -R 755 /var/cache/nginx /var/run/nginx /tmp

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/student-portal-ui /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

USER nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
