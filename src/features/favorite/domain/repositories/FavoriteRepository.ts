export interface FavoriteRepository {
  getFavoriteIds(): Promise<string[]>;
  addFavorite(recipeId: string, title?: string, imageUrl?: string): Promise<void>;
  removeFavorite(recipeId: string): Promise<void>;
  clearAllFavorites(): Promise<void>;
  isFavorite(recipeId: string): Promise<boolean>;
}
