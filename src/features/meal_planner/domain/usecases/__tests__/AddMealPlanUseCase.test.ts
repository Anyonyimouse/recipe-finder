import { AddMealPlanUseCase } from '../AddMealPlanUseCase';
import { MealPlannerRepository } from '../../repositories/MealPlannerRepository';

describe('AddMealPlanUseCase', () => {
  let mockRepo: jest.Mocked<MealPlannerRepository>;
  let useCase: AddMealPlanUseCase;

  beforeEach(() => {
    mockRepo = {
      getMealPlansForDate: jest.fn(),
      getMealPlansForWeek: jest.fn(),
      addMealPlan: jest.fn(),
      removeMealPlan: jest.fn(),
    };
    useCase = new AddMealPlanUseCase(mockRepo);
  });

  it('should delegate adding a meal plan to repository', async () => {
    mockRepo.addMealPlan.mockResolvedValue(undefined);

    await useCase.execute('2026-08-06', 'Dinner', 'rec-100');

    expect(mockRepo.addMealPlan).toHaveBeenCalledWith('2026-08-06', 'Dinner', 'rec-100');
  });
});
