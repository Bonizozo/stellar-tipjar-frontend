# Stellar Tip Jar Frontend

[![CI](https://github.com/Dami24-hub/stellar-tipjar-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/Dami24-hub/stellar-tipjar-frontend/actions/workflows/ci.yml)
[![E2E Tests](https://github.com/Dami24-hub/stellar-tipjar-frontend/actions/workflows/test.yml/badge.svg)](https://github.com/Dami24-hub/stellar-tipjar-frontend/actions/workflows/test.yml)
[![Deploy](https://github.com/Dami24-hub/stellar-tipjar-frontend/actions/workflows/deploy.yml/badge.svg)](https://github.com/Dami24-hub/stellar-tipjar-frontend/actions/workflows/deploy.yml)

A modern, open-source frontend starter for tipping creators with the Stellar network.

This repository uses **Next.js (App Router)**, **TypeScript**, and **TailwindCSS** with a scalable folder structure designed for collaboration.

## Related Repositories

This frontend is one part of the Stellar Tip Jar project:

- [stellar-tipjar-backend](https://github.com/Bonizozo/stellar-tipjar-backend) — REST API this app consumes
- [stellar-tipjar-contracts](https://github.com/Bonizozo/stellar-tipjar-contracts) — Soroban smart contract underlying the on-chain tipping

## Project Description

Stellar Tip Jar allows supporters to send tips to creators using Stellar assets. This frontend starter includes:

- Landing page introducing the project
- Dynamic creator profile route (`/creator/[username]`)
- Explore creators page (`/explore`)
- Tip flow placeholder (`/tips`)
- Reusable UI components (Button, Navbar)
- Wallet connection placeholder for future Stellar wallet integration
- API service layer prepared for backend communication

## Setup Instructions

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create your local environment file:

```bash
cp .env.example .env.local
```

## Development Instructions

1. Start development server:

```bash
npm run dev
```

2. Open `http://localhost:3000`.
3. Run lint checks:

```bash
npm run lint
```

4. Run type checking:

```bash
npm run typecheck
```

5. Build for production:

```bash
npm run build
```

## Project Structure

```text
src/
  app/          # App Router routes and layout
  components/   # Reusable UI components
  hooks/        # Reusable React hooks
  services/     # API service layer
  utils/        # Utility/helper functions
  styles/       # Global and shared styles
```

### Notes for Contributors

- Keep route-specific UI inside `src/app/<route>`.
- Place reusable UI in `src/components`.
- Put API integration logic in `src/services`.
- Keep wallet implementation details in `src/hooks/useWallet.ts`.

## Environment Variables

See `.env.example`:

- `NEXT_PUBLIC_API_URL` - backend base URL
- `NEXT_PUBLIC_STELLAR_NETWORK` - Stellar network (`testnet` by default)

## License

This project is licensed under the MIT License.
