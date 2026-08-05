import * as Haptics from 'expo-haptics';
import { Calendar as CalendarIcon, ChefHat, Clock, Compass, Home as HomeIcon, Plus, Trash2, Utensils, X, Search, Globe } from 'lucide-react-native';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { getRecipeImageSource } from '../../src/constants/recipeImages';
import { fetchOnlineRecipesUseCase } from '../../src/features/browse/di/BrowseContainer';
import { OnlineRecipe } from '../../src/features/browse/types';
import { useMealPlanner } from '../../src/features/meal_planner/presentation/hooks/useMealPlanner';
import { recipeRepository } from '../../src/features/recipe/di/RecipeContainer';
import { useRecipeSearch } from '../../src/features/recipe/presentation/hooks/useRecipeSearch';
import { Recipe } from '../../src/types/recipe';

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Merienda'];
const MEALDB_CATEGORIES = ['All', 'Beef', 'Chicken', 'Dessert', 'Pasta', 'Pork', 'Seafood', 'Vegetarian'];
const MEALDB_CUISINES = ['All', 'Filipino', 'Italian', 'American', 'French', 'Japanese', 'Mexican'];

function formatLocalDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getWeekDays() {
  const days = [];
  const now = new Date();
  const currentDayOfWeek = now.getDay();
  const distanceToMon = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + distanceToMon);

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
    const isoString = formatLocalDate(d);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = d.getDate();
    days.push({ isoString, dayName, dayNum });
  }
  return days;
}

export default function MealPlannerScreen() {
  const { selectedDate, setSelectedDate, plans, isLoading, addPlan, removePlan, reload } = useMealPlanner();
  const weekDays = useMemo(() => getWeekDays(), []);
  const [pickerMealType, setPickerMealType] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      reload();
    }, [reload])
  );
  const [pickerTab, setPickerTab] = useState<'local' | 'online'>('local');
  const [pickerSearch, setPickerSearch] = useState('');

  // Online MealDB filters inside Planner Picker
  const [onlineCategory, setOnlineCategory] = useState('All');
  const [onlineCuisine, setOnlineCuisine] = useState('All');

  const { recipes: availableLocalRecipes, isLoading: isLocalLoading } = useRecipeSearch(pickerSearch, []);

  const [onlineRecipes, setOnlineRecipes] = useState<OnlineRecipe[]>([]);
  const [isOnlineLoading, setIsOnlineLoading] = useState(false);

  useEffect(() => {
    if (pickerTab === 'online' && Boolean(pickerMealType)) {
      setIsOnlineLoading(true);
      fetchOnlineRecipesUseCase
        .execute(pickerSearch, onlineCuisine, onlineCategory)
        .then((res) => setOnlineRecipes(res))
        .catch(() => setOnlineRecipes([]))
        .finally(() => setIsOnlineLoading(false));
    }
  }, [pickerTab, pickerSearch, pickerMealType, onlineCategory, onlineCuisine]);

  const handleSelectLocalRecipe = async (recipe: Recipe) => {
    if (pickerMealType) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      await addPlan(pickerMealType, recipe.id);
      setPickerMealType(null);
      setPickerSearch('');
    }
  };

  const handleSelectOnlineRecipe = async (recipe: OnlineRecipe) => {
    if (pickerMealType) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      await recipeRepository.saveFullOnlineRecipe(recipe);
      await addPlan(pickerMealType, `online-${recipe.idMeal}`);
      setPickerMealType(null);
      setPickerSearch('');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View className="bg-gray-50 px-5 pt-3 pb-3 border-b border-black/5 z-10">
        <Text className="text-2xl font-black text-slate-900 tracking-tight">Meal Planner</Text>
        <Text className="text-xs text-gray-500 font-medium mt-0.5">
          Schedule your recipes for the week
        </Text>
      </View>

      {/* Date Selector Row */}
      <View className="bg-white py-3 border-b border-gray-100">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 16, paddingRight: 16, gap: 10 }}
        >
          {weekDays.map((d) => {
            const isSelected = selectedDate === d.isoString;
            return (
              <Pressable
                key={d.isoString}
                onPress={() => {
                  Haptics.selectionAsync().catch(() => {});
                  setSelectedDate(d.isoString);
                }}
                style={{
                  width: 56,
                  height: 64,
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  backgroundColor: isSelected ? '#0D9488' : '#F9FAFB',
                  borderColor: isSelected ? '#0D9488' : '#E5E7EB',
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    color: isSelected ? '#CCFBF1' : '#9CA3AF',
                  }}
                >
                  {d.dayName}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '900',
                    marginTop: 2,
                    color: isSelected ? '#FFFFFF' : '#1F2937',
                  }}
                >
                  {d.dayNum}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Plan Slots */}
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0D9488" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {MEAL_TYPES.map((type) => {
            const typePlans = plans.filter((p) => p.mealType === type);

            return (
              <View
                key={type}
                className="mb-5 bg-white rounded-2xl p-4 border border-gray-200 shadow-sm"
              >
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center gap-2">
                    <View className="w-7 h-7 rounded-lg bg-teal-50 items-center justify-center">
                      <Utensils size={14} color="#0D9488" strokeWidth={2.5} />
                    </View>
                    <Text className="text-base font-extrabold text-gray-900">{type}</Text>
                  </View>

                  <Pressable
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                      setPickerMealType(type);
                    }}
                    className="flex-row items-center gap-1 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full"
                  >
                    <Plus size={13} color="#0D9488" strokeWidth={2.5} />
                    <Text className="text-xs font-extrabold text-teal-700">Add Recipe</Text>
                  </Pressable>
                </View>

                {typePlans.length === 0 ? (
                  <Pressable
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                      setPickerMealType(type);
                    }}
                    className="py-4 border border-dashed border-gray-200 rounded-xl items-center justify-center bg-gray-50/50"
                  >
                    <Text className="text-xs text-teal-600 font-bold">+ Tap to plan {type}</Text>
                  </Pressable>
                ) : (
                  typePlans.map((plan) => {
                    const img = getRecipeImageSource(plan.recipeId, plan.imageUrl);
                    return (
                      <View
                        key={plan.id}
                        className="flex-row items-center bg-gray-50 rounded-xl p-2.5 mb-2 border border-gray-100 justify-between"
                      >
                        <View className="flex-row items-center flex-1 mr-2">
                          {img ? (
                            <Image source={img} className="w-12 h-12 rounded-lg mr-3" />
                          ) : (
                            <View className="w-12 h-12 rounded-lg bg-teal-100 items-center justify-center mr-3">
                              <ChefHat size={20} color="#0D9488" />
                            </View>
                          )}
                          <View className="flex-1">
                            <Text
                              className="text-sm font-bold text-gray-800 leading-4"
                              numberOfLines={1}
                            >
                              {plan.recipeTitle || 'Planned Recipe'}
                            </Text>
                            {(plan.prepTime || plan.cookTime) ? (
                              <View className="flex-row items-center mt-1">
                                <Clock size={11} color="#9CA3AF" />
                                <Text className="text-[11px] text-gray-400 font-medium ml-1">
                                  {(plan.prepTime || 0) + (plan.cookTime || 0)} mins
                                </Text>
                              </View>
                            ) : null}
                          </View>
                        </View>

                        <Pressable
                          onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                            removePlan(plan.id);
                          }}
                          className="p-2 rounded-lg bg-red-50"
                        >
                          <Trash2 size={15} color="#EF4444" strokeWidth={2} />
                        </Pressable>
                      </View>
                    );
                  })
                )}
              </View>
            );
          })}
        </ScrollView>
      )}

      {/* ── Recipe Selector Modal (Local + MealDB Online Recipes) ── */}
      <Modal
        visible={Boolean(pickerMealType)}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setPickerMealType(null)}
      >
        <SafeAreaView className="flex-1 bg-gray-50">
          <View className="px-5 pt-3 pb-3 border-b border-gray-100 bg-white flex-row items-center justify-between">
            <View>
              <Text className="text-xl font-extrabold text-gray-900">
                Plan {pickerMealType}
              </Text>
              <Text className="text-xs text-gray-400">Select a recipe for {selectedDate}</Text>
            </View>
            <Pressable
              onPress={() => setPickerMealType(null)}
              className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
            >
              <X size={18} color="#374151" strokeWidth={2.5} />
            </Pressable>
          </View>

          {/* Local vs MealDB Online Tab Switcher */}
          <View className="flex-row p-3 bg-white border-b border-gray-100 gap-2">
            <Pressable
              onPress={() => setPickerTab('local')}
              style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                backgroundColor: pickerTab === 'local' ? '#F0FDF9' : '#F3F4F6',
                borderWidth: 1,
                borderColor: pickerTab === 'local' ? '#99F6E4' : 'transparent',
              }}
            >
              <HomeIcon size={16} color={pickerTab === 'local' ? '#0D9488' : '#6B7280'} />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '700',
                  color: pickerTab === 'local' ? '#0D9488' : '#6B7280',
                }}
              >
                Local Recipes
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setPickerTab('online')}
              style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                backgroundColor: pickerTab === 'online' ? '#F0FDF9' : '#F3F4F6',
                borderWidth: 1,
                borderColor: pickerTab === 'online' ? '#99F6E4' : 'transparent',
              }}
            >
              <Compass size={16} color={pickerTab === 'online' ? '#0D9488' : '#6B7280'} />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '700',
                  color: pickerTab === 'online' ? '#0D9488' : '#6B7280',
                }}
              >
                MealDB Browse
              </Text>
            </Pressable>
          </View>

          {/* Search bar */}
          <View className="p-4 bg-white border-b border-gray-100">
            <View className="bg-gray-100 rounded-xl flex-row items-center px-3 py-2">
              <Search size={16} color="#9CA3AF" />
              <TextInput
                placeholder={pickerTab === 'local' ? 'Search local recipes...' : 'Search MealDB online recipes...'}
                placeholderTextColor="#9CA3AF"
                value={pickerSearch}
                onChangeText={setPickerSearch}
                className="flex-1 ml-2 text-sm text-gray-900 font-medium py-1"
              />
            </View>
          </View>

          {/* MealDB Categories & Cuisines Pills (when in Online tab) */}
          {pickerTab === 'online' && (
            <View className="bg-white pb-3 border-b border-gray-100">
              {/* Categories */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 8, paddingBottom: 6 }}
              >
                {MEALDB_CATEGORIES.map((cat) => {
                  const isSelected = onlineCategory === cat;
                  return (
                    <Pressable
                      key={cat}
                      onPress={() => {
                        Haptics.selectionAsync().catch(() => {});
                        setOnlineCategory(cat);
                      }}
                      style={{
                        paddingHorizontal: 14,
                        paddingVertical: 6,
                        borderRadius: 20,
                        backgroundColor: isSelected ? '#0D9488' : '#F3F4F6',
                        borderWidth: 1,
                        borderColor: isSelected ? '#0D9488' : 'transparent',
                      }}
                    >
                      <Text style={{ fontSize: 12, fontWeight: '700', color: isSelected ? '#FFFFFF' : '#4B5563' }}>
                        {cat}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>

              {/* Cuisines */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
              >
                {MEALDB_CUISINES.map((cui) => {
                  const isSelected = onlineCuisine === cui;
                  return (
                    <Pressable
                      key={cui}
                      onPress={() => {
                        Haptics.selectionAsync().catch(() => {});
                        setOnlineCuisine(cui);
                      }}
                      style={{
                        paddingHorizontal: 14,
                        paddingVertical: 6,
                        borderRadius: 20,
                        backgroundColor: isSelected ? '#0F766E' : '#F3F4F6',
                        borderWidth: 1,
                        borderColor: isSelected ? '#0F766E' : 'transparent',
                      }}
                    >
                      <Text style={{ fontSize: 12, fontWeight: '700', color: isSelected ? '#FFFFFF' : '#4B5563' }}>
                        🌐 {cui}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          )}

          {/* Local Tab List */}
          {pickerTab === 'local' ? (
            isLocalLoading ? (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#0D9488" />
              </View>
            ) : (
              <FlatList
                data={availableLocalRecipes}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16, gap: 10 }}
                renderItem={({ item }) => {
                  const img = getRecipeImageSource(item.id, item.imageUrl);
                  return (
                    <Pressable
                      onPress={() => handleSelectLocalRecipe(item)}
                      className="flex-row items-center bg-white p-3 rounded-2xl border border-gray-200 shadow-sm"
                    >
                      {img ? (
                        <Image source={img} className="w-14 h-14 rounded-xl mr-3" />
                      ) : (
                        <View className="w-14 h-14 rounded-xl bg-teal-50 items-center justify-center mr-3">
                          <ChefHat size={24} color="#0D9488" />
                        </View>
                      )}
                      <View className="flex-1">
                        <Text className="text-base font-bold text-gray-900 leading-5" numberOfLines={1}>
                          {item.title}
                        </Text>
                        <Text className="text-xs text-gray-400 mt-1 font-medium">
                          ⏱ {item.prepTime + item.cookTime} mins · {item.difficulty}
                        </Text>
                      </View>
                      <View className="bg-teal-600 px-3 py-1.5 rounded-full">
                        <Text className="text-xs font-bold text-white">Select</Text>
                      </View>
                    </Pressable>
                  );
                }}
              />
            )
          ) : (
            /* Online Tab List */
            isOnlineLoading ? (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#0D9488" />
                <Text className="text-xs text-gray-400 mt-2 font-medium">Loading MealDB recipes...</Text>
              </View>
            ) : (
              <FlatList
                data={onlineRecipes}
                keyExtractor={(item) => item.idMeal}
                contentContainerStyle={{ padding: 16, gap: 10 }}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => handleSelectOnlineRecipe(item)}
                    className="flex-row items-center bg-white p-3 rounded-2xl border border-gray-200 shadow-sm"
                  >
                    <Image source={{ uri: item.strMealThumb }} className="w-14 h-14 rounded-xl mr-3" />
                    <View className="flex-1">
                      <Text className="text-base font-bold text-gray-900 leading-5" numberOfLines={1}>
                        {item.strMeal}
                      </Text>
                      <Text className="text-xs text-teal-600 mt-1 font-semibold">
                        🌐 {item.strArea} · {item.strCategory}
                      </Text>
                    </View>
                    <View className="bg-teal-600 px-3 py-1.5 rounded-full">
                      <Text className="text-xs font-bold text-white">Plan Recipe</Text>
                    </View>
                  </Pressable>
                )}
              />
            )
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
