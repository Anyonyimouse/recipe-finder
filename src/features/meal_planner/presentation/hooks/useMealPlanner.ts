import { useState, useEffect, useCallback } from 'react';
import { MealPlan } from '../../../../types/meal_planner';
import {
  addMealPlanUseCase,
  getMealPlansUseCase,
  removeMealPlanUseCase,
} from '../../di/MealPlannerContainer';

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function useMealPlanner() {
  const [selectedDate, setSelectedDate] = useState<string>(getTodayString());
  const [plans, setPlans] = useState<MealPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPlans = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getMealPlansUseCase.executeForDate(selectedDate);
      setPlans(data);
    } catch {
      // safe offline handle
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  const addPlan = async (mealType: string, recipeId: string) => {
    await addMealPlanUseCase.execute(selectedDate, mealType, recipeId);
    await loadPlans();
  };

  const removePlan = async (id: string) => {
    setPlans((prev) => prev.filter((p) => p.id !== id));
    await removeMealPlanUseCase.execute(id);
  };

  return {
    selectedDate,
    setSelectedDate,
    plans,
    isLoading,
    addPlan,
    removePlan,
    reload: loadPlans,
  };
}
