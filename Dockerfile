# Gunakan base image Node.js
FROM node:18-alpine

# Set direktori kerja
WORKDIR /app

# Copy file package.json & package-lock.json
COPY package*.json ./

# Install dependency
RUN npm ci --no-audit --no-fund

# Copy semua kode project
COPY . .

# Build project untuk production
RUN npm run build

# Expose port default Next.js
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm","start"]
