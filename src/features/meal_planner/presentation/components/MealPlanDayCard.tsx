import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { Utensils, Plus, Trash2, ChefHat, Clock } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { MealPlan } from '../../../../types/meal_planner';
import { getRecipeImageSource } from '../../../../constants/recipeImages';

interface MealPlanDayCardProps {
  mealType: string;
  plans: MealPlan[];
  onAddRecipe: (mealType: string) => void;
  onRemovePlan: (planId: string) => void;
}

export const MealPlanDayCard: React.FC<MealPlanDayCardProps> = React.memo(({
  mealType,
  plans,
  onAddRecipe,
  onRemovePlan,
}) => {
  return (
    <View style={{ marginBottom: 20, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: '#F0FDF9', alignItems: 'center', justifyContent: 'center' }}>
            <Utensils size={14} color="#0D9488" strokeWidth={2.5} />
          </View>
          <Text style={{ fontSize: 16, fontWeight: '800', color: '#111827' }}>{mealType}</Text>
        </View>

        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
            onAddRecipe(mealType);
          }}
          hitSlop={8}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#F0FDF9', borderWidth: 1, borderColor: '#99F6E4', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 50, minHeight: 36 }}
        >
          <Plus size={13} color="#0D9488" strokeWidth={2.5} />
          <Text style={{ fontSize: 12, fontWeight: '800', color: '#0F766E' }}>Add Recipe</Text>
        </Pressable>
      </View>

      {plans.length === 0 ? (
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
            onAddRecipe(mealType);
          }}
          style={{ paddingVertical: 16, borderWidth: 1, borderStyle: 'dashed', borderColor: '#E5E7EB', borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(249, 250, 251, 0.5)', minHeight: 48 }}
        >
          <Text style={{ fontSize: 12, color: '#0D9488', fontWeight: '700' }}>+ Tap to plan {mealType}</Text>
        </Pressable>
      ) : (
        plans.map((plan) => {
          const img = getRecipeImageSource(plan.recipeId, plan.imageUrl);
          return (
            <View
              key={plan.id}
              style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 12, padding: 10, marginBottom: 8, borderWidth: 1, borderColor: '#F3F4F6', justifyContent: 'space-between' }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 8 }}>
                {img ? (
                  <Image source={img} style={{ width: 48, height: 48, borderRadius: 8, marginRight: 12 }} />
                ) : (
                  <View style={{ width: 48, height: 48, borderRadius: 8, backgroundColor: '#CCFBF1', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                    <ChefHat size={20} color="#0D9488" />
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontSize: 14, fontWeight: '700', color: '#1F2937' }}
                    numberOfLines={1}
                  >
                    {plan.recipeTitle || 'Planned Recipe'}
                  </Text>
                  {(plan.prepTime || plan.cookTime) ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                      <Clock size={11} color="#9CA3AF" />
                      <Text style={{ fontSize: 11, color: '#9CA3AF', fontWeight: '500', marginLeft: 4 }}>
                        {(plan.prepTime || 0) + (plan.cookTime || 0)} mins
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>

              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                  onRemovePlan(plan.id);
                }}
                hitSlop={8}
                style={{ padding: 8, borderRadius: 8, backgroundColor: '#FEF2F2', minHeight: 36, minWidth: 36, alignItems: 'center', justifyContent: 'center' }}
              >
                <Trash2 size={15} color="#EF4444" strokeWidth={2} />
              </Pressable>
            </View>
          );
        })
      )}
    </View>
  );
});

MealPlanDayCard.displayName = 'MealPlanDayCard';
