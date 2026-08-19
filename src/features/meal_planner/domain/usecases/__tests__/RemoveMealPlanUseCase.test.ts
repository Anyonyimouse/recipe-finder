import { RemoveMealPlanUseCase } from '../RemoveMealPlanUseCase';
import { MealPlannerRepository } from '../../repositories/MealPlannerRepository';

describe('RemoveMealPlanUseCase', () => {
  let mockRepo: jest.Mocked<MealPlannerRepository>;
  let useCase: RemoveMealPlanUseCase;

  beforeEach(() => {
    mockRepo = {
      getMealPlansForDate: jest.fn(),
      getMealPlansForWeek: jest.fn(),
      addMealPlan: jest.fn(),
      removeMealPlan: jest.fn(),
    };
    useCase = new RemoveMealPlanUseCase(mockRepo);
  });

  it('should delegate removing meal plan by ID', async () => {
    mockRepo.removeMealPlan.mockResolvedValue(undefined);

    await useCase.execute('mp-123');

    expect(mockRepo.removeMealPlan).toHaveBeenCalledWith('mp-123');
  });
});
