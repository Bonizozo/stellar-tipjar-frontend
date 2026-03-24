# Contributing Guide

## Branching and Workflow

1. Sync with latest default branch.
2. Create feature branch:

```bash
git checkout -b feat/short-description
```

3. Make focused changes.
4. Run quality checks:

```bash
npm run typecheck
npm run lint
npm run build
```

5. Commit with clear conventional-style message.
6. Open PR with summary + test plan.

## Commit Message Style

Preferred examples:

- `feat(api): add rate limiting and throttling`
- `fix(wallet): handle permission decline message`
- `docs: improve architecture diagrams`

## Pull Request Checklist

- Scope is focused and reviewable
- Docs are updated when behavior changes
- New env vars are documented
- Error handling and loading states are covered
- No secrets committed

## Coding Expectations

- Keep UI in components, logic in hooks/services.
- Add types for external data contracts.
- Avoid direct `fetch` inside components.
- Reuse existing utilities before adding new helpers.

## Review Guidance

- Prioritize correctness and regressions first.
- Verify wallet/API flows are safe and resilient.
- Prefer small, incremental follow-up PRs for large changes.

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Reporting Issues

Include:

- expected behavior
- actual behavior
- reproduction steps
- environment (browser, Node version, network)
