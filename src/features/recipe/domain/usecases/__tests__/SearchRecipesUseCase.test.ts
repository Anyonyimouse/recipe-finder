import { SearchRecipesUseCase } from '../SearchRecipesUseCase';
import { RecipeRepository } from '../../repositories/RecipeRepository';
import { Recipe } from '../../../../../types/recipe';

describe('SearchRecipesUseCase', () => {
  let mockRepo: jest.Mocked<RecipeRepository>;
  let useCase: SearchRecipesUseCase;

  const mockRecipes: Recipe[] = [
    {
      id: 'rec-1',
      title: 'Chicken Adobo',
      description: 'Classic Adobo',
      imageUrl: 'https://example.com/adobo.jpg',
      prepTime: 15,
      cookTime: 30,
      servings: 4,
      difficulty: 'Easy',
      categoryId: 'cat-1',
      cuisine: 'Filipino',
      mealType: 'Dinner',
      calories: 450,
      createdAt: '2026-08-01',
      updatedAt: '2026-08-01',
    },
  ];

  beforeEach(() => {
    mockRepo = {
      getAllRecipes: jest.fn(),
      getRecipeById: jest.fn(),
      searchByIngredients: jest.fn(),
      searchRecipes: jest.fn(),
      getFavoritesByIds: jest.fn(),
      saveFullOnlineRecipe: jest.fn(),
      isRecipeDownloaded: jest.fn(),
    };
    useCase = new SearchRecipesUseCase(mockRepo);
  });

  it('should delegate recipe search with query, ingredients, cuisine, mealType, and maxCalories', async () => {
    mockRepo.searchRecipes.mockResolvedValue(mockRecipes);

    const result = await useCase.execute('Chicken', ['ing-1'], 'Filipino', 'Dinner', 500);

    expect(mockRepo.searchRecipes).toHaveBeenCalledWith(
      'Chicken',
      ['ing-1'],
      'Filipino',
      'Dinner',
      500
    );
    expect(result).toEqual(mockRecipes);
  });
});
