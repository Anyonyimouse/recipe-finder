import * as Haptics from 'expo-haptics';
import { Check, ChevronDown, ChevronRight, X } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CuisineCategory {
  id: string;
  name: string;
  flag: string;
  meals: { id: string; name: string; label: string; icon: string }[];
}

const CUISINES: CuisineCategory[] = [
  {
    id: 'Filipino Food',
    name: 'Filipino',
    flag: '🇵🇭',
    meals: [
      { id: 'Breakfast', name: 'Breakfast', label: 'Breakfast', icon: '🍳' },
      { id: 'Lunch', name: 'Lunch', label: 'Lunch', icon: '🍲' },
      { id: 'Dinner', name: 'Dinner', label: 'Dinner', icon: '🔥' },
      { id: 'Merienda', name: 'Merienda', label: 'Merienda & Snacks', icon: '🍰' },
    ],
  },
  {
    id: 'Italian Food',
    name: 'Italian',
    flag: '🇮🇹',
    meals: [
      { id: 'Breakfast', name: 'Breakfast', label: 'Breakfast', icon: '☕' },
      { id: 'Lunch', name: 'Lunch', label: 'Lunch', icon: '🍝' },
      { id: 'Dinner', name: 'Dinner', label: 'Dinner', icon: '🍷' },
      { id: 'Merienda', name: 'Merienda', label: 'Dessert', icon: '🍨' },
    ],
  },
  {
    id: 'American Food',
    name: 'American',
    flag: '🇺🇸',
    meals: [
      { id: 'Breakfast', name: 'Breakfast', label: 'Breakfast', icon: '🥞' },
      { id: 'Lunch', name: 'Lunch', label: 'Lunch', icon: '🍔' },
      { id: 'Dinner', name: 'Dinner', label: 'Dinner', icon: '🍖' },
      { id: 'Merienda', name: 'Merienda', label: 'Dessert', icon: '🥧' },
    ],
  },
  {
    id: 'Japanese Food',
    name: 'Japanese',
    flag: '🇯🇵',
    meals: [
      { id: 'Breakfast', name: 'Breakfast', label: 'Breakfast', icon: '🍱' },
      { id: 'Lunch', name: 'Lunch', label: 'Lunch', icon: '🍜' },
      { id: 'Dinner', name: 'Dinner', label: 'Dinner', icon: '🍣' },
      { id: 'Merienda', name: 'Merienda', label: 'Dessert', icon: '🍡' },
    ],
  },
];

interface CuisineDrawerModalProps {
  visible: boolean;
  selectedCuisine: string;
  selectedMealType: string;
  maxCalories: number;
  onSelectFilter: (cuisine: string, mealType: string) => void;
  onSelectMaxCalories: (max: number) => void;
  onClose: () => void;
}

export function CuisineDrawerModal({
  visible,
  selectedCuisine,
  selectedMealType,
  maxCalories,
  onSelectFilter,
  onSelectMaxCalories,
  onClose,
}: CuisineDrawerModalProps) {
  const [expandedCuisine, setExpandedCuisine] = useState<string>('');

  React.useEffect(() => {
    if (visible) {
      setExpandedCuisine(selectedCuisine && selectedCuisine !== 'All' ? selectedCuisine : '');
    }
  }, [visible, selectedCuisine]);

  const handleCuisineHeaderPress = (cuisineId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => { });
    setExpandedCuisine(expandedCuisine === cuisineId ? '' : cuisineId);
  };

  const handleSelectMeal = (cuisine: string, mealType: string) => {
    Haptics.selectionAsync().catch(() => { });
    onSelectMaxCalories(0); // clear calorie filter when picking a cuisine
    onSelectFilter(cuisine, mealType);
    onClose();
  };

  const handleSelectAll = () => {
    Haptics.selectionAsync().catch(() => { });
    onSelectFilter('All', 'All');
    onSelectMaxCalories(0); // clear calorie filter too
    onClose();
  };

  const handleSelectCalories = (max: number) => {
    Haptics.selectionAsync().catch(() => { });
    onSelectFilter('All', 'All'); // clear cuisine filter when using calorie filter
    onSelectMaxCalories(max);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', flexDirection: 'row' }}>
        {/* Drawer */}
        <SafeAreaView style={{ width: '82%', backgroundColor: '#FFFFFF', flex: 1 }}>
          {/* Header */}
          <View style={{ paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827' }}>Cuisines & Meals</Text>
              <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>Choose your food category</Text>
            </View>
            <Pressable
              onPress={onClose}
              style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={16} color="#6B7280" strokeWidth={2.5} />
            </Pressable>
          </View>

          {/* List */}
          <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingTop: 12 }} showsVerticalScrollIndicator={false}>
            {/* All Recipes */}
            <Pressable
              onPress={handleSelectAll}
              style={{
                paddingVertical: 11,
                paddingHorizontal: 14,
                borderRadius: 12,
                backgroundColor: selectedCuisine === 'All' && selectedMealType === 'All' ? '#F0FDF9' : '#F9FAFB',
                borderWidth: 1,
                borderColor: selectedCuisine === 'All' && selectedMealType === 'All' ? '#99F6E4' : '#F3F4F6',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 17, marginRight: 10 }}>🍽️</Text>
                <Text style={{ fontWeight: '600', fontSize: 13, color: selectedCuisine === 'All' && selectedMealType === 'All' ? '#0D9488' : '#374151' }}>
                  All Cuisines
                </Text>
              </View>
              {selectedCuisine === 'All' && selectedMealType === 'All' && (
                <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#0D9488', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={12} color="#FFFFFF" strokeWidth={3} />
                </View>
              )}
            </Pressable>

            {/* ── Low Calorie Section ── */}
            <View style={{ marginBottom: 8, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: maxCalories > 0 ? '#99F6E4' : '#F3F4F6', backgroundColor: '#FFFFFF' }}>
              {/* Section header */}
              <View style={{ paddingVertical: 11, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', backgroundColor: maxCalories > 0 ? '#F0FDF9' : '#FFFFFF' }}>
                <Text style={{ fontSize: 17, marginRight: 10 }}>🥗</Text>
                <Text style={{ fontWeight: '600', fontSize: 13, color: maxCalories > 0 ? '#0D9488' : '#374151', flex: 1 }}>
                  Low Calorie
                </Text>
                {maxCalories > 0 && (
                  <View style={{ backgroundColor: '#0D9488', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 }}>
                    <Text style={{ fontSize: 10, color: '#FFFFFF', fontWeight: '700' }}>≤ {maxCalories} kcal</Text>
                  </View>
                )}
              </View>
              {/* Calorie tiers */}
              <View style={{ backgroundColor: '#FAFAFA', borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingVertical: 4, paddingHorizontal: 12 }}>
                {[
                  { label: 'Light Meal', desc: 'Under 400 kcal', max: 400, icon: '🥙' },
                  { label: 'Balanced', desc: 'Under 600 kcal', max: 600, icon: '🍱' },
                ].map((tier) => {
                  const isSelected = maxCalories === tier.max;
                  return (
                    <Pressable
                      key={tier.max}
                      onPress={() => handleSelectCalories(tier.max)}
                      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 9, paddingHorizontal: 8, borderRadius: 10, backgroundColor: isSelected ? '#F0FDF9' : 'transparent', marginBottom: 2 }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, marginRight: 8 }}>{tier.icon}</Text>
                        <View>
                          <Text style={{ fontSize: 12, fontWeight: isSelected ? '700' : '600', color: isSelected ? '#0D9488' : '#374151' }}>{tier.label}</Text>
                          <Text style={{ fontSize: 10, color: '#9CA3AF', marginTop: 1 }}>{tier.desc}</Text>
                        </View>
                      </View>
                      {isSelected && <Check size={14} color="#0D9488" strokeWidth={2.5} />}
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* ── Cuisine Accordion ── */}

            {CUISINES.map((item) => {
              const isExpanded = expandedCuisine === item.id;
              const isCuisineSelected = selectedCuisine === item.id;

              return (
                <View key={item.id} style={{ marginBottom: 8, borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: isCuisineSelected ? '#99F6E4' : '#F3F4F6', backgroundColor: '#FFFFFF' }}>
                  {/* Header */}
                  <Pressable
                    onPress={() => handleCuisineHeaderPress(item.id)}
                    style={{ paddingVertical: 11, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: isCuisineSelected ? '#F0FDF9' : '#FFFFFF' }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                      <Text style={{ fontSize: 17, marginRight: 10 }}>{item.flag}</Text>
                      <Text style={{ fontWeight: '600', fontSize: 13, color: isCuisineSelected ? '#0D9488' : '#374151' }}>
                        {item.name}
                      </Text>
                    </View>
                    {isExpanded
                      ? <ChevronDown size={16} color="#9CA3AF" strokeWidth={2} />
                      : <ChevronRight size={16} color="#9CA3AF" strokeWidth={2} />
                    }
                  </Pressable>

                  {/* Expanded */}
                  {isExpanded && (
                    <View style={{ backgroundColor: '#FAFAFA', borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingVertical: 6, paddingHorizontal: 12 }}>
                      {/* All meals for cuisine */}
                      <Pressable
                        onPress={() => handleSelectMeal(item.id, 'All')}
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 8, borderRadius: 10, backgroundColor: isCuisineSelected && selectedMealType === 'All' ? '#F0FDF9' : 'transparent', marginBottom: 2 }}
                      >
                        <Text style={{ fontSize: 13, fontWeight: '600', color: isCuisineSelected && selectedMealType === 'All' ? '#0D9488' : '#4B5563' }}>
                          All {item.name}
                        </Text>
                        {isCuisineSelected && selectedMealType === 'All' && (
                          <Check size={14} color="#0D9488" strokeWidth={2.5} />
                        )}
                      </Pressable>

                      {/* Meal types */}
                      {item.meals.map((meal) => {
                        const isMealSelected = isCuisineSelected && selectedMealType === meal.name;
                        return (
                          <Pressable
                            key={meal.id}
                            onPress={() => handleSelectMeal(item.id, meal.name)}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 8, borderRadius: 10, backgroundColor: isMealSelected ? '#F0FDF9' : 'transparent', marginBottom: 2 }}
                          >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{ fontSize: 15, marginRight: 8 }}>{meal.icon}</Text>
                              <Text style={{ fontSize: 12, fontWeight: isMealSelected ? '700' : '500', color: isMealSelected ? '#0D9488' : '#4B5563' }}>
                                {meal.label}
                              </Text>
                            </View>
                            {isMealSelected && (
                              <Check size={14} color="#0D9488" strokeWidth={2.5} />
                            )}
                          </Pressable>
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            })}

            <View style={{ height: 20 }} />
          </ScrollView>

          {/* Footer */}
          <View style={{ paddingHorizontal: 16, paddingVertical: 14, borderTopWidth: 1, borderTopColor: '#F3F4F6' }}>
            <Text style={{ fontSize: 11, color: '#9CA3AF', textAlign: 'center', fontWeight: '500' }}>
              Mealify — Offline Recipe Finder
            </Text>
          </View>
        </SafeAreaView>

        {/* Backdrop */}
        <Pressable style={{ flex: 1 }} onPress={onClose} />
      </View>
    </Modal>
  );
}
