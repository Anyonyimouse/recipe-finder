import { useFavoriteStore } from '../favoriteStore';

jest.mock('../../../di/FavoriteContainer', () => ({
  getFavoritesUseCase: {
    execute: jest.fn().mockResolvedValue(['fav-1', 'fav-2']),
  },
  toggleFavoriteUseCase: {
    execute: jest.fn().mockImplementation((id: string, current: string[]) => {
      if (current.includes(id)) {
        return Promise.resolve(current.filter((i) => i !== id));
      }
      return Promise.resolve([...current, id]);
    }),
  },
  clearFavoritesUseCase: {
    execute: jest.fn().mockResolvedValue(undefined),
  },
}));

describe('useFavoriteStore', () => {
  beforeEach(() => {
    useFavoriteStore.setState({ favoriteIds: [], isLoading: false });
  });

  it('should initialize with empty favoriteIds', () => {
    const state = useFavoriteStore.getState();
    expect(state.favoriteIds).toEqual([]);
    expect(state.isLoading).toBe(false);
  });

  it('should check if recipe is favorite', () => {
    useFavoriteStore.setState({ favoriteIds: ['recipe-1'] });
    expect(useFavoriteStore.getState().isFavorite('recipe-1')).toBe(true);
    expect(useFavoriteStore.getState().isFavorite('recipe-2')).toBe(false);
  });

  it('should load favorites into store', async () => {
    await useFavoriteStore.getState().loadFavorites();
    expect(useFavoriteStore.getState().favoriteIds).toEqual(['fav-1', 'fav-2']);
  });

  it('should toggle favorite recipe status', async () => {
    useFavoriteStore.setState({ favoriteIds: ['fav-1'] });
    await useFavoriteStore.getState().toggleFavorite('fav-2');
    expect(useFavoriteStore.getState().favoriteIds).toEqual(['fav-1', 'fav-2']);
  });

  it('should clear all favorites', async () => {
    useFavoriteStore.setState({ favoriteIds: ['fav-1', 'fav-2'] });
    await useFavoriteStore.getState().clearAllFavorites();
    expect(useFavoriteStore.getState().favoriteIds).toEqual([]);
  });
});
