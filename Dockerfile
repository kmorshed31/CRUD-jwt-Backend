# Use lightweight Node environment
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm install --only=production

# Copy project files
COPY . .

# Expose API port
EXPOSE 5000

# Start server
CMD ["node", "index.js"]
