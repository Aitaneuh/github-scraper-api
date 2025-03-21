# Use the official Puppeteer image (includes Node.js, Chromium, and necessary dependencies)
FROM ghcr.io/puppeteer/puppeteer:latest

# Set the working directory inside the container
WORKDIR /app

# Copy only package files first to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies (use npm ci for production environment)
ENV NODE_ENV=production
RUN npm ci --omit=dev

# Copy all project files into the container
COPY . .

# Expose port 4000 (or change it if needed)
EXPOSE 4000

# Start the application
CMD ["node", "src/server.js"]
