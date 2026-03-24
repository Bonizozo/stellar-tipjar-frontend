# Deployment Guide

## Prerequisites

- Node.js >= 20
- npm
- Environment variables configured

## Environment Variables

Required:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_STELLAR_NETWORK`

Optional:

- `NEXT_PUBLIC_STELLAR_HORIZON_URL`

Example:

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
```

## Local Production Build

```bash
npm install
npm run build
npm run start
```

## Vercel (Recommended)

1. Import repository in Vercel.
2. Set environment variables per environment.
3. Deploy from default branch or preview branches.
4. Validate wallet and API integration in preview URL.

## Docker (Optional)

No `Dockerfile` is currently present. Use this baseline if containerizing:

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "run", "start"]
```

Build/run:

```bash
docker build -t tipjar-frontend .
docker run -p 3000:3000 --env-file .env.local tipjar-frontend
```

## Deployment Checklist

- `npm run typecheck` passes
- `npm run lint` passes
- `npm run build` passes
- Runtime env vars set correctly
- API CORS allows frontend origin
- Wallet flow tested on deployed domain
