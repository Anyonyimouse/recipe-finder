# 📄 DATABASE.md
# BingCart Database Design v1.0

---

# 1. Database Overview

## Purpose

BingCart follows an **offline-first** database architecture.

The application stores all recipes locally using SQLite. Every recipe search, ingredient lookup, favorite, and cooking guide is retrieved from the local database.

When an internet connection is available, the application synchronizes recipe updates from Supabase into SQLite. Users never interact directly with Supabase.

SQLite is always considered the application's primary runtime database.

---

## Database Philosophy

Single Source of Truth (Runtime)

SQLite

↓

Optional Synchronization

↓

Supabase

The application should continue functioning even if:

- Internet is unavailable
- Supabase is down
- Synchronization fails

No authentication is required.

---

# 2. Database Technologies

## Local Database

SQLite (expo-sqlite)

Responsibilities

- Store recipes
- Store ingredients
- Store recipe steps
- Store favorites
- Store search history
- Store synchronization metadata

---

## Cloud Database

Supabase PostgreSQL

Responsibilities

- Store master recipe database
- Store images
- Provide recipe updates
- Provide synchronization data

Supabase is never queried directly from the UI.

---

# 3. Database Schema

## SQLite

recipes

ingredients

recipe_ingredients

recipe_steps

categories

favorites

search_history

sync_metadata

---

## Supabase

recipes

ingredients

recipe_ingredients

recipe_steps

categories

database_versions

---

# 4. Tables

## recipes

Stores all available recipes.

| Column | Type | Description |
|----------|----------|-------------|
| id | TEXT PRIMARY KEY | UUID |
| title | TEXT | Recipe name |
| description | TEXT | Short description |
| image_url | TEXT | Image URL |
| prep_time | INTEGER | Minutes |
| cook_time | INTEGER | Minutes |
| servings | INTEGER | Number of servings |
| difficulty | TEXT | Easy / Medium / Hard |
| category_id | TEXT | FK categories |
| calories | INTEGER | Optional |
| created_at | TEXT | Timestamp |
| updated_at | TEXT | Timestamp |


---

## ingredients

Stores all ingredients.

| Column | Type |
|---------|------|
| id | TEXT PRIMARY KEY |
| name | TEXT |
| image_url | TEXT |
| category | TEXT |

---

## recipe_ingredients

Many-to-many relationship.

| Column | Type |
|---------|------|
| recipe_id | TEXT |
| ingredient_id | TEXT |
| quantity | REAL |
| unit | TEXT |

Composite Key

(recipe_id, ingredient_id)

---

## recipe_steps

Cooking instructions.

| Column | Type |
|---------|------|
| id | INTEGER PRIMARY KEY |
| recipe_id | TEXT |
| step_number | INTEGER |
| instruction | TEXT |

---

## categories

Recipe categories.

| Column | Type |
|---------|------|
| id | TEXT PRIMARY KEY |
| name | TEXT |
| icon | TEXT |

Examples

Breakfast

Lunch

Dinner

Dessert

Snack

Vegetarian

---

## favorites

Stored locally only.

| Column | Type |
|---------|------|
| recipe_id | TEXT PRIMARY KEY |
| created_at | TEXT |

---

## search_history

Stores recent searches.

| Column | Type |
|---------|------|
| id | INTEGER PRIMARY KEY |
| query | TEXT |
| searched_at | TEXT |

---

## sync_metadata

Stores synchronization information.

| Column | Type |
|---------|------|
| key | TEXT PRIMARY KEY |
| value | TEXT |

Example

last_sync

database_version

recipe_count

---

# 5. Relationships

categories

↓

recipes

↓

recipe_ingredients

↓

ingredients

↓

recipe_steps

One Category

↓

Many Recipes

One Recipe

↓

Many Ingredients

One Recipe

↓

Many Steps

---

# 6. Entity Relationship Diagram

```text
                categories
                     │
                     │ 1
                     │
                     ▼
                 recipes
                    │
          ┌─────────┴─────────┐
          │                   │
          │                   │
          ▼                   ▼
recipe_ingredients      recipe_steps
          │
          │
          ▼
      ingredients


favorites

recipe_id

↓

recipes


search_history

Independent


sync_metadata

Independent
```

---

# 7. Indexes

Recipe Search

```sql
CREATE INDEX idx_recipe_title
ON recipes(title);
```

Ingredient Search

```sql
CREATE INDEX idx_ingredient_name
ON ingredients(name);
```

Recipe Lookup

```sql
CREATE INDEX idx_recipe_ingredient
ON recipe_ingredients(ingredient_id);
```

Category Lookup

```sql
CREATE INDEX idx_category
ON recipes(category_id);
```

Synchronization

```sql
CREATE INDEX idx_updated_at
ON recipes(updated_at);
```

---

# 8. Synchronization Metadata

SQLite stores synchronization information.

Example

```text
last_sync

2026-07-26T12:00:00Z
```

```text
database_version

15
```

Synchronization Process

App Starts

↓

Load SQLite

↓

Internet?

↓

No

↓

Continue

↓

Yes

↓

Check database_version

↓

Same Version

↓

Done

↓

New Version

↓

Download Changes

↓

Update SQLite

↓

Update sync_metadata

---

# 9. Migration Strategy

Database changes use versioned migrations.

Example

```text
v1

Create recipes

Create ingredients

Create recipe_steps

Create favorites

Create categories
```

```text
v2

Add calories

Add image_url
```

```text
v3

Add search_history
```

Migration Rules

- Never modify old migrations.
- Every schema change creates a new migration.
- Migrations must be reversible where practical.
- Test migrations before release.

---

# 10. Data Lifecycle

Supabase

↓

Download JSON

↓

Validate

↓

Repository

↓

SQLite

↓

UI

No screen may directly access SQLite or Supabase.

---

# 11. Backup Strategy

SQLite

↓

App Storage

↓

Periodic Export (Future)

Supabase remains the master content repository.

---

# 12. Performance Strategy

- Index frequently searched columns.
- Batch inserts during synchronization.
- Use transactions for bulk updates.
- Lazy load recipe images.
- Use pagination for very large datasets.
- Avoid duplicate records.
- Cache recent searches.

---

# 13. Database Rules

- SQLite is the application's runtime database.
- Supabase is the content synchronization server.
- No authentication.
- No user tables.
- Favorites remain local.
- Never query Supabase directly from the UI.
- All database access goes through repositories.
- Always use parameterized SQL.
- Use transactions for synchronization.
- Keep migrations versioned.

---

# Database Summary

Primary Database

SQLite

Cloud Database

Supabase PostgreSQL

Architecture

Offline First

Authentication

None

Synchronization

Automatic (when online)

Primary Search

SQLite

Source of Truth

SQLite (runtime)

Master Content Repository

Supabase

# 14. Data Sources

TheMealDB API

↓

Import Script

↓

Supabase

↓

SQLite