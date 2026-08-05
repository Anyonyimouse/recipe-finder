import { FavoriteRepository } from '../repositories/FavoriteRepository';

export class GetFavoritesUseCase {
  constructor(private favoriteRepo: FavoriteRepository) {}

  async execute(): Promise<string[]> {
    return this.favoriteRepo.getFavoriteIds();
  }
}
