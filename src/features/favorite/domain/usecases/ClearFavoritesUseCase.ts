import { FavoriteRepository } from '../repositories/FavoriteRepository';

export class ClearFavoritesUseCase {
  constructor(private favoriteRepo: FavoriteRepository) {}

  async execute(): Promise<void> {
    return this.favoriteRepo.clearAllFavorites();
  }
}
