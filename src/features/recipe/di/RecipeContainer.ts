import { SQLiteRecipeRepository } from '../data/repositories/SQLiteRecipeRepository';
import { RecipeRepository } from '../domain/repositories/RecipeRepository';
import { GetRecipeByIdUseCase } from '../domain/usecases/GetRecipeByIdUseCase';
import { SearchRecipesUseCase } from '../domain/usecases/SearchRecipesUseCase';

export const recipeRepository: RecipeRepository = new SQLiteRecipeRepository();
export const searchRecipesUseCase = new SearchRecipesUseCase(recipeRepository);
export const getRecipeByIdUseCase = new GetRecipeByIdUseCase(recipeRepository);
