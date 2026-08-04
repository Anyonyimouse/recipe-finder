import React from 'react';
import { View, Text, ScrollView, Pressable, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { X, ChevronDown, ChevronRight, Check } from 'lucide-react-native';
import { COUNTRY_CUISINES } from '../../types';

interface CuisineSidebarDrawerProps {
  visible: boolean;
  onClose: () => void;
  selectedCountry: string;
  selectedMealType: string;
  onSelectAll: () => void;
  onSelectCountryMeal: (country: string, meal: string) => void;
  expandedCountry: string;
  setExpandedCountry: (c: string) => void;
}

export function CuisineSidebarDrawer({
  visible,
  onClose,
  selectedCountry,
  selectedMealType,
  onSelectAll,
  onSelectCountryMeal,
  expandedCountry,
  setExpandedCountry,
}: CuisineSidebarDrawerProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' }}
      >
        <SafeAreaView
          style={{
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            maxHeight: '85%',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 16,
              paddingBottom: 14,
              borderBottomWidth: 1,
              borderBottomColor: '#F3F4F6',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827' }}>
                Countries & Cuisines
              </Text>
              <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>
                Select a country to filter recipes
              </Text>
            </View>
            <Pressable
              onPress={onClose}
              style={{
                width: 34, height: 34, borderRadius: 17,
                backgroundColor: '#F3F4F6',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <X size={16} color="#374151" strokeWidth={2.5} />
            </Pressable>
          </View>

          {/* Scrollable list */}
          <ScrollView
            style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 }}
          >
            {/* All Cuisines option */}
            <Pressable
              onPress={onSelectAll}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 14,
                borderRadius: 12,
                backgroundColor:
                  selectedCountry === 'All' && selectedMealType === 'All' ? '#F0FDF9' : '#F9FAFB',
                borderWidth: 1,
                borderColor:
                  selectedCountry === 'All' && selectedMealType === 'All' ? '#99F6E4' : '#F3F4F6',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, marginRight: 10 }}>🍽️</Text>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 14,
                    color:
                      selectedCountry === 'All' && selectedMealType === 'All'
                        ? '#0D9488'
                        : '#374151',
                  }}
                >
                  All Countries & Cuisines
                </Text>
              </View>
              {selectedCountry === 'All' && selectedMealType === 'All' && (
                <View
                  style={{
                    width: 20, height: 20, borderRadius: 10,
                    backgroundColor: '#0D9488',
                    alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Check size={12} color="#FFFFFF" strokeWidth={3} />
                </View>
              )}
            </Pressable>

            {/* Country accordion list */}
            {COUNTRY_CUISINES.map((item) => {
              const isExpanded = expandedCountry === item.country;
              const isSelectedCountry = selectedCountry === item.country;

              return (
                <View
                  key={item.country}
                  style={{
                    marginBottom: 8,
                    borderRadius: 14,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: isSelectedCountry ? '#99F6E4' : '#F3F4F6',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  {/* Country row */}
                  <Pressable
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                      setExpandedCountry(isExpanded ? '' : item.country);
                    }}
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 14,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: isSelectedCountry ? '#F0FDF9' : '#FFFFFF',
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontSize: 18, marginRight: 10 }}>{item.flag}</Text>
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: 14,
                          color: isSelectedCountry ? '#0D9488' : '#374151',
                        }}
                      >
                        {item.country} Cuisine
                      </Text>
                    </View>
                    {isExpanded ? (
                      <ChevronDown size={18} color={isSelectedCountry ? '#0D9488' : '#6B7280'} />
                    ) : (
                      <ChevronRight size={18} color={isSelectedCountry ? '#0D9488' : '#6B7280'} />
                    )}
                  </Pressable>

                  {/* Meal type sub-list */}
                  {isExpanded && (
                    <View
                      style={{
                        backgroundColor: '#FAFAFA',
                        borderTopWidth: 1,
                        borderTopColor: '#F3F4F6',
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                      }}
                    >
                      {item.meals.map((meal) => {
                        const isMealSelected =
                          selectedCountry === item.country && selectedMealType === meal;
                        return (
                          <Pressable
                            key={meal}
                            onPress={() => onSelectCountryMeal(item.country, meal)}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              paddingVertical: 10,
                              paddingHorizontal: 10,
                              borderRadius: 10,
                              backgroundColor: isMealSelected ? '#F0FDF9' : 'transparent',
                              marginBottom: 2,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 13,
                                fontWeight: isMealSelected ? '700' : '600',
                                color: isMealSelected ? '#0D9488' : '#4B5563',
                              }}
                            >
                              {meal === 'All' ? `All ${item.country} Meals` : meal}
                            </Text>
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
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
}
