export interface Ingredient {
  id: string;
  name: string;
  category: string;
  imageUrl?: string;
}

export interface RecipeIngredient {
  recipeId: string;
  ingredientId: string;
  ingredientName?: string;
  imageUrl?: string;
  quantity: number;
  unit: string;
}
