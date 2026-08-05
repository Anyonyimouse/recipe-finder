import { SQLiteFavoriteRepository } from '../data/repositories/SQLiteFavoriteRepository';
import { FavoriteRepository } from '../domain/repositories/FavoriteRepository';
import { ClearFavoritesUseCase } from '../domain/usecases/ClearFavoritesUseCase';
import { GetFavoritesUseCase } from '../domain/usecases/GetFavoritesUseCase';
import { ToggleFavoriteUseCase } from '../domain/usecases/ToggleFavoriteUseCase';

export const favoriteRepository: FavoriteRepository = new SQLiteFavoriteRepository();
export const getFavoritesUseCase = new GetFavoritesUseCase(favoriteRepository);
export const toggleFavoriteUseCase = new ToggleFavoriteUseCase(favoriteRepository);
export const clearFavoritesUseCase = new ClearFavoritesUseCase(favoriteRepository);
