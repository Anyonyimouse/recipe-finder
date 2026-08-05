import { FavoriteRepository } from '../repositories/FavoriteRepository';

export class ToggleFavoriteUseCase {
  constructor(private favoriteRepo: FavoriteRepository) {}

  async execute(recipeId: string, currentFavoriteIds: string[]): Promise<string[]> {
    const exists = currentFavoriteIds.includes(recipeId);
    if (exists) {
      await this.favoriteRepo.removeFavorite(recipeId);
      return currentFavoriteIds.filter((id) => id !== recipeId);
    } else {
      await this.favoriteRepo.addFavorite(recipeId);
      return [recipeId, ...currentFavoriteIds];
    }
  }
}
