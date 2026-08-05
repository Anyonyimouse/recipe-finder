import { SQLiteIngredientRepository } from '../data/repositories/SQLiteIngredientRepository';
import { IngredientRepository } from '../domain/repositories/IngredientRepository';
import { GetIngredientsUseCase } from '../domain/usecases/GetIngredientsUseCase';

export const ingredientRepository: IngredientRepository = new SQLiteIngredientRepository();
export const getIngredientsUseCase = new GetIngredientsUseCase(ingredientRepository);
