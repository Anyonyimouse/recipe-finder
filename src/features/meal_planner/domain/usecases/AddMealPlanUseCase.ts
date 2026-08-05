import { MealPlannerRepository } from '../repositories/MealPlannerRepository';

export class AddMealPlanUseCase {
  constructor(private repo: MealPlannerRepository) {}

  async execute(date: string, mealType: string, recipeId: string): Promise<void> {
    return this.repo.addMealPlan(date, mealType, recipeId);
  }
}
