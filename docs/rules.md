# 📄 RULES.md
# BingCart Development Rules v1.0

---

# Purpose

This document defines the development standards for BingCart.

All contributors (human or AI) must follow these rules to ensure the project remains:

- Maintainable
- Scalable
- Consistent
- Performant
- Easy to understand

These rules take precedence over personal coding preferences.

---

# Folder Rules

## Feature-Based Architecture

Every feature must live inside:

src/features/<feature-name>

Example

src/
    features/
        recipe/
        ingredient/
        favorite/
        search/
        settings/
        sync/

---

## Shared Code

Shared code belongs in:

src/components

src/hooks

src/services

src/utils

src/types

src/constants

Do not duplicate shared code inside feature folders.

---

## Feature Structure

Every feature should follow this structure.

feature/

    presentation/

    domain/

    data/

Example

recipe/

    presentation/

        screens/

        components/

        hooks/

    domain/

        entities/

        repositories/

        usecases/

    data/

        repositories/

        datasource/

---

## Never Create Random Folders

Before creating a folder:

1. Check whether an existing folder is appropriate.
2. Reuse shared modules.
3. Keep the project organized.

---

# Naming Convention

## Components

Use PascalCase.

Good

RecipeCard.tsx

IngredientChip.tsx

SearchBar.tsx

Bad

recipecard.tsx

recipe_card.tsx

---

## Hooks

Always begin with use.

Good

useRecipes.ts

useIngredients.ts

Bad

recipesHook.ts

hook.ts

---

## Stores

End with Store.

recipeStore.ts

favoriteStore.ts

settingsStore.ts

---

## Services

End with Service.

RecipeService.ts

SyncService.ts

StorageService.ts

---

## Repository

End with Repository.

RecipeRepository.ts

IngredientRepository.ts

---

## Types

Use PascalCase.

Recipe.ts

Ingredient.ts

RecipeStep.ts

---

## Constants

UPPER_SNAKE_CASE

MAX_RECIPES

DEFAULT_TIMEOUT

SYNC_INTERVAL

---

## Variables

camelCase

selectedIngredients

favoriteRecipes

searchQuery

---

## Boolean Variables

Always start with:

is

has

can

should

Example

isLoading

hasInternet

canSync

shouldRefresh

---

# TypeScript Rules

Always enable Strict Mode.

Never use:

any

Prefer:

unknown

or

proper interfaces.

Always define interfaces.

Good

interface Recipe {

}

Avoid

type Recipe = any

Use enums only when appropriate.

Prefer literal unions.

Good

type Difficulty =
    | "easy"
    | "medium"
    | "hard"

Never ignore TypeScript errors.

---

# React Rules

Only Functional Components.

Never use Class Components.

Use Arrow Functions.

Example

const RecipeCard = () => {

}

Keep components small.

Ideal

<150 lines

Maximum

250 lines

Split large components.

Extract reusable logic into hooks.

Do not duplicate JSX.

Never mutate props.

Always use keys inside FlatList.

Prefer composition over inheritance.

---

# Repository Rules

The Repository Pattern is mandatory.

UI

↓

Use Case

↓

Repository

↓

SQLite

↓

Supabase (Sync Only)

---

Never access SQLite directly inside:

Screens

Components

Hooks

Repositories are the only layer allowed to access data sources.

Repositories decide:

SQLite

Supabase

Cache

Mock

Future APIs

---

# State Rules

Global State

Use Zustand.

Examples

Favorites

Settings

Selected Ingredients

Search Filters

Synchronization State

Local State

Use useState.

Server Synchronization

Use TanStack Query.

Never store server data permanently in Zustand.

Derived values should use selectors.

Avoid unnecessary global state.

---

# Database Rules

SQLite is the runtime database.

Supabase is the synchronization source.

No authentication.

No user tables.

Never perform SQL inside UI components.

Use transactions for bulk inserts.

Always use prepared statements.

Always index searchable columns.

Migrations are versioned.

Never edit old migrations.

Every schema change requires a migration.

Favorites stay local.

Search history stays local.

---

# Styling Rules

Use NativeWind only.

Do not use inline styles.

Bad

style={{ margin:10 }}

Good

className="m-2"

Create reusable UI components.

Spacing should follow an 8-point grid.

Examples

p-2

p-4

p-6

Avoid magic numbers.

Colors come from the design system.

Never hardcode colors.

Support Dark Mode from the start.

Use Expo Image for images.

---

# Git Rules

Branch Naming

feature/recipe-search

feature/favorites

fix/search-bug

refactor/repository

docs/database

Commit Format

feat:

fix:

docs:

refactor:

style:

test:

chore:

Example

feat: add ingredient search

fix: recipe filtering bug

docs: update architecture

Commit often.

Never commit:

.env

Secrets

API Keys

node_modules

dist

Generated files

Use Pull Requests before merging.

Keep commits focused.

---

# Performance Rules

Always use FlatList.

Never use ScrollView for long lists.

Memoize expensive components.

Use React.memo when appropriate.

Use useMemo only when necessary.

Use useCallback only when necessary.

Avoid unnecessary re-renders.

Lazy load images.

Batch SQLite inserts.

Use database indexes.

Avoid nested FlatLists.

Minimize bridge communication.

Keep startup fast.

Search should complete under 300ms.

App launch under 3 seconds.

---

# Error Handling Rules

Wrap async code in try/catch.

Show user-friendly messages.

Never expose raw SQL errors.

Gracefully handle offline mode.

Log errors in development.

Remove debug logs before production.

---

# Security Rules

Never hardcode secrets.

Use environment variables.

Validate all external data.

Use HTTPS only.

Never trust remote data.

Escape SQL parameters.

Sanitize user input.

---

# Documentation Rules

Whenever a new feature is added:

Update PRD.md if user-facing functionality changes.

Update DATABASE.md if the schema changes.

Update ARCHITECTURE.md if the architecture changes.

Update DESIGN.md if the UI changes.

Update RULES.md if a new standard is introduced.

---

# Code Quality Checklist

Before every commit:

✓ TypeScript has no errors

✓ ESLint passes

✓ No unused imports

✓ No console.log

✓ No duplicated code

✓ Components are reusable

✓ Repository pattern followed

✓ Offline mode works

✓ SQLite queries optimized

✓ Documentation updated

---

# Definition of Done

A task is complete only if:

✓ Feature works as expected

✓ Offline support verified

✓ UI matches DESIGN.md

✓ Repository pattern followed

✓ Code reviewed

✓ TypeScript passes

✓ ESLint passes

✓ No performance regressions

✓ No hardcoded values

✓ Documentation updated

✓ Ready for production

---

# Core Principles

1. Offline First

SQLite is always the primary runtime database.

---

2. Simplicity

Choose the simplest solution that solves the problem.

---

3. Reusability

Build reusable components before creating new ones.

---

4. Performance

Optimize for smooth mobile performance.

---

5. Maintainability

Write code that future contributors can understand.

---

6. Consistency

Follow these rules across the entire project without exception.