# Stage 1: Build the application
FROM node:23 AS builder
WORKDIR /app

# Copy dependency definitions and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy application source and build
COPY . .
RUN npm run build

# Stage 2: Run the application in production
FROM node:23-alpine
WORKDIR /app

# Defina as variáveis de ambiente com ENV (valores padrão)
ENV NODE_ENV=production
ENV RPC_URL="https://avax-fuji.g.alchemy.com/v2/rjiHSe1EPonp-yhcWKxc45Pf_KbCslyA"
ENV PRIVATE_KEY="0x8aa09d3869f0120c35b2540e83e76054cec021e334dcf07e2cd8bb639a511b98"
ENV CONTRACT_ADDRESS="0x67918869C2E651966F31F3fEDAAc2551b3a9f578"
ENV CHAIN="avalanchefuji"

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install --only=production --legacy-peer-deps

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]