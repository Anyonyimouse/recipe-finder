import { create } from 'zustand';
import { SQLiteFavoriteRepository } from '../../data/repositories/SQLiteFavoriteRepository';

const repo = new SQLiteFavoriteRepository();

interface FavoriteState {
  favoriteIds: string[];
  isLoading: boolean;
  loadFavorites: () => Promise<void>;
  toggleFavorite: (recipeId: string) => Promise<void>;
  isFavorite: (recipeId: string) => boolean;
  clearAllFavorites: () => Promise<void>;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favoriteIds: [],
  isLoading: false,

  loadFavorites: async () => {
    set({ isLoading: true });
    try {
      const ids = await repo.getFavoriteIds();
      set({ favoriteIds: ids, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  toggleFavorite: async (recipeId: string) => {
    const { favoriteIds } = get();
    const exists = favoriteIds.includes(recipeId);
    if (exists) {
      set({ favoriteIds: favoriteIds.filter((id) => id !== recipeId) });
      await repo.removeFavorite(recipeId);
    } else {
      set({ favoriteIds: [recipeId, ...favoriteIds] });
      await repo.addFavorite(recipeId);
    }
  },

  isFavorite: (recipeId: string) => {
    return get().favoriteIds.includes(recipeId);
  },

  clearAllFavorites: async () => {
    set({ favoriteIds: [] });
    await repo.clearAllFavorites();
  },
}));
