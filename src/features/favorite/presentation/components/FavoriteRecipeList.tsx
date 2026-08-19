import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Heart } from 'lucide-react-native';
import { Recipe } from '../../../../types/recipe';
import { RecipeCard } from '../../../../components/ui/RecipeCard';

interface FavoriteRecipeListProps {
  favoriteRecipes: Recipe[];
  isLoading: boolean;
  isFavorite: (id: string) => boolean;
  onSelectRecipe: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export const FavoriteRecipeList: React.FC<FavoriteRecipeListProps> = ({
  favoriteRecipes,
  isLoading,
  isFavorite,
  onSelectRecipe,
  onToggleFavorite,
}) => {
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#EF4444" />
        <Text style={{ color: '#9CA3AF', fontSize: 13, marginTop: 10 }}>Loading favorites...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favoriteRecipes}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      columnWrapperStyle={{ gap: 12 }}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={{ flex: 1 }}>
          <RecipeCard
            recipe={item}
            isFavorite={isFavorite(item.id)}
            onPress={onSelectRecipe}
            onToggleFavorite={onToggleFavorite}
          />
        </View>
      )}
      ListEmptyComponent={
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 60 }}>
          <View style={{ width: 72, height: 72, borderRadius: 24, backgroundColor: '#FEF2F2', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Heart size={32} color="#EF4444" strokeWidth={1.75} />
          </View>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 6 }}>No Favorites Yet</Text>
          <Text style={{ fontSize: 13, color: '#9CA3AF', textAlign: 'center', paddingHorizontal: 32, lineHeight: 20 }}>
            Download a recipe from Browse to save it for quick offline access.
          </Text>
        </View>
      }
    />
  );
};
