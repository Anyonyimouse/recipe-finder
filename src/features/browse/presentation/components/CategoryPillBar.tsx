import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { AlignJustify } from 'lucide-react-native';
import { CATEGORY_TAGS } from '../../types';

interface CategoryPillBarProps {
  selectedMealType: string;
  selectedCountry: string;
  onSelectCategory: (cat: string) => void;
  onOpenSidebar: () => void;
}

export function CategoryPillBar({
  selectedMealType,
  selectedCountry,
  onSelectCategory,
  onOpenSidebar,
}: CategoryPillBarProps) {
  return (
    <View style={{ marginBottom: 20 }}>
      {/* Section header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 4,
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '800', color: '#111827' }}>Category</Text>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
            onOpenSidebar();
          }}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
        >
          <Text style={{ fontSize: 13, fontWeight: '700', color: '#0D9488' }}>
            {selectedCountry !== 'All' ? selectedCountry : 'Cuisines'}
          </Text>
          <AlignJustify size={14} color="#0D9488" strokeWidth={2.5} />
        </Pressable>
      </View>

      {/* Pill row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 4, paddingRight: 16, gap: 8 }}
      >
        {CATEGORY_TAGS.map((type) => {
          const isSelected = selectedMealType === type;
          return (
            <Pressable
              key={type}
              onPress={() => onSelectCategory(type)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 50,
                backgroundColor: isSelected ? '#0D9488' : '#FFFFFF',
                borderWidth: 1,
                borderColor: isSelected ? '#0D9488' : '#E5E7EB',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: isSelected ? '700' : '600',
                  color: isSelected ? '#FFFFFF' : '#4B5563',
                }}
              >
                {type}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
