import { create } from 'zustand';
import {
  clearFavoritesUseCase,
  getFavoritesUseCase,
  toggleFavoriteUseCase,
} from '../../di/FavoriteContainer';

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
      const ids = await getFavoritesUseCase.execute();
      set({ favoriteIds: ids, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  toggleFavorite: async (recipeId: string) => {
    const { favoriteIds } = get();
    try {
      const updated = await toggleFavoriteUseCase.execute(recipeId, favoriteIds);
      set({ favoriteIds: updated });
    } catch {
      // safe fallback
    }
  },

  isFavorite: (recipeId: string) => {
    return get().favoriteIds.includes(recipeId);
  },

  clearAllFavorites: async () => {
    try {
      await clearFavoritesUseCase.execute();
      set({ favoriteIds: [] });
    } catch {
      // safe fallback
    }
  },
}));
