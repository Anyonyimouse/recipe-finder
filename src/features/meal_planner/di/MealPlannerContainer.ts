import { SQLiteMealPlannerRepository } from '../data/repositories/SQLiteMealPlannerRepository';
import { MealPlannerRepository } from '../domain/repositories/MealPlannerRepository';
import { AddMealPlanUseCase } from '../domain/usecases/AddMealPlanUseCase';
import { GetMealPlansUseCase } from '../domain/usecases/GetMealPlansUseCase';
import { RemoveMealPlanUseCase } from '../domain/usecases/RemoveMealPlanUseCase';

export const mealPlannerRepository: MealPlannerRepository = new SQLiteMealPlannerRepository();
export const getMealPlansUseCase = new GetMealPlansUseCase(mealPlannerRepository);
export const addMealPlanUseCase = new AddMealPlanUseCase(mealPlannerRepository);
export const removeMealPlanUseCase = new RemoveMealPlanUseCase(mealPlannerRepository);
