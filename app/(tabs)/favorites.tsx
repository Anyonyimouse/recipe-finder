import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Trash2 } from 'lucide-react-native';
import { useFavorites } from '../../src/features/favorite/presentation/hooks/useFavorites';
import { SQLiteRecipeRepository } from '../../src/features/recipe/data/repositories/SQLiteRecipeRepository';
import { RecipeCard } from '../../src/components/ui/RecipeCard';
import { Recipe } from '../../src/types/recipe';

const recipeRepo = new SQLiteRecipeRepository();

export default function FavoritesScreen() {
  const router = useRouter();
  const { favoriteIds, toggleFavorite, isFavorite, clearAllFavorites } = useFavorites();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      setIsLoading(true);
      try {
        const recipes = await recipeRepo.getFavoritesByIds(favoriteIds);
        setFavoriteRecipes(recipes);
      } catch {
        // Safe offline error handle
      } finally {
        setIsLoading(false);
      }
    }
    loadFavorites();
  }, [favoriteIds]);

  function handleUnfavoriteAll() {
    Alert.alert(
      'Remove All Favorites',
      'Are you sure you want to remove all favorites? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove All',
          style: 'destructive',
          onPress: () => clearAllFavorites(),
        },
      ]
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 8,
        }}
      >
        

        {favoriteRecipes.length > 0 && (
          <TouchableOpacity
            onPress={handleUnfavoriteAll}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: 12,
              paddingVertical: 7,
              borderRadius: 20,
              backgroundColor: '#FEF2F2',
            }}
          >
            <Trash2 size={14} color="#EF4444" strokeWidth={2} />
            <Text style={{ fontSize: 13, fontWeight: '600', color: '#EF4444' }}>Unfavorite All</Text>
          </TouchableOpacity>
        )}
      </View>

      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0D9488" />
          <Text style={{ color: '#9CA3AF', fontSize: 13, fontWeight: '500', marginTop: 10 }}>Loading favorites...</Text>
        </View>
      ) : (
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
                onPress={(id) =>
                  router.push({ pathname: '/recipe/[id]', params: { id } } as any)
                }
                onToggleFavorite={toggleFavorite}
              />
            </View>
          )}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 60 }}>
              <View style={{ width: 72, height: 72, borderRadius: 24, backgroundColor: '#FEF2F2', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Heart size={32} color="#EF4444" strokeWidth={1.75} />
              </View>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 6 }}>
                No Favorites Yet
              </Text>
              <Text style={{ fontSize: 13, color: '#9CA3AF', textAlign: 'center', paddingHorizontal: 32, lineHeight: 20 }}>
                Tap the heart icon on any recipe to save it for quick offline access.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
