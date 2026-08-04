import React from 'react';
import { View, Text, ScrollView, Pressable, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { ChefHat } from 'lucide-react-native';
import { OnlineRecipe } from '../../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const FEATURED_CARD_WIDTH = Math.min(SCREEN_WIDTH * 0.72, 280);

interface FeaturedCarouselProps {
  recipes: OnlineRecipe[];
  onPress: (recipe: OnlineRecipe) => void;
}

export function FeaturedCarousel({ recipes, onPress }: FeaturedCarouselProps) {
  if (recipes.length === 0) return null;

  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '800',
          color: '#111827',
          marginHorizontal: 4,
          marginBottom: 14,
        }}
      >
        Featured
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 4, paddingRight: 16, gap: 12 }}
      >
        {recipes.map((recipe) => (
          <Pressable
            key={recipe.idMeal}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
              onPress(recipe);
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
            {/* Hero image */}
            <Image
              source={{ uri: recipe.strMealThumb }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
              contentFit="cover"
              transition={200}
            />

            {/* Dark overlay */}
            <View
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.38)',
              }}
            />

            {/* Card content */}
            <View style={{ flex: 1, padding: 16, justifyContent: 'space-between', zIndex: 2 }}>
              <View
                style={{
                  width: 36, height: 36, borderRadius: 12,
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <ChefHat size={18} color="#FFFFFF" strokeWidth={2} />
              </View>

              <View>
                <Text
                  style={{ fontSize: 16, fontWeight: '800', color: '#FFFFFF', marginBottom: 6, lineHeight: 20 }}
                  numberOfLines={2}
                >
                  {recipe.strMeal}
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.35)',
                      borderRadius: 12,
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                    }}
                  >
                    <Text style={{ fontSize: 11, color: '#FFFFFF', fontWeight: '600' }}>
                      🌐 {recipe.strArea}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 11, color: '#F0FDF9', fontWeight: '600' }}>
                    {recipe.strCategory}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
