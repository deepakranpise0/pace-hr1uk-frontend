# Use official Node.js image as base
FROM node:latest as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --f

# Copy the rest of the application
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Use lightweight Nginx image for serving the Angular app
FROM nginx:alpine

# Copy built app to Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
