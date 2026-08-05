import { MealPlannerRepository } from '../repositories/MealPlannerRepository';

export class RemoveMealPlanUseCase {
  constructor(private repo: MealPlannerRepository) {}

  async execute(id: string): Promise<void> {
    return this.repo.removeMealPlan(id);
  }
}
