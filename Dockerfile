FROM node:22.13.1-alpine AS build

# Set working directory
WORKDIR /app

# Set environment variables for API endpoints (these are for build-time only)
ENV VITE_WAREHOUSE_API_URL=/warehouse
ENV VITE_MERCHANTS_API_URL=/merchants

# Copy package files
COPY package*.json ./

# Install dependencies (use npm ci for clean installs)
RUN npm ci

# Copy the rest of the application
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy built files from build stage
COPY --from=build /app/dist .

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port 80
EXPOSE 80

# Set entrypoint and command
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]