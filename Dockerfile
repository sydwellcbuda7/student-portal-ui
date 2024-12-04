# Stage 1: Build Angular app
FROM node:18 AS build

# Set working directory inside the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source files
COPY . .

# Build the Angular app
RUN npm run build --prod

# Stage 2: Serve Angular app using Nginx
FROM nginx:alpine

# Copy the build files from the previous stage to Nginx's public folder
COPY --from=build /app/dist/student-portal-ui /usr/share/nginx/html

# Expose port 80 (default Nginx port)
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
