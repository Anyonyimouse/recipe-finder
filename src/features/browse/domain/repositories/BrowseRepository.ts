import { OnlineRecipe } from '../../types';

export interface BrowseRepository {
  fetchRecipes(query: string, country: string, mealType: string): Promise<OnlineRecipe[]>;
}
