import { ToggleFavoriteUseCase } from '../ToggleFavoriteUseCase';
import { FavoriteRepository } from '../../repositories/FavoriteRepository';

describe('ToggleFavoriteUseCase', () => {
  let mockRepo: jest.Mocked<FavoriteRepository>;
  let useCase: ToggleFavoriteUseCase;

  beforeEach(() => {
    mockRepo = {
      getFavoriteIds: jest.fn(),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      clearAllFavorites: jest.fn(),
      isFavorite: jest.fn(),
    };
    useCase = new ToggleFavoriteUseCase(mockRepo);
  });

  it('should add favorite when recipe is not currently favorited', async () => {
    mockRepo.addFavorite.mockResolvedValue(undefined);

    const updated = await useCase.execute('rec-1', ['rec-2'], 'Adobo', 'https://example.com/adobo.jpg');

    expect(mockRepo.addFavorite).toHaveBeenCalledWith('rec-1', 'Adobo', 'https://example.com/adobo.jpg');
    expect(updated).toEqual(['rec-1', 'rec-2']);
  });

  it('should remove favorite when recipe is currently favorited', async () => {
    mockRepo.removeFavorite.mockResolvedValue(undefined);

    const updated = await useCase.execute('rec-1', ['rec-1', 'rec-2']);

    expect(mockRepo.removeFavorite).toHaveBeenCalledWith('rec-1');
    expect(updated).toEqual(['rec-2']);
  });
});
