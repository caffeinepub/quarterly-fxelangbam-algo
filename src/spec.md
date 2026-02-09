# Specification

## Summary
**Goal:** Set the backend default `PerformanceMetrics.totalCapital` to `327.0` for fresh canister state.

**Planned changes:**
- Update the initial `performanceMetrics` default in `backend/main.mo` so `totalCapital` initializes to `327.0`.
- Keep all other `PerformanceMetrics` default values unchanged and make no frontend changes.

**User-visible outcome:** With a fresh canister (no prior updates), `getPerformanceMetrics` returns `totalCapital = 327.0` while all other metrics remain at their existing defaults.
