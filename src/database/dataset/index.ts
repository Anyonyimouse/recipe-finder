import categoriesData from './categories.json';
import ingredientsData from './ingredients.json';
import americanRecipes from './recipes/american.json';
import asianRecipes from './recipes/asian.json';
import filipinoRecipes from './recipes/filipino.json';
import italianRecipes from './recipes/italian.json';
import {
  DatasetCategory,
  DatasetIngredient,
  DatasetRecipe,
  RecipeDataset,
} from './types';

export * from './types';

export const categories: DatasetCategory[] = categoriesData as DatasetCategory[];
export const ingredients: DatasetIngredient[] = ingredientsData as DatasetIngredient[];

export const recipes: DatasetRecipe[] = [
  ...filipinoRecipes,
  ...italianRecipes,
  ...americanRecipes,
  ...asianRecipes,
] as DatasetRecipe[];

export const dataset: RecipeDataset = {
  categories,
  ingredients,
  recipes,
};

export default dataset;
