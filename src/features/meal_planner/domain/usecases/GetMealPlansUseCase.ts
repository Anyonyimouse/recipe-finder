import { MealPlan } from '../../../../types/meal_planner';
import { MealPlannerRepository } from '../repositories/MealPlannerRepository';

export class GetMealPlansUseCase {
  constructor(private repo: MealPlannerRepository) {}

  async executeForDate(date: string): Promise<MealPlan[]> {
    return this.repo.getMealPlansForDate(date);
  }

  async executeForWeek(startDate: string, endDate: string): Promise<MealPlan[]> {
    return this.repo.getMealPlansForWeek(startDate, endDate);
  }
}
