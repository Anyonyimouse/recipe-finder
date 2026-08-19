import { GetFavoritesUseCase } from '../GetFavoritesUseCase';
import { FavoriteRepository } from '../../repositories/FavoriteRepository';

describe('GetFavoritesUseCase', () => {
  let mockRepo: jest.Mocked<FavoriteRepository>;
  let useCase: GetFavoritesUseCase;

  beforeEach(() => {
    mockRepo = {
      getFavoriteIds: jest.fn(),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      clearAllFavorites: jest.fn(),
      isFavorite: jest.fn(),
    };
    useCase = new GetFavoritesUseCase(mockRepo);
  });

  it('should delegate fetching favorite recipe IDs', async () => {
    mockRepo.getFavoriteIds.mockResolvedValue(['fav-1', 'fav-2']);

    const result = await useCase.execute();

    expect(mockRepo.getFavoriteIds).toHaveBeenCalled();
    expect(result).toEqual(['fav-1', 'fav-2']);
  });
});
