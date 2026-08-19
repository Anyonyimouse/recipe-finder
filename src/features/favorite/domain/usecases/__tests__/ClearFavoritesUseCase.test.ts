import { ClearFavoritesUseCase } from '../ClearFavoritesUseCase';
import { FavoriteRepository } from '../../repositories/FavoriteRepository';

describe('ClearFavoritesUseCase', () => {
  let mockRepo: jest.Mocked<FavoriteRepository>;
  let useCase: ClearFavoritesUseCase;

  beforeEach(() => {
    mockRepo = {
      getFavoriteIds: jest.fn(),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      clearAllFavorites: jest.fn(),
      isFavorite: jest.fn(),
    };
    useCase = new ClearFavoritesUseCase(mockRepo);
  });

  it('should delegate clearing all favorites', async () => {
    mockRepo.clearAllFavorites.mockResolvedValue(undefined);

    await useCase.execute();

    expect(mockRepo.clearAllFavorites).toHaveBeenCalled();
  });
});
