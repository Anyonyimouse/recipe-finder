# BingCart Architecture Fixes — Implementation Plan

## Goal

Apply all 6 priority fixes to bring the BingCart codebase into full Clean Architecture compliance, fix Dependency Inversion violations, implement the missing Use Cases layer, extract the MealDB API into a repository, migrate inline styles to NativeWind, and synchronize documentation.

---

## Proposed Changes

### Phase 1 — DI Containers (Dependency Inversion Fix)

A lightweight DI container file per feature that exports a singleton of the concrete repository behind the domain interface. No third-party DI library needed.

---

#### [NEW] `src/features/recipe/di/RecipeContainer.ts`
Exports `recipeRepository: RecipeRepository` (backed by `SQLiteRecipeRepository`).  
Also exports `onlineRecipeRepository` for `saveFullOnlineRecipe` / `isRecipeDownloaded`.

#### [NEW] `src/features/favorite/di/FavoriteContainer.ts`
Exports `favoriteRepository: FavoriteRepository` (backed by `SQLiteFavoriteRepository`).

#### [NEW] `src/features/ingredient/di/IngredientContainer.ts`
Exports `ingredientRepository: IngredientRepository` (backed by `SQLiteIngredientRepository`).

#### [NEW] `src/features/sync/di/SyncContainer.ts`
Exports `syncRepository: SyncRepository` (backed by `SQLiteSyncRepository`).

#### [NEW] `src/features/browse/di/BrowseContainer.ts`
Exports `browseRepository: BrowseRepository` (backed by the new `MealDbBrowseRepository`).

---

### Phase 2 — Domain Interfaces & Use Cases

---

#### [MODIFY] `src/features/recipe/domain/repositories/RecipeRepository.ts`
Add the two missing methods to the interface:
- `saveFullOnlineRecipe(recipe): Promise<void>`
- `isRecipeDownloaded(idMeal: string): Promise<boolean>`

#### [NEW] `src/features/recipe/domain/usecases/SearchRecipesUseCase.ts`
Wraps `recipeRepository.searchRecipes(...)`. Encapsulates the search business logic so hooks don't call repos directly.

#### [NEW] `src/features/recipe/domain/usecases/GetRecipeByIdUseCase.ts`
Wraps `recipeRepository.getRecipeById(id)`.

#### [NEW] `src/features/favorite/domain/usecases/ToggleFavoriteUseCase.ts`
Wraps the toggle logic currently in `favoriteStore`. Takes `recipeId`, checks if exists, adds/removes accordingly.

#### [NEW] `src/features/ingredient/domain/usecases/GetIngredientsUseCase.ts`
Wraps `ingredientRepository.getAllIngredients()` and `searchIngredients()`.

#### [NEW] `src/features/sync/domain/usecases/SyncWithCloudUseCase.ts`
Wraps `syncRepository.syncWithCloud()` and `getSyncStatus()`.

---

### Phase 3 — BrowseRepository (Extract MealDB API)

Currently all `fetch()` calls to MealDB live inside `useBrowseRecipes.ts` (a presentation hook). They belong in a data repository.

---

#### [NEW] `src/features/browse/domain/repositories/BrowseRepository.ts`
Domain interface:
```ts
export interface BrowseRepository {
  fetchRecipes(query: string, country: string, mealType: string): Promise<OnlineRecipe[]>;
}
```

#### [NEW] `src/features/browse/data/repositories/MealDbBrowseRepository.ts`
Concrete implementation containing all the `fetch()` / `Promise.all()` / ingredient-parsing logic extracted from `useBrowseRecipes.ts`.

#### [MODIFY] `src/features/browse/presentation/hooks/useBrowseRecipes.ts`
Replace the inline `fetch()` logic with a call to `browseRepository.fetchRecipes(...)`.  
Also remove the direct import of `SQLiteRecipeRepository` — replace with the DI container.

---

### Phase 4 — NativeWind Migration for `index.tsx` (Browse Tab)

The `app/(tabs)/index.tsx` file (444 lines) has 100% inline `style={{}}` objects. Convert to NativeWind `className` strings while preserving exact visual output.

---

#### [MODIFY] `app/(tabs)/index.tsx`
Replace all `style={{...}}` with `className="..."` NativeWind utility classes.  
Dynamic styles that depend on state (e.g., `isActive ? '#0D9488' : '#FFFFFF'`) will use conditional className strings or remain as minimal inline styles where NativeWind can't express them.

> [!NOTE]
> NativeWind cannot express all dynamic color values via `className` alone (e.g., `shadowColor: '#0D9488'`). These will be kept as minimal `style={{}}` only for the properties NativeWind cannot handle.

---

### Phase 5 — Update `docs/architecture.md`

Sync the folder structure diagram and feature list to match what actually exists on disk.

#### [MODIFY] `docs/architecture.md`
- Update the Folder Structure section to reflect the real `src/` layout
- Update the Feature list to include `browse`, `ingredient`, and remove phantom `search/settings`
- Add a section documenting the DI container pattern
- Clarify that the pattern is Clean Architecture + MVVM (not MVP)

---

### Phase 6 — Scaffold or Remove Empty Stubs

#### [MODIFY] `src/features/shopping_list/`
Add a `README.md` (planned feature marker) with `data/`, `domain/`, `presentation/` sub-structure scaffolded with placeholder index files to prevent accidental code placement.

#### [MODIFY] `src/features/meal_planner/`
Same treatment as `shopping_list`.

---

## Dependency Graph of Changes

```
Phase 1 (DI Containers)
    ↑ required by
Phase 2 (Use Cases)      ← also requires Phase 1
    ↑ required by
Phase 3 (BrowseRepository) ← also requires Phase 1 & 2
    ↑ required by
Phase 4 (NativeWind)     ← independent, can run in parallel
Phase 5 (Docs)           ← independent, last
Phase 6 (Stubs)          ← independent, last
```

---

## Files Modified / Created Summary

| File | Action |
|---|---|
| `src/features/recipe/di/RecipeContainer.ts` | NEW |
| `src/features/favorite/di/FavoriteContainer.ts` | NEW |
| `src/features/ingredient/di/IngredientContainer.ts` | NEW |
| `src/features/sync/di/SyncContainer.ts` | NEW |
| `src/features/browse/di/BrowseContainer.ts` | NEW |
| `src/features/recipe/domain/repositories/RecipeRepository.ts` | MODIFY |
| `src/features/recipe/domain/usecases/SearchRecipesUseCase.ts` | NEW |
| `src/features/recipe/domain/usecases/GetRecipeByIdUseCase.ts` | NEW |
| `src/features/favorite/domain/usecases/ToggleFavoriteUseCase.ts` | NEW |
| `src/features/ingredient/domain/usecases/GetIngredientsUseCase.ts` | NEW |
| `src/features/sync/domain/usecases/SyncWithCloudUseCase.ts` | NEW |
| `src/features/browse/domain/repositories/BrowseRepository.ts` | NEW |
| `src/features/browse/data/repositories/MealDbBrowseRepository.ts` | NEW |
| `src/features/browse/presentation/hooks/useBrowseRecipes.ts` | MODIFY |
| `src/features/recipe/presentation/hooks/useRecipeSearch.ts` | MODIFY |
| `src/features/ingredient/presentation/hooks/useIngredients.ts` | MODIFY |
| `src/features/sync/presentation/hooks/useSync.ts` | MODIFY |
| `src/features/favorite/presentation/stores/favoriteStore.ts` | MODIFY |
| `app/(tabs)/index.tsx` | MODIFY |
| `docs/architecture.md` | MODIFY |
| `src/features/shopping_list/` (scaffold) | MODIFY |
| `src/features/meal_planner/` (scaffold) | MODIFY |

**Total: 5 new DI files + 6 new domain files + 2 new data files + 10 file modifications**

---

## Verification Plan

### Automated
- `npx tsc --noEmit` — TypeScript must report zero errors after all changes
- `npx expo lint` — ESLint must pass

### Manual
- App launches and lands on the home screen without errors
- Recipe search still returns results
- Favorites toggle works (add and remove)
- Browse tab (MealDB online tab) still fetches and displays recipes
- Download recipe works
- Cuisine drawer filters still work
