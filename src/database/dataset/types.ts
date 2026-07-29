export interface DatasetCategory {
  id: string;
  name: string;
  icon: string;
}

export interface DatasetIngredient {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

export interface DatasetRecipeIngredient {
  ingredientId: string;
  quantity: number;
  unit: string;
}

export interface DatasetRecipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | string;
  categoryId: string;
  cuisine: string;
  mealType: string;
  calories: number;
  createdAt: string;
  updatedAt: string;
  ingredients: DatasetRecipeIngredient[];
  steps: string[];
}

export interface RecipeDataset {
  categories: DatasetCategory[];
  ingredients: DatasetIngredient[];
  recipes: DatasetRecipe[];
}
