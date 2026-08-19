import * as Haptics from 'expo-haptics';
import { ChefHat, Compass, Home as HomeIcon, X, Search } from 'lucide-react-native';
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
import { MealPlanCalendarHeader } from '../../src/features/meal_planner/presentation/components/MealPlanCalendarHeader';
import { MealPlanDayCard } from '../../src/features/meal_planner/presentation/components/MealPlanDayCard';
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View style={{ backgroundColor: '#F9FAFB', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)', zIndex: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: '900', color: '#0F172A', letterSpacing: -0.5 }}>Meal Planner</Text>
        <Text style={{ fontSize: 12, color: '#6B7280', fontWeight: '500', marginTop: 2 }}>
          Schedule your recipes for the week
        </Text>
      </View>

      {/* Date Selector Row */}
      <MealPlanCalendarHeader
        weekDays={weekDays}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      {/* Plan Slots */}
      {isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
              <MealPlanDayCard
                key={type}
                mealType={type}
                plans={typePlans}
                onAddRecipe={(t) => setPickerMealType(t)}
                onRemovePlan={removePlan}
              />
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
          <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: '800', color: '#111827' }}>
                Plan {pickerMealType}
              </Text>
              <Text style={{ fontSize: 12, color: '#9CA3AF' }}>Select a recipe for {selectedDate}</Text>
            </View>
            <Pressable
              onPress={() => setPickerMealType(null)}
              style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} color="#374151" strokeWidth={2.5} />
            </Pressable>
          </View>

          {/* Local vs MealDB Online Tab Switcher */}
          <View style={{ flexDirection: 'row', padding: 12, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F3F4F6', gap: 8 }}>
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
                minHeight: 48,
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
                minHeight: 48,
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
          <View style={{ padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}>
            <View style={{ backgroundColor: '#F3F4F6', borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8 }}>
              <Search size={16} color="#9CA3AF" />
              <TextInput
                placeholder={pickerTab === 'local' ? 'Search local recipes...' : 'Search MealDB online recipes...'}
                placeholderTextColor="#9CA3AF"
                value={pickerSearch}
                onChangeText={setPickerSearch}
                style={{ flex: 1, marginLeft: 8, fontSize: 14, color: '#111827', fontWeight: '500', paddingVertical: 4 }}
              />
            </View>
          </View>

          {/* MealDB Categories & Cuisines Pills (when in Online tab) */}
          {pickerTab === 'online' && (
            <View style={{ backgroundColor: '#FFFFFF', paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}>
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
                        minHeight: 36,
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
                        minHeight: 36,
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
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
                      style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 12, borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', minHeight: 64 }}
                    >
                      {img ? (
                        <Image source={img} style={{ width: 56, height: 56, borderRadius: 12, marginRight: 12 }} />
                      ) : (
                        <View style={{ width: 56, height: 56, borderRadius: 12, backgroundColor: '#F0FDF9', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                          <ChefHat size={24} color="#0D9488" />
                        </View>
                      )}
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827' }} numberOfLines={1}>
                          {item.title}
                        </Text>
                        <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4, fontWeight: '500' }}>
                          ⏱ {item.prepTime + item.cookTime} mins · {item.difficulty}
                        </Text>
                      </View>
                      <View style={{ backgroundColor: '#0D9488', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 50 }}>
                        <Text style={{ fontSize: 12, fontWeight: '700', color: '#FFFFFF' }}>Select</Text>
                      </View>
                    </Pressable>
                  );
                }}
              />
            )
          ) : (
            /* Online Tab List */
            isOnlineLoading ? (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#0D9488" />
                <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 8, fontWeight: '500' }}>Loading MealDB recipes...</Text>
              </View>
            ) : (
              <FlatList
                data={onlineRecipes}
                keyExtractor={(item) => item.idMeal}
                contentContainerStyle={{ padding: 16, gap: 10 }}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => handleSelectOnlineRecipe(item)}
                    style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 12, borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', minHeight: 64 }}
                  >
                    <Image source={{ uri: item.strMealThumb }} style={{ width: 56, height: 56, borderRadius: 12, marginRight: 12 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827' }} numberOfLines={1}>
                        {item.strMeal}
                      </Text>
                      <Text style={{ fontSize: 12, color: '#0D9488', marginTop: 4, fontWeight: '600' }}>
                        🌐 {item.strArea} · {item.strCategory}
                      </Text>
                    </View>
                    <View style={{ backgroundColor: '#0D9488', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 50 }}>
                      <Text style={{ fontSize: 12, fontWeight: '700', color: '#FFFFFF' }}>Plan Recipe</Text>
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
