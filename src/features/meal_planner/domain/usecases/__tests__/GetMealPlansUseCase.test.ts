import { GetMealPlansUseCase } from '../GetMealPlansUseCase';
import { MealPlannerRepository } from '../../repositories/MealPlannerRepository';
import { MealPlan } from '../../../../../types/meal_planner';

describe('GetMealPlansUseCase', () => {
  let mockRepo: jest.Mocked<MealPlannerRepository>;
  let useCase: GetMealPlansUseCase;

  beforeEach(() => {
    mockRepo = {
      getMealPlansForDate: jest.fn(),
      getMealPlansForWeek: jest.fn(),
      addMealPlan: jest.fn(),
      removeMealPlan: jest.fn(),
    };
    useCase = new GetMealPlansUseCase(mockRepo);
  });

  it('should fetch meal plans for a specific date from repository', async () => {
    const mockPlans: MealPlan[] = [
      {
        id: 'plan-1',
        date: '2026-08-06',
        mealType: 'Breakfast',
        recipeId: 'rec-1',
        createdAt: '2026-08-06T00:00:00Z',
      },
    ];

    mockRepo.getMealPlansForDate.mockResolvedValue(mockPlans);

    const result = await useCase.executeForDate('2026-08-06');

    expect(mockRepo.getMealPlansForDate).toHaveBeenCalledWith('2026-08-06');
    expect(result).toEqual(mockPlans);
  });

  it('should fetch meal plans for a week date range', async () => {
    const mockPlans: MealPlan[] = [
      {
        id: 'plan-1',
        date: '2026-08-06',
        mealType: 'Lunch',
        recipeId: 'rec-2',
        createdAt: '2026-08-06T12:00:00Z',
      },
    ];

    mockRepo.getMealPlansForWeek.mockResolvedValue(mockPlans);

    const result = await useCase.executeForWeek('2026-08-04', '2026-08-10');

    expect(mockRepo.getMealPlansForWeek).toHaveBeenCalledWith('2026-08-04', '2026-08-10');
    expect(result).toEqual(mockPlans);
  });
});
