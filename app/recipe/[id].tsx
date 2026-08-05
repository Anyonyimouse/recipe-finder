import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { ArrowLeft, Clock, Users, Heart, ChefHat, Plus, Minus, Scale, ShoppingBag, Check } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useRecipeDetails } from '../../src/features/recipe/presentation/hooks/useRecipeDetails';
import { useFavorites } from '../../src/features/favorite/presentation/hooks/useFavorites';
import { getRecipeImageSource } from '../../src/constants/recipeImages';
import { NutritionCard } from '../../src/features/nutrition/presentation/components/NutritionCard';
import { VoiceStepAssistant } from '../../src/features/voice_cooking/presentation/components/VoiceStepAssistant';
import { CookingTimer } from '../../src/features/voice_cooking/presentation/components/CookingTimer';
import { useShoppingList } from '../../src/features/shopping_list/presentation/hooks/useShoppingList';

function parseAndScaleQuantity(
  qtyStr: string | number | undefined,
  unitStr: string | undefined,
  originalServings: number,
  currentServings: number
): { quantity: string; unit: string; isScaled: boolean } {
  if (qtyStr === undefined || qtyStr === null || qtyStr === '') {
    return { quantity: '', unit: unitStr || '', isScaled: false };
  }

  const baseServings = originalServings > 0 ? originalServings : 1;
  const ratio = currentServings / baseServings;
  const isScaled = ratio !== 1;

  const num = typeof qtyStr === 'number' ? qtyStr : parseFloat(qtyStr.toString());

  if (isNaN(num)) {
    return { quantity: String(qtyStr), unit: unitStr || '', isScaled };
  }

  const scaled = num * ratio;
  const unitLower = (unitStr || '').toLowerCase().trim();

  if (unitLower === 'kg' || unitLower === 'kilogram' || unitLower === 'kilograms') {
    const grams = scaled * 1000;
    if (grams < 1000) {
      return { quantity: `${Math.round(grams)}`, unit: 'g', isScaled };
    }
    return { quantity: `${Number(scaled.toFixed(2))}`, unit: 'kg', isScaled };
  }

  if (unitLower === 'l' || unitLower === 'liter' || unitLower === 'liters' || unitLower === 'litre') {
    const ml = scaled * 1000;
    if (ml < 1000) {
      return { quantity: `${Math.round(ml)}`, unit: 'ml', isScaled };
    }
    return { quantity: `${Number(scaled.toFixed(2))}`, unit: 'l', isScaled };
  }

  if (unitLower === 'g' || unitLower === 'gram' || unitLower === 'grams') {
    return { quantity: `${Math.round(scaled)}`, unit: 'g', isScaled };
  }

  if (unitLower === 'ml' || unitLower === 'milliliter' || unitLower === 'milliliters') {
    return { quantity: `${Math.round(scaled)}`, unit: 'ml', isScaled };
  }

  const formatted = scaled < 1 ? Number(scaled.toFixed(2)).toString() : Number(scaled.toFixed(1)).toString();
  return { quantity: formatted, unit: unitStr || '', isScaled };
}

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { recipe, isLoading } = useRecipeDetails(id || '');
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addRecipeIngredients } = useShoppingList();
  const [imgError, setImgError] = useState(false);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients');
  const [targetServings, setTargetServings] = useState<number>(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    if (recipe && recipe.servings) {
      setTargetServings(recipe.servings);
    }
  }, [recipe]);

  if (isLoading || !recipe) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F9FAFB', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0D9488" />
      </View>
    );
  }

  const favorite = isFavorite(recipe.id);
  const imageSource = !imgError ? getRecipeImageSource(recipe.id, recipe.imageUrl) : null;
  const hasImage = Boolean(imageSource);
  const totalTime = recipe.prepTime + recipe.cookTime;
  const originalServings = recipe.servings || 1;
  const isPortionModified = targetServings !== originalServings;

  const handleAdjustServings = (delta: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setTargetServings((prev) => Math.max(1, Math.min(20, prev + delta)));
  };

  const handleSetPresetServings = (count: number) => {
    Haptics.selectionAsync().catch(() => {});
    setTargetServings(count);
  };

  const handleAddToCart = async () => {
    if (!recipe.ingredients) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    const itemsToAdd = recipe.ingredients.map((ing) => {
      const scaled = parseAndScaleQuantity(ing.quantity, ing.unit, originalServings, targetServings);
      return {
        name: ing.ingredientName || ing.ingredientId || 'Ingredient',
        quantity: parseFloat(scaled.quantity) || 1,
        unit: scaled.unit,
        category: recipe.title,
      };
    });
    await addRecipeIngredients(itemsToAdd);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 3000);
  };

  const stepInstructions = recipe.steps?.map((s) => s.instruction) || [];

  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Hero Image */}
      <View style={{ height: 300, backgroundColor: '#0F766E', position: 'relative' }}>
        {hasImage ? (
          <Image
            source={imageSource}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(255,255,255,0.07)' }} />
            <View style={{ position: 'absolute', bottom: 20, left: -20, width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.05)' }} />
            <View style={{ width: 72, height: 72, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <ChefHat size={36} color="#FFFFFF" strokeWidth={1.5} />
            </View>
            <Text style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '700', fontSize: 16, textAlign: 'center', paddingHorizontal: 32 }} numberOfLines={2}>
              {recipe.title}
            </Text>
          </View>
        )}
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, backgroundColor: 'rgba(0,0,0,0.25)' }} />

        {/* Top Bar */}
        <SafeAreaView style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8 }}>
            <Pressable
              onPress={() => router.back()}
              style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' }}
            >
              <ArrowLeft size={19} color="#FFFFFF" strokeWidth={2.5} />
            </Pressable>
            <Pressable
              onPress={() => toggleFavorite(recipe.id)}
              style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' }}
            >
              <Heart
                size={18}
                color={favorite ? '#F87171' : '#FFFFFF'}
                fill={favorite ? '#F87171' : 'transparent'}
                strokeWidth={2}
              />
            </Pressable>
          </View>
        </SafeAreaView>
      </View>

      {/* Content Panel */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 28, borderTopRightRadius: 28, marginTop: -24, paddingTop: 24, paddingHorizontal: 20, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, shadowRadius: 10 }}>
          {/* Title + time */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontSize: 22, fontWeight: '800', color: '#111827', flex: 1, marginRight: 12, lineHeight: 28 }}>
              {recipe.title}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6 }}>
              <Clock size={12} color="#6B7280" strokeWidth={2} />
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#4B5563', marginLeft: 4 }}>
                {totalTime} Min
              </Text>
            </View>
          </View>

          {/* Description */}
          {recipe.description ? (
            <Text style={{ fontSize: 13, color: '#6B7280', lineHeight: 20, marginBottom: 20 }} numberOfLines={3}>
              {recipe.description}
            </Text>
          ) : null}

          {/* Stats Grid */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {[
              { label: 'Prep Time', value: `${recipe.prepTime} min`, emoji: '🕐' },
              { label: 'Cook Time', value: `${recipe.cookTime} min`, emoji: '🍳' },
              { label: 'Calories', value: recipe.calories ? `${recipe.calories} kcal` : '450 kcal', emoji: '🔥' },
              { label: 'Difficulty', value: recipe.difficulty, emoji: recipe.difficulty === 'Easy' ? '😊' : recipe.difficulty === 'Medium' ? '🧑‍🍳' : '👨‍🍳' },
            ].map((stat) => (
              <View
                key={stat.label}
                style={{ flex: 1, minWidth: '45%', backgroundColor: '#F9FAFB', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#F3F4F6' }}
              >
                <Text style={{ fontSize: 18, marginBottom: 4 }}>{stat.emoji}</Text>
                <Text style={{ fontSize: 16, fontWeight: '800', color: '#111827' }}>{stat.value}</Text>
                <Text style={{ fontSize: 11, color: '#9CA3AF', fontWeight: '500', marginTop: 1 }}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Nutrition Breakdown */}
          <NutritionCard calories={recipe.calories || 450} protein={28} carbs={42} fats={14} originalServings={originalServings} targetServings={targetServings} />

          {/* Portion & Serving Adjuster Box */}
          <View style={{ backgroundColor: '#F0FDF9', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#CCFBF1', marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: '#0D9488', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                  <Users size={16} color="#FFFFFF" strokeWidth={2} />
                </View>
                <View>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: '#111827' }}>Portion Calculator</Text>
                  <Text style={{ fontSize: 11, color: '#0D9488', fontWeight: '500' }}>
                    {isPortionModified ? `Scaled for ${targetServings} pax (Original: ${originalServings})` : `Recipe for ${originalServings} servings`}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#99F6E4', padding: 2 }}>
                <Pressable
                  onPress={() => handleAdjustServings(-1)}
                  disabled={targetServings <= 1}
                  style={{ width: 32, height: 32, borderRadius: 9, alignItems: 'center', justifyContent: 'center', backgroundColor: targetServings <= 1 ? '#F3F4F6' : '#E6FFFA' }}
                >
                  <Minus size={14} color={targetServings <= 1 ? '#9CA3AF' : '#0D9488'} strokeWidth={2.5} />
                </Pressable>
                <View style={{ paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 15, fontWeight: '800', color: '#0D9488' }}>{targetServings}</Text>
                </View>
                <Pressable
                  onPress={() => handleAdjustServings(1)}
                  disabled={targetServings >= 20}
                  style={{ width: 32, height: 32, borderRadius: 9, alignItems: 'center', justifyContent: 'center', backgroundColor: targetServings >= 20 ? '#F3F4F6' : '#E6FFFA' }}
                >
                  <Plus size={14} color={targetServings >= 20 ? '#9CA3AF' : '#0D9488'} strokeWidth={2.5} />
                </Pressable>
              </View>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingTop: 4 }}>
              {[
                { label: '👤 1 Solo', count: 1 },
                { label: '👥 2 Pax', count: 2 },
                { label: `⭐ Orig (${originalServings})`, count: originalServings },
                { label: '👨‍👩‍👧 4 Family', count: 4 },
                { label: '🎉 6 Party', count: 6 },
              ]
                .filter((p, idx, arr) => arr.findIndex((t) => t.count === p.count) === idx)
                .sort((a, b) => a.count - b.count)
                .map((preset) => {
                  const isActive = targetServings === preset.count;
                  return (
                    <Pressable
                      key={`preset-${preset.count}`}
                      onPress={() => handleSetPresetServings(preset.count)}
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 20,
                        backgroundColor: isActive ? '#0D9488' : '#FFFFFF',
                        borderWidth: 1,
                        borderColor: isActive ? '#0D9488' : '#99F6E4',
                      }}
                    >
                      <Text style={{ fontSize: 11, fontWeight: '600', color: isActive ? '#FFFFFF' : '#0F766E' }}>
                        {preset.label}
                      </Text>
                    </Pressable>
                  );
                })}
            </View>
          </View>

          {/* Tab Switcher */}
          <View style={{ flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 14, padding: 4, marginBottom: 20 }}>
            {(['ingredients', 'instructions'] as const).map((tab) => (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={{ flex: 1, paddingVertical: 10, borderRadius: 11, alignItems: 'center', backgroundColor: activeTab === tab ? '#FFFFFF' : 'transparent', shadowColor: activeTab === tab ? '#000' : 'transparent', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: activeTab === tab ? 2 : 0 }}
              >
                <Text style={{ fontSize: 13, fontWeight: '700', color: activeTab === tab ? '#0D9488' : '#9CA3AF' }}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Ingredients Tab */}
          {activeTab === 'ingredients' && (
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '500' }}>
                  {recipe.ingredients?.length ?? 0} Item{(recipe.ingredients?.length ?? 0) !== 1 ? 's' : ''}
                </Text>
                {isPortionModified && (
                  <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0FDF9', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, borderWidth: 1, borderColor: '#99F6E4' }}>
                    <Scale size={11} color="#0D9488" strokeWidth={2.5} style={{ marginRight: 4 }} />
                    <Text style={{ fontSize: 11, fontWeight: '700', color: '#0D9488' }}>
                      Quantities Auto-Scaled
                    </Text>
                  </View>
                )}
              </View>

              {recipe.ingredients?.map((ing, idx) => {
                const scaled = parseAndScaleQuantity(
                  ing.quantity,
                  ing.unit,
                  originalServings,
                  targetServings
                );

                return (
                  <View
                    key={`ing-${ing.ingredientId || idx}-${idx}`}
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                      <View style={{ width: 40, height: 40, borderRadius: 12, overflow: 'hidden', backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                        <Image
                          source={{ uri: ing.imageUrl || 'https://www.themealdb.com/images/ingredients/Garlic.png' }}
                          style={{ width: '100%', height: '100%' }}
                          contentFit="cover"
                        />
                      </View>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827' }}>
                        {ing.ingredientName || 'Ingredient'}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: scaled.isScaled ? '#F0FDF9' : '#F9FAFB',
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: scaled.isScaled ? '#99F6E4' : '#E5E7EB',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                      }}
                    >
                      <Text style={{ fontSize: 13, fontWeight: scaled.isScaled ? '700' : '600', color: scaled.isScaled ? '#0D9488' : '#374151' }}>
                        {scaled.quantity} {scaled.unit}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          {/* Instructions Tab */}
          {activeTab === 'instructions' && (
            <View>
              {/* Hands-Free Voice Assistant */}
              {stepInstructions.length > 0 && (
                <VoiceStepAssistant steps={stepInstructions} />
              )}

              {/* Cooking Timer */}
              <CookingTimer initialMinutes={recipe.cookTime || 15} />

              {recipe.steps?.map((step, idx) => (
                <View
                  key={`step-${step.id || idx}-${idx}`}
                  style={{ flexDirection: 'row', marginBottom: 16 }}
                >
                  <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#0D9488', alignItems: 'center', justifyContent: 'center', marginRight: 14, marginTop: 2, flexShrink: 0 }}>
                    <Text style={{ fontSize: 13, fontWeight: '800', color: '#FFFFFF' }}>
                      {step.stepNumber}
                    </Text>
                  </View>
                  <View style={{ flex: 1, backgroundColor: '#F9FAFB', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#F3F4F6' }}>
                    <Text style={{ fontSize: 13, color: '#374151', lineHeight: 20 }}>
                      {step.instruction}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Bottom Actions Row */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20, gap: 10, backgroundColor: '#FFFFFF' }}>
          <Pressable
            onPress={handleAddToCart}
            style={{ backgroundColor: isAddedToCart ? '#10B981' : '#0F172A', borderRadius: 16, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            {isAddedToCart ? (
              <Check size={18} color="#FFFFFF" strokeWidth={2.5} />
            ) : (
              <ShoppingBag size={18} color="#FFFFFF" strokeWidth={2} />
            )}
            <Text style={{ fontSize: 15, fontWeight: '800', color: '#FFFFFF' }}>
              {isAddedToCart ? 'Ingredients Added to Shopping List!' : 'Add Ingredients to Shopping List'}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => toggleFavorite(recipe.id)}
            style={{ backgroundColor: '#F3F4F6', borderColor: '#E5E7EB', borderWidth: 1, borderRadius: 16, paddingVertical: 14, alignItems: 'center' }}
          >
            <Text style={{ fontSize: 14, fontWeight: '700', color: favorite ? '#EF4444' : '#374151' }}>
              {favorite ? '❤️ Saved in Favorites' : '🤍 Save to Favorites'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
