import React, { useState } from 'react';
import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';
import { Recipe } from '../../types/recipe';
import { Clock, Heart, ChefHat } from 'lucide-react-native';
import { getRecipeImageSource } from '../../constants/recipeImages';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onPress: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = React.memo(function RecipeCard({
  recipe,
  isFavorite,
  onPress,
  onToggleFavorite,
}) {
  const [imgError, setImgError] = useState(false);
  const totalTime = recipe.prepTime + recipe.cookTime;
  const imageSource = !imgError ? getRecipeImageSource(recipe.id, recipe.imageUrl) : null;
  const hasImage = Boolean(imageSource);

  return (
    <Pressable
      onPress={() => onPress(recipe.id)}
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      {/* Image / Placeholder */}
      <View style={{ width: '100%', aspectRatio: 1, backgroundColor: '#F0FDF9', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {hasImage ? (
          <Image
            source={imageSource}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
            transition={200}
            onError={() => setImgError(true)}
          />
        ) : (
          <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', backgroundColor: '#F0FDF9' }}>
            <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: '#CCFBF1', alignItems: 'center', justifyContent: 'center' }}>
              <ChefHat size={22} color="#0D9488" strokeWidth={1.75} />
            </View>
          </View>
        )}

        {/* Heart Button */}
        <Pressable
          onPress={() => onToggleFavorite(recipe.id)}
          style={{ position: 'absolute', top: 8, right: 8, width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
        >
          <Heart
            size={15}
            color={isFavorite ? '#EF4444' : '#9CA3AF'}
            fill={isFavorite ? '#EF4444' : 'transparent'}
            strokeWidth={2}
          />
        </Pressable>

        {/* Match badge */}
        {recipe.matchCount !== undefined && recipe.totalIngredients !== undefined && (
          <View style={{ position: 'absolute', bottom: 8, left: 8, backgroundColor: '#0D9488', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 }}>
            <Text style={{ fontSize: 9, fontWeight: '700', color: '#FFFFFF' }}>
              {recipe.matchCount}/{recipe.totalIngredients} match
            </Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 13, fontWeight: '700', color: '#111827', marginBottom: 6, lineHeight: 17 }} numberOfLines={2}>
          {recipe.title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          {recipe.calories ? (
            <Text style={{ fontSize: 11, color: '#6B7280', fontWeight: '500' }}>
              🔥 {recipe.calories} kcal
            </Text>
          ) : (
            <View />
          )}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Clock size={10} color="#9CA3AF" strokeWidth={2} />
            <Text style={{ fontSize: 11, color: '#9CA3AF', fontWeight: '500', marginLeft: 3 }}>
              {totalTime} min
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
});
