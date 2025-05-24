FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/student-portal /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
