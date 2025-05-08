# Avalanche Token Creator API

[![NestJS](https://img.shields.io/badge/NestJS-10.0.0-E0234E.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6.svg)](https://www.typescriptlang.org/)
[![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.27-363636.svg)](https://soliditylang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

A NestJS-based API service for creating ERC-20 tokens on the Avalanche network. This project follows Domain-Driven Design (DDD) principles and implements CQRS pattern.

// ...rest of the existing README content...

## Features

- Create custom ERC-20 tokens on local network (Anvil)
- Configurable token parameters (name, symbol, supply, decimals)
- Optional features: burnable, mintable tokens
- Smart contract verification support
- Swagger API documentation

## Prerequisites

- Node.js (>= 16.x)
- npm or yarn
- Foundry/Anvil for local blockchain
- Solidity compiler

## Project Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/avax-tokenator-backend.git
cd avax-tokenator-backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```bash
RPC_URL=http://127.0.0.1:8545
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
```

4. Start local blockchain (in a separate terminal):
```bash
anvil
```

5. Deploy contracts (in a separate terminal):
```bash
cd smart-contracts
forge script script/CreateToken.s.sol:CreateToken --rpc-url http://127.0.0.1:8545 --broadcast
```

## Running the Application

```bash
# Development mode
npm run start

# Watch mode
npm run start:dev

# Production mode
npm run start:prod
```

## API Documentation

Once the application is running, access the Swagger documentation at:
```
http://localhost:3000/api
```

### Create Token Endpoint

POST /v1/tokens
```json
{
  "ownerAddress": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "name": "RCH Token",
  "symbol": "RHCT",
  "initialSupply": 1000000,
  "decimals": 18,
  "burnable": false,
  "mintable": false,
  "verified": false
}
```

## Project Structure

```
src/
├── domain/              # Business logic and entities
│   └── token/
├── application/         # Use cases and application services
│   └── token/
│       ├── commands/    # CQRS commands
│       ├── interfaces/  # Service interfaces
│       └── dtos/       # Data transfer objects
├── infrastructure/      # External services implementations
│   └── services/
├── presentation/        # API controllers
│   └── controllers/
└── shared/             # Shared utilities and configurations
    └── config/

smart-contracts/        # Solidity smart contracts
├── src/
│   ├── Token.sol       # ERC20 token implementation
│   └── Factory.sol     # Token factory contract
└── script/
    └── CreateToken.s.sol  # Deployment script
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.