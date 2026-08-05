import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { RecipeCard } from '../../src/components/ui/RecipeCard';
import { useBrowseRecipes } from '../../src/features/browse/presentation/hooks/useBrowseRecipes';
import { toRecipeObject } from '../../src/features/browse/utils';
import { BrowseHeader } from '../../src/features/browse/presentation/components/BrowseHeader';
import { FeaturedCarousel } from '../../src/features/browse/presentation/components/FeaturedCarousel';
import { CategoryPillBar } from '../../src/features/browse/presentation/components/CategoryPillBar';
import { CuisineSidebarDrawer } from '../../src/features/browse/presentation/components/CuisineSidebarDrawer';
import { RecipeDetailModal } from '../../src/features/browse/presentation/components/RecipeDetailModal';

export default function BrowseScreen() {
  const {
    searchQuery, setSearchQuery,
    selectedCountry, selectedMealType,
    showSearch, setShowSearch,
    recipes, isLoading,
    selectedRecipe,
    downloadedIds, isDownloading,
    detailTab, setDetailTab,
    targetServings, setTargetServings,
    isSidebarOpen, setIsSidebarOpen,
    expandedCountry, setExpandedCountry,
    featuredRecipes, popularRecipes,
    isFavorite, toggleFavorite,
    handleSearchSubmit,
    handleSelectCategory,
    handleSelectCountryMeal,
    handleSelectAllCuisines,
    handleDownloadRecipe,
    openRecipe,
    closeRecipe,
  } = useBrowseRecipes();

  const hasFilter = selectedCountry !== 'All' || selectedMealType !== 'All';
  const filterLabel = `Filtered by: ${selectedCountry !== 'All' ? selectedCountry : ''} ${selectedMealType !== 'All' ? `(${selectedMealType})` : ''}`.trim();
  const showDefaultLayout = !searchQuery && !hasFilter;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header: search bar + filter badge + sidebar toggle */}
      <BrowseHeader
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSubmitSearch={handleSearchSubmit}
        onClearSearch={() => {
          setSearchQuery('');
        }}
        hasFilter={hasFilter}
        filterLabel={filterLabel}
        onClearFilter={handleSelectAllCuisines}
        onOpenSidebar={() => setIsSidebarOpen(true)}
      />

      {/* Loading indicator */}
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0D9488" />
          <Text style={{ color: '#9CA3AF', fontSize: 13, fontWeight: '500', marginTop: 10 }}>
            Loading recipes...
          </Text>
        </View>
      ) : (
        <FlatList
          data={showDefaultLayout ? popularRecipes : recipes}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 110 }}
          columnWrapperStyle={{ gap: 12 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            showDefaultLayout ? (
              <View>
                <FeaturedCarousel recipes={featuredRecipes} onPress={openRecipe} />
                <CategoryPillBar
                  selectedMealType={selectedMealType}
                  selectedCountry={selectedCountry}
                  onSelectCategory={handleSelectCategory}
                  onOpenSidebar={() => setIsSidebarOpen(true)}
                />
                {/* Popular Recipes header */}
                <View
                  style={{
                    flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: 4, marginBottom: 12,
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: '800', color: '#111827' }}>
                    Popular Recipes
                  </Text>
                  <View
                    style={{
                      backgroundColor: '#F0FDF9', borderWidth: 1,
                      borderColor: '#99F6E4', borderRadius: 12,
                      paddingHorizontal: 8, paddingVertical: 2,
                    }}
                  >
                    <Text style={{ fontSize: 11, color: '#0D9488', fontWeight: '700' }}>
                      {recipes.length} recipes
                    </Text>
                  </View>
                </View>
              </View>
            ) : null
          }
          renderItem={({ item }) => {
            const recipeObj = toRecipeObject(item);
            const favKey = `online-${item.idMeal}`;
            const isItemDownloaded = Boolean(downloadedIds[item.idMeal]) && isFavorite(favKey);
            const isItemDownloading = isDownloading;

            return (
              <RecipeCard
                recipe={recipeObj}
                isFavorite={isFavorite(favKey)}
                actionIcon="download"
                isDownloaded={isItemDownloaded}
                isDownloading={isItemDownloading}
                onDownload={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
                  handleDownloadRecipe(item);
                }}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                  openRecipe(item);
                }}
                onToggleFavorite={() => {
                  Haptics.selectionAsync().catch(() => {});
                  toggleFavorite(favKey, item.strMeal, item.strMealThumb);
                }}
              />
            );
          }}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 60, paddingHorizontal: 24 }}>
              <Text style={{ fontSize: 16, fontWeight: '800', color: '#111827', marginBottom: 6 }}>
                No Recipes Found
              </Text>
              <Text style={{ fontSize: 13, color: '#9CA3AF', textAlign: 'center', lineHeight: 18 }}>
                Try searching for another dish or selecting a country from the sidebar.
              </Text>
            </View>
          }
        />
      )}

      {/* Countries & Cuisines bottom-sheet */}
      <CuisineSidebarDrawer
        visible={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        selectedCountry={selectedCountry}
        selectedMealType={selectedMealType}
        onSelectAll={handleSelectAllCuisines}
        onSelectCountryMeal={handleSelectCountryMeal}
        expandedCountry={expandedCountry}
        setExpandedCountry={setExpandedCountry}
      />

      {/* Recipe Detail full-screen modal */}
      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={closeRecipe}
          downloadedIds={downloadedIds}
          isDownloading={isDownloading}
          onDownload={handleDownloadRecipe}
          detailTab={detailTab}
          setDetailTab={setDetailTab}
          targetServings={targetServings}
          setTargetServings={setTargetServings}
        />
      )}
    </SafeAreaView>
  );
}
