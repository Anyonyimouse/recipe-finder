import { FetchOnlineRecipesUseCase } from '../FetchOnlineRecipesUseCase';
import { BrowseRepository } from '../../repositories/BrowseRepository';
import { OnlineRecipe } from '../../../types';

describe('FetchOnlineRecipesUseCase', () => {
  let mockRepo: jest.Mocked<BrowseRepository>;
  let useCase: FetchOnlineRecipesUseCase;

  const mockOnlineRecipes: OnlineRecipe[] = [
    {
      idMeal: '52772',
      strMeal: 'Teriyaki Chicken Casserole',
      strCategory: 'Chicken',
      strArea: 'Japanese',
      strMealThumb: 'https://example.com/teriyaki.jpg',
      strInstructions: 'Preheat oven...',
      ingredients: [{ name: 'Soy Sauce', measure: '3/4 cup' }],
    },
  ];

  beforeEach(() => {
    mockRepo = {
      fetchRecipes: jest.fn(),
    };
    useCase = new FetchOnlineRecipesUseCase(mockRepo);
  });

  it('should delegate fetching online recipes with query, country, and mealType', async () => {
    mockRepo.fetchRecipes.mockResolvedValue(mockOnlineRecipes);

    const result = await useCase.execute('Teriyaki', 'Japanese', 'Chicken');

    expect(mockRepo.fetchRecipes).toHaveBeenCalledWith('Teriyaki', 'Japanese', 'Chicken');
    expect(result).toEqual(mockOnlineRecipes);
  });
});
