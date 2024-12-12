# Step 1: Use official Node.js image to build the Angular app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to install dependencies
COPY package*.json ./

# Install the Angular dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Step 2: Use official Nginx image to serve the built Angular app
FROM nginx:alpine

# Update the default Nginx configuration to listen on port 4200
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy the built Angular app from the previous stage to Nginx's default folder
COPY --from=build /app/dist/student-portal /usr/share/nginx/html

# Expose port 4200
EXPOSE 4200

# Command to run Nginx (this is the default in the Nginx image)
CMD ["nginx", "-g", "daemon off;"]
