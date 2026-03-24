# Code Style Guide

## Language and Typing

- Use TypeScript for all new application code.
- Prefer explicit interfaces/types at module boundaries.
- Avoid `any`; if unavoidable, constrain and document why.

## Imports and Aliases

- Use `@/` alias for source imports.
- Group imports: external, internal, then relative (if needed).

## React Patterns

- Prefer function components.
- Keep components focused on rendering concerns.
- Move reusable stateful logic into hooks.
- Keep side effects in `useEffect` or service layer helpers.

## Service Layer Patterns

- Centralize external IO in `src/services`.
- Throw meaningful errors from service methods.
- Keep request options typed and explicit.

## Naming

- Components: `PascalCase` (`WalletConnector`)
- Hooks: `camelCase` with `use` prefix (`useWallet`)
- Utilities/functions: `camelCase`
- Interfaces/types: `PascalCase`

## Formatting

- Follow repository formatter/linter defaults.
- Keep lines reasonably short and readable.
- Break complex expressions into named variables.

## Comments

- Add comments when intent is not obvious.
- Prefer explaining "why" rather than "what".
- Remove stale comments during refactors.

## Styling Conventions

- Prefer Tailwind utility classes.
- Use design tokens defined in Tailwind config.
- Preserve keyboard focus styles for interactive elements.

## Error Handling

- Handle expected failures explicitly (wallet denied, rate limit exceeded, network failures).
- Prefer user-friendly messages at UI boundaries.

## Security and Reliability

- Never commit secrets.
- Validate assumptions around external responses.
- Treat wallet/API integrations as unreliable boundaries and code defensively.
