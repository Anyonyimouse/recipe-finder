# 📄 DATABASE.md
# BingCart Database Schema & Architecture

BingCart uses an **offline-first SQLite database** (`expo-sqlite`) as its single source of truth for runtime data storage and synchronization with cloud backends (Supabase / MealDB API).

---

## 💾 SQLite Database Tables

### 1. `categories`
Stores recipe food categories.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | TEXT | PRIMARY KEY | Category unique identifier |
| `name` | TEXT | NOT NULL | Display name (e.g. Pork, Chicken, Dessert) |
| `icon` | TEXT | NULL | Emoji icon or SVG asset key |

### 2. `recipes`
Stores local and saved online recipes.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | TEXT | PRIMARY KEY | Recipe ID (e.g. `rec-001` or `online-52772`) |
| `title` | TEXT | NOT NULL | Recipe title |
| `description` | TEXT | NULL | Recipe summary/description |
| `image_url` | TEXT | NULL | Image path or remote CDN URL |
| `prep_time` | INTEGER | NULL | Preparation time in minutes |
| `cook_time` | INTEGER | NULL | Cooking time in minutes |
| `servings` | INTEGER | NULL | Serving yield count |
| `difficulty` | TEXT | NULL | Difficulty level (`Easy`, `Medium`, `Hard`) |
| `category_id` | TEXT | FOREIGN KEY | References `categories(id)` |
| `cuisine` | TEXT | NULL | Cuisine region (e.g. `Filipino`, `Italian`) |
| `meal_type` | TEXT | NULL | Meal category (`Breakfast`, `Lunch`, `Dinner`, `Merienda`) |
| `calories` | INTEGER | NULL | Caloric content estimation |
| `created_at` | TEXT | NULL | ISO timestamp |
| `updated_at` | TEXT | NULL | ISO timestamp |

### 3. `ingredients`
Stores master pantry and recipe ingredients.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | TEXT | PRIMARY KEY | Ingredient ID |
| `name` | TEXT | NOT NULL UNIQUE | Ingredient name |
| `image_url` | TEXT | NULL | Ingredient icon thumbnail URL |
| `category` | TEXT | NULL | Ingredient aisle category |

### 4. `recipe_ingredients`
Junction table linking recipes to ingredients.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `recipe_id` | TEXT | NOT NULL, FOREIGN KEY | References `recipes(id)` ON DELETE CASCADE |
| `ingredient_id` | TEXT | NOT NULL, FOREIGN KEY | References `ingredients(id)` ON DELETE CASCADE |
| `quantity` | REAL | NULL | Quantitative measurement |
| `unit` | TEXT | NULL | Unit string (e.g. `g`, `cups`, `tbsp`) |

### 5. `recipe_steps`
Cooking instruction steps for recipes.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | Step record ID |
| `recipe_id` | TEXT | NOT NULL, FOREIGN KEY | References `recipes(id)` ON DELETE CASCADE |
| `step_number` | INTEGER | NOT NULL | Sequential step ordering |
| `instruction` | TEXT | NOT NULL | Instruction text |

### 6. `favorites`
Saved user favorite recipes.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `recipe_id` | TEXT | PRIMARY KEY, FOREIGN KEY | References `recipes(id)` ON DELETE CASCADE |
| `created_at` | TEXT | NOT NULL | Timestamp when favorited |

### 7. `shopping_list`
User grocery cart items categorized by aisle/recipe.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | TEXT | PRIMARY KEY | Shopping list item ID |
| `ingredient_name` | TEXT | NOT NULL | Ingredient display label |
| `quantity` | REAL | NULL | Quantity required |
| `unit` | TEXT | NULL | Unit of measurement |
| `category` | TEXT | DEFAULT 'General' | Aisle category for Google Keep layout grouping |
| `is_checked` | INTEGER | DEFAULT 0 | Toggle status (0 = pending, 1 = checked) |
| `created_at` | TEXT | NOT NULL | ISO timestamp |

### 8. `meal_plans`
Weekly scheduled meals.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | TEXT | PRIMARY KEY | Meal plan ID |
| `date` | TEXT | NOT NULL | ISO date string (`YYYY-MM-DD`) |
| `meal_type` | TEXT | NOT NULL | Slot (`Breakfast`, `Lunch`, `Dinner`, `Merienda`) |
| `recipe_id` | TEXT | NOT NULL, FOREIGN KEY | References `recipes(id)` ON DELETE CASCADE |
| `created_at` | TEXT | NOT NULL | ISO creation timestamp |

### 9. `search_history` & `sync_metadata`
Stores recent search queries and cloud sync state keys/values.

---

## ⚡ Indices for Fast Local Queries
- `idx_recipe_title` ON `recipes(title)`
- `idx_ingredient_name` ON `ingredients(name)`
- `idx_recipe_ingredient` ON `recipe_ingredients(ingredient_id)`
- `idx_category` ON `recipes(category_id)`
- `idx_shopping_list_checked` ON `shopping_list(is_checked)`
- `idx_meal_plans_date` ON `meal_plans(date)`
