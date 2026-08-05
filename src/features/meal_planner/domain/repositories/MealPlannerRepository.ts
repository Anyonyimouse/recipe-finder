import { MealPlan } from '../../../../types/meal_planner';

export interface MealPlannerRepository {
  getMealPlansForDate(date: string): Promise<MealPlan[]>;
  getMealPlansForWeek(startDate: string, endDate: string): Promise<MealPlan[]>;
  addMealPlan(date: string, mealType: string, recipeId: string): Promise<void>;
  removeMealPlan(id: string): Promise<void>;
}
