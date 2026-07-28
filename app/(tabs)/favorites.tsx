import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart } from 'lucide-react-native';
import { useFavorites } from '../../src/features/favorite/presentation/hooks/useFavorites';
import { SQLiteRecipeRepository } from '../../src/features/recipe/data/repositories/SQLiteRecipeRepository';
import { RecipeCard } from '../../src/components/ui/RecipeCard';
import { Recipe } from '../../src/types/recipe';

const recipeRepo = new SQLiteRecipeRepository();

export default function FavoritesScreen() {
  const router = useRouter();
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites();
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', backgroundColor: '#FFFFFF' }}>
        <Text style={{ fontSize: 26, fontWeight: '800', color: '#111827', letterSpacing: -0.5 }}>
          Favorites
        </Text>
        <Text style={{ fontSize: 13, color: '#9CA3AF', marginTop: 2 }}>
          Your saved recipes for offline cooking
        </Text>
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
