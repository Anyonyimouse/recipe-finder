import { BrowseRepository } from '../repositories/BrowseRepository';
import { OnlineRecipe } from '../../types';

export class FetchOnlineRecipesUseCase {
  constructor(private browseRepo: BrowseRepository) {}

  async execute(query: string, country: string, mealType: string): Promise<OnlineRecipe[]> {
    return this.browseRepo.fetchRecipes(query, country, mealType);
  }
}
