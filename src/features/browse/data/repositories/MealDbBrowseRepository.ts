import { BrowseRepository } from '../../domain/repositories/BrowseRepository';
import { OnlineRecipe } from '../../types';

export class MealDbBrowseRepository implements BrowseRepository {
  async fetchRecipes(query: string, country: string, mealType: string): Promise<OnlineRecipe[]> {
    let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    if (query.trim() !== '') {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query.trim())}`;
    } else if (country !== 'All') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(country)}`;
    } else if (mealType !== 'All') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(mealType)}`;
    } else {
      url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken';
    }

    const res = await fetch(url);
    const data = await res.json();

    if (!data.meals) return [];

    const mealsToProcess = data.meals.slice(0, 24);
    return Promise.all(
      mealsToProcess.map(async (meal: any) => {
        let fullMeal = meal;
        if (!meal.strInstructions) {
          try {
            const detailRes = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
            );
            const detailData = await detailRes.json();
            if (detailData.meals && detailData.meals[0]) {
              fullMeal = detailData.meals[0];
            }
          } catch {
            // fallback to partial data
          }
        }

        const ingredients: { name: string; measure: string }[] = [];
        for (let i = 1; i <= 20; i++) {
          const name = fullMeal[`strIngredient${i}`];
          const measure = fullMeal[`strMeasure${i}`];
          if (name && name.trim() !== '') {
            ingredients.push({ name: name.trim(), measure: measure ? measure.trim() : '' });
          }
        }

        return {
          idMeal: fullMeal.idMeal,
          strMeal: fullMeal.strMeal,
          strCategory: fullMeal.strCategory || (mealType !== 'All' ? mealType : 'General'),
          strArea: fullMeal.strArea || (country !== 'All' ? country : 'International'),
          strMealThumb: fullMeal.strMealThumb,
          strInstructions: fullMeal.strInstructions || '',
          strYoutube: fullMeal.strYoutube,
          ingredients,
        };
      })
    );
  }
}
