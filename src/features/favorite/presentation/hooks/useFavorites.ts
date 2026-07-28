import { useEffect } from 'react';
import { useFavoriteStore } from '../stores/favoriteStore';

export function useFavorites() {
  const { favoriteIds, isLoading, loadFavorites, toggleFavorite, isFavorite } =
    useFavoriteStore();

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return {
    favoriteIds,
    isLoading,
    toggleFavorite,
    isFavorite,
    reload: loadFavorites,
  };
}
