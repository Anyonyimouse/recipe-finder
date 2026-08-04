import { useState, useEffect, useMemo } from 'react';
import * as Haptics from 'expo-haptics';
import { useFavorites } from '../../../favorite/presentation/hooks/useFavorites';
import { SQLiteRecipeRepository } from '../../../recipe/data/repositories/SQLiteRecipeRepository';
import { OnlineRecipe } from '../../types';

const recipeRepo = new SQLiteRecipeRepository();

export function useBrowseRecipes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedMealType, setSelectedMealType] = useState('All');
  const [showSearch, setShowSearch] = useState(false);

  const [recipes, setRecipes] = useState<OnlineRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<OnlineRecipe | null>(null);

  const [downloadedIds, setDownloadedIds] = useState<Record<string, boolean>>({});
  const [isDownloading, setIsDownloading] = useState(false);

  const [detailTab, setDetailTab] = useState<'ingredients' | 'instructions'>('ingredients');
  const [targetServings, setTargetServings] = useState<number>(4);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedCountry, setExpandedCountry] = useState<string>('');

  const { isFavorite, toggleFavorite } = useFavorites();

  // ── Fetch logic ──────────────────────────────────────────────────────────

  const fetchOnlineRecipes = async (
    query = searchQuery,
    country = selectedCountry,
    mealType = selectedMealType
  ) => {
    setIsLoading(true);
    try {
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

      if (data.meals) {
        const mealsToProcess = data.meals.slice(0, 24);
        const parsed: OnlineRecipe[] = await Promise.all(
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
        setRecipes(parsed);
      } else {
        setRecipes([]);
      }
    } catch {
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOnlineRecipes('', 'All', 'All');
  }, []);

  // ── Derived data ─────────────────────────────────────────────────────────

  const featuredRecipes = useMemo(() => recipes.slice(0, 5), [recipes]);
  const popularRecipes = useMemo(() => recipes.slice(5), [recipes]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleSearchSubmit = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    fetchOnlineRecipes(searchQuery, selectedCountry, selectedMealType);
  };

  const handleSelectCategory = (cat: string) => {
    Haptics.selectionAsync().catch(() => {});
    setSelectedMealType(cat);
    fetchOnlineRecipes(searchQuery, selectedCountry, cat);
  };

  const handleSelectCountryMeal = (country: string, meal: string) => {
    Haptics.selectionAsync().catch(() => {});
    setSelectedCountry(country);
    setSelectedMealType(meal);
    setIsSidebarOpen(false);
    fetchOnlineRecipes(searchQuery, country, meal);
  };

  const handleSelectAllCuisines = () => {
    Haptics.selectionAsync().catch(() => {});
    setSelectedCountry('All');
    setSelectedMealType('All');
    setIsSidebarOpen(false);
    fetchOnlineRecipes(searchQuery, 'All', 'All');
  };

  const handleDownloadRecipe = async (recipe: OnlineRecipe) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      setIsDownloading(true);
      await recipeRepo.saveFullOnlineRecipe(recipe);
      setDownloadedIds((prev) => ({ ...prev, [recipe.idMeal]: true }));
      if (!isFavorite(`online-${recipe.idMeal}`)) {
        await toggleFavorite(`online-${recipe.idMeal}`);
      }
    } catch {
      // safe
    } finally {
      setIsDownloading(false);
    }
  };

  const openRecipe = (recipe: OnlineRecipe) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setSelectedRecipe(recipe);
    setTargetServings(4);
    setDetailTab('ingredients');
  };

  const closeRecipe = () => setSelectedRecipe(null);

  return {
    // state
    searchQuery,
    setSearchQuery,
    selectedCountry,
    selectedMealType,
    showSearch,
    setShowSearch,
    recipes,
    isLoading,
    selectedRecipe,
    downloadedIds,
    isDownloading,
    detailTab,
    setDetailTab,
    targetServings,
    setTargetServings,
    isSidebarOpen,
    setIsSidebarOpen,
    expandedCountry,
    setExpandedCountry,
    // derived
    featuredRecipes,
    popularRecipes,
    // helpers
    isFavorite,
    toggleFavorite,
    // handlers
    handleSearchSubmit,
    handleSelectCategory,
    handleSelectCountryMeal,
    handleSelectAllCuisines,
    handleDownloadRecipe,
    openRecipe,
    closeRecipe,
  };
}
