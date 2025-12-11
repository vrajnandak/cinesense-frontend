# ---------- Stage 1: Build the frontend ----------
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the Vite project
RUN npm run build



# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:alpine

# Copy built assets from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional)
# Uncomment if you add nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

