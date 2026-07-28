import { Ingredient } from '../../../../types/ingredient';

export interface IngredientRepository {
  getAllIngredients(): Promise<Ingredient[]>;
  searchIngredients(query: string): Promise<Ingredient[]>;
}
