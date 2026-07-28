# BingCart AI Agent Instructions

## Project Overview

BingCart is an offline-first recipe finder built with:

- React Native (Expo)
- TypeScript
- NativeWind
- SQLite
- Zustand
- Supabase (sync only)

---

## Architecture Rules

- Follow Feature-Based Architecture.
- Follow Clean Architecture.
- Use the Repository Pattern.
- Never access SQLite directly from screens.
- Business logic belongs in use cases.

---

## Coding Rules

- Always use TypeScript.
- Use functional components only.
- Prefer custom hooks.
- No inline styles.
- Use NativeWind for styling.
- One component per file.

---

## Folder Rules

New features must be placed under:

src/features/<feature>

Do not create unrelated folders.

---

## Database Rules

SQLite is the source of truth.

Supabase is only used for recipe synchronization.

Do not add authentication.

---

## State Management

Use Zustand for global state.

Use TanStack Query only for synchronization.

---

## Documentation

When adding a feature:

- Update DATABASE.md if the schema changes.
- Update ARCHITECTURE.md if the architecture changes.
- Update PRD.md if a new user-facing feature is added.

---

## Definition of Done

A feature is complete only if:

- TypeScript has no errors.
- ESLint passes.
- UI is responsive.
- Offline mode works.
- Documentation is updated.