export interface FavoriteRepository {
  getFavoriteIds(): Promise<string[]>;
  addFavorite(recipeId: string): Promise<void>;
  removeFavorite(recipeId: string): Promise<void>;
  isFavorite(recipeId: string): Promise<boolean>;
}
