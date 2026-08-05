import React from 'react';
import { View, Text } from 'react-native';
import { Flame, Dumbbell, Wheat, Droplets } from 'lucide-react-native';

interface NutritionCardProps {
  calories?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  originalServings?: number;
  targetServings?: number;
}

export function NutritionCard({
  calories = 450,
  protein = 28,
  carbs = 42,
  fats = 14,
  originalServings = 4,
  targetServings = 4,
}: NutritionCardProps) {
  const baseServings = originalServings > 0 ? originalServings : 1;
  const ratio = targetServings / baseServings;

  const scaledCalories = Math.round(calories * ratio);
  const scaledProtein = Math.round(protein * ratio);
  const scaledCarbs = Math.round(carbs * ratio);
  const scaledFats = Math.round(fats * ratio);

  const MACROS = [
    { label: 'Calories', value: `${scaledCalories} kcal`, icon: Flame, color: '#F59E0B', bg: '#FEF3C7' },
    { label: 'Protein', value: `${scaledProtein}g`, icon: Dumbbell, color: '#10B981', bg: '#D1FAE5' },
    { label: 'Carbs', value: `${scaledCarbs}g`, icon: Wheat, color: '#3B82F6', bg: '#DBEAFE' },
    { label: 'Fats', value: `${scaledFats}g`, icon: Droplets, color: '#8B5CF6', bg: '#EDE9FE' },
  ];

  return (
    <View className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm mb-4">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-sm font-extrabold text-gray-900">Nutrition Breakdown</Text>
        {ratio !== 1 && (
          <Text className="text-[11px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
            Scaled for {targetServings} pax
          </Text>
        )}
      </View>
      <View className="flex-row gap-2 justify-between">
        {MACROS.map((m) => {
          const IconComponent = m.icon;
          return (
            <View key={m.label} className="flex-1 items-center bg-gray-50 rounded-xl p-2.5 border border-gray-100">
              <View
                style={{ backgroundColor: m.bg }}
                className="w-8 h-8 rounded-full items-center justify-center mb-1.5"
              >
                <IconComponent size={15} color={m.color} strokeWidth={2.5} />
              </View>
              <Text className="text-xs font-black text-gray-900">{m.value}</Text>
              <Text className="text-[10px] font-semibold text-gray-400 mt-0.5">{m.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
