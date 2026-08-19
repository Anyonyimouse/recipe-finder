import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

interface WeekDay {
  isoString: string;
  dayName: string;
  dayNum: number;
}

interface MealPlanCalendarHeaderProps {
  weekDays: WeekDay[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export const MealPlanCalendarHeader: React.FC<MealPlanCalendarHeaderProps> = ({
  weekDays,
  selectedDate,
  onSelectDate,
}) => {
  return (
    <View style={{ backgroundColor: '#FFFFFF', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}
      >
        {weekDays.map((d) => {
          const isSelected = selectedDate === d.isoString;
          return (
            <Pressable
              key={d.isoString}
              onPress={() => {
                Haptics.selectionAsync().catch(() => {});
                onSelectDate(d.isoString);
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
                minHeight: 48,
                minWidth: 48,
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
                  color: isSelected ? '#FFFFFF' : '#111827',
                }}
              >
                {d.dayNum}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};
