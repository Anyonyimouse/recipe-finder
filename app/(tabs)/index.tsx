import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { AlignJustify, ChefHat, Search, UtensilsCrossed, X } from 'lucide-react-native';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CuisineDrawerModal } from '../../src/components/ui/CuisineDrawerModal';
import { IngredientModal } from '../../src/components/ui/IngredientModal';
import { RecipeCard } from '../../src/components/ui/RecipeCard';
import { getRecipeImageSource } from '../../src/constants/recipeImages';
import { useFavorites } from '../../src/features/favorite/presentation/hooks/useFavorites';
import { useIngredients } from '../../src/features/ingredient/presentation/hooks/useIngredients';
import { useRecipeSearch } from '../../src/features/recipe/presentation/hooks/useRecipeSearch';
import { useSync } from '../../src/features/sync/presentation/hooks/useSync';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const FEATURED_CARD_WIDTH = SCREEN_WIDTH * 0.72;




function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { text: 'Good Morning', icon: 'sun' };
  if (hour < 17) return { text: 'Good Afternoon', icon: 'sunset' };
  return { text: 'Good Evening', icon: 'moon' };
}

const MEAL_TYPES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Merienda'];

export default function RecipeFinderScreen() {
  const router = useRouter();
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [isCuisineDrawerOpen, setIsCuisineDrawerOpen] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [selectedMealType, setSelectedMealType] = useState<string>('All');
  const [maxCalories, setMaxCalories] = useState<number>(0);
  const [showSearch, setShowSearch] = useState(false);

  const greeting = useMemo(() => getGreeting(), []);

  const {
    ingredients,
    selectedIds,
    searchQuery,
    setSearchQuery,
    toggleSelectIngredient,
    clearSelection,
  } = useIngredients();

  const { recipes, isLoading: isRecipeLoading } = useRecipeSearch(
    searchQuery,
    selectedIds,
    selectedCuisine,
    selectedMealType,
    maxCalories
  );
  const { isFavorite, toggleFavorite } = useFavorites();
  const { triggerSync } = useSync();

  useEffect(() => {
    triggerSync().catch(() => { });
  }, [triggerSync]);

  const handleSelectCuisineMealFilter = (cuisine: string, mealType: string) => {
    setSelectedCuisine(cuisine);
    setSelectedMealType(mealType);
  };

  const hasCuisineFilter = selectedCuisine !== 'All' || selectedMealType !== 'All' || maxCalories > 0;
  const featuredRecipes = useMemo(() => recipes.slice(0, 5), [recipes]);
  const popularRecipes = useMemo(() => recipes.slice(5), [recipes]);

 


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* ── Sticky Fixed Top Header ── */}
      <View style={{ backgroundColor: '#F9FAFB', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12, zIndex: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.03)' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* 🎨 Stylish Mealify Typographic Brand Text */}
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={{ fontSize: 28, fontWeight: '900', color: '#0F172A', letterSpacing: -0.8 }}>
              Meal
            </Text>
            <Text style={{ fontSize: 28, fontWeight: '900', color: '#0D9488', letterSpacing: -0.8 }}>
              ify
            </Text>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#F59E0B', marginLeft: 3, marginBottom: 4 }} />
          </View>

          <View style={{ flexDirection: 'row', gap: 10 }}>

            {/* 🔍 Search — toggles the inline search bar */}
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => { });
                setShowSearch((v) => !v);
              }}
              style={{
                width: 42, height: 42, borderRadius: 14,
                backgroundColor: showSearch ? '#0D9488' : '#FFFFFF',
                borderWidth: 1, borderColor: showSearch ? '#0D9488' : '#E5E7EB',
                alignItems: 'center', justifyContent: 'center',
                shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
              }}
            >
              <Search size={18} color={showSearch ? '#FFFFFF' : '#374151'} strokeWidth={2} />
            </Pressable>

            {/* ☰ Cuisine Menu — opens the cuisine/meal-type drawer */}
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => { });
                setIsCuisineDrawerOpen(true);
              }}
              style={{
                width: 42, height: 42, borderRadius: 14,
                backgroundColor: hasCuisineFilter ? '#0D9488' : '#FFFFFF',
                borderWidth: 1, borderColor: hasCuisineFilter ? '#0D9488' : '#E5E7EB',
                alignItems: 'center', justifyContent: 'center',
                shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
              }}
            >
              <AlignJustify size={18} color={hasCuisineFilter ? '#FFFFFF' : '#374151'} strokeWidth={2} />
            </Pressable>

          </View>
        </View>

        {/* ── Inline Search Bar (collapsible) ── */}
        {showSearch && (
          <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 4, marginTop: 12, borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 }}>
            <Search size={16} color="#9CA3AF" strokeWidth={2} />
            <TextInput
              placeholder="Search recipes..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
              style={{ flex: 1, color: '#111827', fontWeight: '500', marginLeft: 10, fontSize: 14, paddingVertical: 10 }}
            />
            {searchQuery !== '' && (
              <Pressable
                onPress={() => setSearchQuery('')}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <X size={16} color="#9CA3AF" strokeWidth={2.5} />
              </Pressable>
            )}
          </View>
        )}
      </View>

      <FlatList
        data={selectedIds.length > 0 || searchQuery ? recipes : popularRecipes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 110 }}
        columnWrapperStyle={{ gap: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* ── Featured Section ── */}
            {featuredRecipes.length > 0 && !searchQuery && selectedIds.length === 0 && (
              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 20, fontWeight: '800', color: '#111827', marginHorizontal: 4, marginBottom: 14 }}>
                  Featured
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingLeft: 4, paddingRight: 16, gap: 12 }}
                >
                  {featuredRecipes.map((recipe) => {
                    const imageSource = getRecipeImageSource(recipe.id, recipe.imageUrl);
                    const totalTime = recipe.prepTime + recipe.cookTime;
                    return (
                      <Pressable
                        key={recipe.id}
                        onPress={() => {
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => { });
                          router.push({ pathname: '/recipe/[id]', params: { id: recipe.id } } as any);
                        }}
                        style={{
                          width: FEATURED_CARD_WIDTH,
                          height: 175,
                          borderRadius: 20,
                          overflow: 'hidden',
                          position: 'relative',
                          backgroundColor: '#0F766E',
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: 0.15,
                          shadowRadius: 10,
                          elevation: 5,
                        }}
                      >
                        {/* Recipe Photo */}
                        {imageSource ? (
                          <Image
                            source={imageSource}
                            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
                            contentFit="cover"
                            transition={200}
                          />
                        ) : null}

                        {/* Dark Overlay for Text Readability */}
                        <View
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                          }}
                        />

                        {/* Content */}
                        <View style={{ flex: 1, padding: 16, justifyContent: 'space-between', zIndex: 2 }}>
                          <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' }}>
                            <ChefHat size={18} color="#FFFFFF" strokeWidth={2} />
                          </View>

                          <View>
                            <Text style={{ fontSize: 16, fontWeight: '800', color: '#FFFFFF', marginBottom: 6, lineHeight: 20 }} numberOfLines={2}>
                              {recipe.title}
                            </Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                              <View style={{ backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 3 }}>
                                <Text style={{ fontSize: 11, color: '#FFFFFF', fontWeight: '600' }}>
                                  ⏱ {totalTime} Min
                                </Text>
                              </View>
                              {recipe.cuisine && (
                                <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.9)', fontWeight: '600' }}>
                                  {recipe.cuisine}
                                </Text>
                              )}
                            </View>
                          </View>
                        </View>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            )}

            {/* ── Meal Type Category Pills ── */}
            {!searchQuery && selectedIds.length === 0 && (
              <View style={{ marginBottom: 24 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 4, marginBottom: 14 }}>
                  <Text style={{ fontSize: 20, fontWeight: '800', color: '#111827' }}>Category</Text>
                  {/* "Cuisines" opens the cuisine drawer — visually labelled correctly */}
                  <Pressable
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => { });
                      setIsCuisineDrawerOpen(true);
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, backgroundColor: hasCuisineFilter ? '#F0FDF9' : 'transparent', borderWidth: hasCuisineFilter ? 1 : 0, borderColor: '#99F6E4' }}
                  >
                    <AlignJustify size={12} color="#0D9488" strokeWidth={2.5} />
                    <Text style={{ fontSize: 13, fontWeight: '600', color: '#0D9488' }}>
                      {hasCuisineFilter ? selectedCuisine.replace(' Food', '') : 'Cuisines'}
                    </Text>
                  </Pressable>
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingLeft: 4, paddingRight: 16, gap: 10 }}
                >
                  {MEAL_TYPES.map((type) => {
                    const isActive = type === 'All'
                      ? selectedMealType === 'All'
                      : selectedMealType === type;
                    return (
                      <Pressable
                        key={type}
                        onPress={() => {
                          Haptics.selectionAsync().catch(() => { });
                          setSelectedMealType(type);
                        }}
                        style={{
                          paddingHorizontal: 22, paddingVertical: 10,
                          borderRadius: 50,
                          backgroundColor: isActive ? '#0D9488' : '#FFFFFF',
                          borderWidth: 1, borderColor: isActive ? '#0D9488' : '#E5E7EB',
                          shadowColor: isActive ? '#0D9488' : '#000',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: isActive ? 0.25 : 0.04,
                          shadowRadius: 6, elevation: isActive ? 4 : 1,
                        }}
                      >
                        <Text style={{ fontSize: 14, fontWeight: '600', color: isActive ? '#FFFFFF' : '#4B5563' }}>
                          {type}
                        </Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            )}

            {/* ── Active ingredients info strip ── */}
            {selectedIds.length > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 4, marginBottom: 12 }}>
                <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '500' }}>
                  {selectedIds.length} ingredient{selectedIds.length > 1 ? 's' : ''} selected
                </Text>
                <Pressable
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => { });
                    clearSelection();
                  }}
                >
                  <Text style={{ fontSize: 12, color: '#EF4444', fontWeight: '600' }}>Clear</Text>
                </Pressable>
              </View>
            )}

            {/* ── Recipes Section Header ── */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 4, marginBottom: 14 }}>
              <Text style={{ fontSize: 20, fontWeight: '800', color: '#111827' }}>
                {selectedIds.length > 0 ? 'Matching Recipes' : searchQuery ? 'Search Results' : 'Popular Recipes'}
              </Text>
              {/* Pantry filter — opens ingredient selector */}
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => { });
                  setIsIngredientModalOpen(true);
                }}
                style={{
                  flexDirection: 'row', alignItems: 'center',
                  backgroundColor: selectedIds.length > 0 ? '#0D9488' : '#F3F4F6',
                  paddingHorizontal: 12, paddingVertical: 6, borderRadius: 50,
                }}
              >
                <UtensilsCrossed size={12} color={selectedIds.length > 0 ? '#FFFFFF' : '#6B7280'} strokeWidth={2.5} />
                <Text style={{ fontSize: 12, fontWeight: '600', color: selectedIds.length > 0 ? '#FFFFFF' : '#6B7280', marginLeft: 5 }}>
                  {selectedIds.length > 0 ? `${selectedIds.length} Ingredients` : 'My Pantry'}
                </Text>
              </Pressable>
            </View>

            {isRecipeLoading && (
              <View style={{ alignItems: 'center', paddingVertical: 40 }}>
                <ActivityIndicator size="large" color="#0D9488" />
                <Text style={{ color: '#9CA3AF', fontSize: 13, fontWeight: '500', marginTop: 10 }}>Finding recipes...</Text>
              </View>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <RecipeCard
              recipe={item}
              isFavorite={isFavorite(item.id)}
              onPress={(id) => router.push({ pathname: '/recipe/[id]', params: { id } } as any)}
              onToggleFavorite={toggleFavorite}
            />
          </View>
        )}
        ListEmptyComponent={
          !isRecipeLoading ? (
            <View style={{ alignItems: 'center', paddingVertical: 40, paddingHorizontal: 20 }}>
              <View style={{ width: 64, height: 64, borderRadius: 20, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <Search size={24} color="#9CA3AF" strokeWidth={1.75} />
              </View>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#374151', marginBottom: 6 }}>No recipes found</Text>
              <Text style={{ fontSize: 13, color: '#9CA3AF', textAlign: 'center', lineHeight: 20 }}>
                Try different ingredients or clear your selection to see more recipes.
              </Text>
            </View>
          ) : null
        }
      />

      {/* ── Floating Action Button — My Pantry (opens ingredient selector) ── */}
      <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center', alignItems: 'center' }}>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => { });
            setIsIngredientModalOpen(true);
          }}
          style={{ width: 58, height: 58, borderRadius: 29, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 10 }}
        >
          <ChefHat size={24} color="#FFFFFF" strokeWidth={1.75} />
        </Pressable>
        {selectedIds.length > 0 && (
          <View style={{ position: 'absolute', top: -4, right: -4, width: 20, height: 20, borderRadius: 10, backgroundColor: '#0D9488', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#F9FAFB' }}>
            <Text style={{ fontSize: 10, fontWeight: '800', color: '#FFFFFF' }}>{selectedIds.length}</Text>
          </View>
        )}
        <Text style={{ fontSize: 10, fontWeight: '600', color: '#6B7280', marginTop: 4, letterSpacing: 0.3 }}>
          My Pantry
        </Text>
      </View>

      {/* Ingredient Selector Modal */}
      <IngredientModal
        visible={isIngredientModalOpen}
        ingredients={ingredients}
        selectedIds={selectedIds}
        onToggleIngredient={toggleSelectIngredient}
        onClearSelection={clearSelection}
        onClose={() => setIsIngredientModalOpen(false)}
      />

      {/* Cuisine & Meal Type Drawer */}
      <CuisineDrawerModal
        visible={isCuisineDrawerOpen}
        selectedCuisine={selectedCuisine}
        selectedMealType={selectedMealType}
        maxCalories={maxCalories}
        onSelectFilter={handleSelectCuisineMealFilter}
        onSelectMaxCalories={setMaxCalories}
        onClose={() => setIsCuisineDrawerOpen(false)}
      />
    </SafeAreaView>
  );
}