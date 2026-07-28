import { RecipeIngredient } from './ingredient';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface RecipeStep {
  id?: number;
  recipeId: string;
  stepNumber: number;
  instruction: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: Difficulty;
  categoryId: string;
  cuisine?: string;
  mealType?: string;
  calories?: number;
  createdAt: string;
  updatedAt: string;
  ingredients?: RecipeIngredient[];
  steps?: RecipeStep[];
  matchCount?: number;
  totalIngredients?: number;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}
