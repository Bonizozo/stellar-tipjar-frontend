# Context Provider Optimization - Issue #598

## Summary

This PR optimizes all context providers in the `src/contexts/` directory to prevent unnecessary re-renders by properly memoizing their value props. This addresses performance issues caused by inline object literals in context provider values, which force all consumers to re-render even when the values they depend on haven't changed.

## Problem

React context providers whose value object is recreated on every render (using inline object literals like `<Context.Provider value={{ a, b, c }}>`) cause all consumers to re-render whenever the provider itself re-renders, regardless of whether the specific values that consumer cares about actually changed. This is particularly problematic for:

1. **WalletContext** - Frequently updating state (connection status, balance polling)
2. **WebSocketContext** - Real-time notifications and connection status updates
3. **Other contexts** - Any provider wrapping large portions of the component tree

## Changes Made

### 1. WalletContext (`src/contexts/WalletContext.tsx`)
- **Issue**: Multiple individual Zustand selectors + inline object literal in provider value
- **Problem**: Using multiple `useWalletStore((s) => s.field)` calls creates multiple subscriptions, and any field change triggers context re-render for ALL consumers, defeating Zustand's optimization
- **Fix**: 
  - Combined all Zustand selections into a single selector for atomic updates
  - Wrapped context value in `useMemo` with proper dependencies
  - Removed unnecessary `useCallback` wrappers (Zustand functions are already stable)
- **Impact**: Critical - prevents widespread re-renders across wallet-dependent components
- **Key insight**: Zustand selectors are already optimized, but wrapping them in context requires careful handling

### 2. CurrencyContext (`src/contexts/CurrencyContext.tsx`)
- **Issue**: Inline object literal `{ selectedCurrency, setCurrency }`
- **Fix**: 
  - Wrapped `setCurrency` in `useCallback` for stable reference
  - Memoized context value with `useMemo`
- **Impact**: Prevents re-renders when currency selection changes

### 3. GamificationContext (`src/contexts/GamificationContext.tsx`)
- **Issue**: Inline object literals in both loading and loaded states
- **Fix**: 
  - Memoized loading state value
  - Memoized full context value with spread state
- **Impact**: Optimizes XP updates, achievement unlocks, and badge awards

### 4. ToastContext (`src/contexts/ToastContext.tsx`)
- **Issue**: Inline object literal with callback functions
- **Fix**: Memoized context value (callbacks already stable via `useCallback`)
- **Impact**: Prevents re-renders when toasts are added/removed

### 5. WebSocketContext (`src/contexts/WebSocketContext.tsx`)
- **Issue**: Inline object literal with frequently updating WebSocket state
- **Fix**: Wrapped context value in `useMemo` with proper dependencies
- **Impact**: Critical - prevents re-renders from real-time notifications and connection status updates

## Technical Details

### Special Case: Zustand + Context Pattern

**WalletContext** uses Zustand store underneath. Important considerations:

1. **Zustand selectors are already optimized** - they only trigger re-renders when selected values change
2. **Multiple selectors = multiple subscriptions** - Using `useWalletStore((s) => s.field)` multiple times creates separate subscriptions
3. **Context wrapper problem** - Bundling Zustand values into context defeats the selector optimization
4. **Solution**: Use a single Zustand selector that returns all needed values atomically, then memoize the context value

**Before (Anti-pattern with Zustand):**
```tsx
// ❌ Multiple subscriptions - any change triggers context update
const status = useWalletStore((s) => s.status);
const balance = useWalletStore((s) => s.balance);
// ... more individual selectors

<Context.Provider value={{ status, balance, ... }}>
```

**After (Optimized with Zustand):**
```tsx
// ✅ Single subscription - atomic updates
const { status, balance, connect, disconnect } = useWalletStore((s) => ({
  status: s.status,
  balance: s.balance,
  connect: s.connect,
  disconnect: s.disconnect,
}));

const contextValue = useMemo(() => ({ 
  status, balance, connect, disconnect 
}), [status, balance, connect, disconnect]);

<Context.Provider value={contextValue}>
```

### Before (Anti-pattern)
```tsx
<Context.Provider value={{ state, callback }}>
  {children}
</Context.Provider>
```
**Problem**: New object created on every render → all consumers re-render

### After (Optimized)
```tsx
const contextValue = useMemo(
  () => ({ state, callback }),
  [state, callback]
);

<Context.Provider value={contextValue}>
  {children}
</Context.Provider>
```
**Solution**: Object only recreated when dependencies change → consumers only re-render when needed

## Performance Benefits

1. **Reduced re-render cascades** - Components only re-render when their specific dependencies change
2. **Better wallet interaction performance** - Balance updates and connection status changes don't trigger unnecessary re-renders
3. **Smoother real-time updates** - WebSocket notifications don't cause unrelated component updates
4. **Improved scalability** - As the component tree grows, the performance benefits compound

## Testing Recommendations

1. Monitor re-render counts using React DevTools Profiler
2. Test wallet connection/disconnection flows
3. Verify balance updates don't cause unnecessary re-renders
4. Check WebSocket notification handling performance
5. Ensure toast notifications work correctly
6. Verify gamification XP updates and achievements

## Related Issues

Closes #598

## Audit Checklist

- [x] WalletContext - Memoized provider value
- [x] CurrencyContext - Memoized provider value
- [x] GamificationContext - Memoized provider value
- [x] ToastContext - Memoized provider value
- [x] WebSocketContext - Memoized provider value
- [x] All callbacks wrapped in useCallback where needed
- [x] All context values wrapped in useMemo with proper dependencies
- [x] Type checking passes
- [x] No new diagnostics introduced

## Next Steps

Consider implementing these additional optimizations:

1. **Context splitting** - Split large contexts into smaller, focused contexts so components only subscribe to what they need
2. **Selector pattern** - Implement selector hooks for contexts with large state objects
3. **Performance monitoring** - Add performance monitoring to track re-render frequency in production
4. **React.memo** - Selectively wrap child components that are expensive to render

## References

- Issue: #598
- React Context Performance: https://react.dev/reference/react/useMemo
- React Hooks Best Practices: https://react.dev/reference/react/useCallback
