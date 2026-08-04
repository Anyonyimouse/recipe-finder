import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Ingredient } from '../../types/ingredient';
import * as Haptics from 'expo-haptics';
import { Check } from 'lucide-react-native';

const FALLBACK_ING_IMAGE = 'https://www.themealdb.com/images/ingredients/Garlic.png';

interface IngredientChipProps {
  ingredient: Ingredient;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const IngredientChip: React.FC<IngredientChipProps> = React.memo(
  ({ ingredient, isSelected, onToggle }) => {
    const [imgUri, setImgUri] = useState(ingredient.imageUrl || FALLBACK_ING_IMAGE);

    const handlePress = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      onToggle(ingredient.id);
    };

    return (
      <Pressable
        onPress={handlePress}
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 10,
          borderRadius: 14,
          borderWidth: 1.5,
          borderColor: isSelected ? '#0D9488' : '#E5E7EB',
          backgroundColor: isSelected ? '#F0FDF9' : '#FFFFFF',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: isSelected ? 0.06 : 0.04,
          shadowRadius: 3,
          elevation: isSelected ? 2 : 1,
        }}
      >
        <View style={{ width: 32, height: 32, borderRadius: 10, overflow: 'hidden', marginRight: 10, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#F3F4F6' }}>
          <Image
            source={{ uri: imgUri }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
            transition={150}
            onError={() => setImgUri(FALLBACK_ING_IMAGE)}
          />
        </View>
        <Text
          style={{ fontSize: 12, fontWeight: '600', flex: 1, color: isSelected ? '#0D9488' : '#374151' }}
          numberOfLines={1}
        >
          {ingredient.name}
        </Text>
        {isSelected && (
          <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: '#0D9488', alignItems: 'center', justifyContent: 'center', marginLeft: 4 }}>
            <Check size={11} color="#FFFFFF" strokeWidth={3} />
          </View>
        )}
      </Pressable>
    );
  }
);

IngredientChip.displayName = 'IngredientChip';
