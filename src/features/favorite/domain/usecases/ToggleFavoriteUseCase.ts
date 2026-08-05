import { FavoriteRepository } from '../repositories/FavoriteRepository';

export class ToggleFavoriteUseCase {
  constructor(private favoriteRepo: FavoriteRepository) {}

  async execute(recipeId: string, currentFavoriteIds: string[], title?: string, imageUrl?: string): Promise<string[]> {
    const exists = currentFavoriteIds.includes(recipeId);
    if (exists) {
      await this.favoriteRepo.removeFavorite(recipeId);
      return currentFavoriteIds.filter((id) => id !== recipeId);
    } else {
      await this.favoriteRepo.addFavorite(recipeId, title, imageUrl);
      return [recipeId, ...currentFavoriteIds];
    }
  }
}
