import { useState, useEffect, useMemo, useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { useFavorites } from '../../../favorite/presentation/hooks/useFavorites';
import { recipeRepository } from '../../../recipe/di/RecipeContainer';
import { fetchOnlineRecipesUseCase } from '../../di/BrowseContainer';
import { OnlineRecipe } from '../../types';

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

  const fetchOnlineRecipes = useCallback(async (
    query = searchQuery,
    country = selectedCountry,
    mealType = selectedMealType
  ) => {
    setIsLoading(true);
    try {
      const data = await fetchOnlineRecipesUseCase.execute(query, country, mealType);
      setRecipes(data);
    } catch {
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedCountry, selectedMealType]);

  useEffect(() => {
    fetchOnlineRecipes('', 'All', 'All');
  }, [fetchOnlineRecipes]);

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
      await recipeRepository.saveFullOnlineRecipe(recipe);
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
