export const CREATE_TABLES_SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT
);

CREATE TABLE IF NOT EXISTS recipes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  prep_time INTEGER,
  cook_time INTEGER,
  servings INTEGER,
  difficulty TEXT,
  category_id TEXT,
  cuisine TEXT,
  meal_type TEXT,
  calories INTEGER,
  created_at TEXT,
  updated_at TEXT,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS ingredients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  image_url TEXT,
  category TEXT
);

CREATE TABLE IF NOT EXISTS recipe_ingredients (
  recipe_id TEXT NOT NULL,
  ingredient_id TEXT NOT NULL,
  quantity REAL,
  unit TEXT,
  PRIMARY KEY (recipe_id, ingredient_id),
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS recipe_steps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  recipe_id TEXT NOT NULL,
  step_number INTEGER NOT NULL,
  instruction TEXT NOT NULL,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS favorites (
  recipe_id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS search_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  query TEXT NOT NULL,
  searched_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sync_metadata (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_recipe_title ON recipes(title);
CREATE INDEX IF NOT EXISTS idx_ingredient_name ON ingredients(name);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredient ON recipe_ingredients(ingredient_id);
CREATE INDEX IF NOT EXISTS idx_category ON recipes(category_id);
CREATE INDEX IF NOT EXISTS idx_updated_at ON recipes(updated_at);
`;
