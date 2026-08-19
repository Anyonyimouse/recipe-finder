import * as Haptics from 'expo-haptics';
import {
  Heart,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react-native';
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  LayoutAnimation,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { useShoppingList } from '../../src/features/shopping_list/presentation/hooks/useShoppingList';
import { ShoppingListItem } from '../../src/types/shopping_list';
import { useFavorites } from '../../src/features/favorite/presentation/hooks/useFavorites';
import { recipeRepository } from '../../src/features/recipe/di/RecipeContainer';
import { ShoppingListCard } from '../../src/features/shopping_list/presentation/components/ShoppingListCard';
import { CategoryModal } from '../../src/features/shopping_list/presentation/components/CategoryModal';
import { FavoriteRecipeList } from '../../src/features/favorite/presentation/components/FavoriteRecipeList';
import { Recipe } from '../../src/types/recipe';

export default function ShoppingListScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'list' | 'favorites'>('list');

  // ── Shopping List state ─────────────────────────────────────────────────
  const { items, isLoading, addItem, toggleItem, clearChecked, deleteCategories, reload } = useShoppingList();
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('1');
  const [activeModalCategory, setActiveModalCategory] = useState<string | null>(null);
  const [modalItemName, setModalItemName] = useState('');
  const [pinnedCategories, setPinnedCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // ── Favorites state ─────────────────────────────────────────────────────
  const { favoriteIds, toggleFavorite, isFavorite, clearAllFavorites } = useFavorites();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [favLoading, setFavLoading] = useState(false);

  const loadFavorites = useCallback(async () => {
    setFavLoading(true);
    try {
      const recipes = await recipeRepository.getFavoritesByIds(favoriteIds);
      setFavoriteRecipes(recipes);
    } catch {
      // safe fallback
    } finally {
      setFavLoading(false);
    }
  }, [favoriteIds]);

  useEffect(() => { loadFavorites(); }, [loadFavorites]);

  useFocusEffect(
    React.useCallback(() => {
      reload();
      loadFavorites();
    }, [reload, loadFavorites])
  );

  function handleUnfavoriteAll() {
    Alert.alert(
      'Remove All Favorites',
      'Are you sure you want to remove all favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove All', style: 'destructive', onPress: () => clearAllFavorites() },
      ]
    );
  }

  const handleAddItem = async () => {
    if (!newItemName.trim()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    await addItem(newItemName.trim(), parseFloat(newItemQty) || 1, '', 'General');
    setNewItemName('');
    setNewItemQty('1');
  };

  const handleAddModalItem = async () => {
    if (!modalItemName.trim() || !activeModalCategory) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    await addItem(modalItemName.trim(), 1, '', activeModalCategory);
    setModalItemName('');
  };

  const togglePinCategory = (category: string, e: any) => {
    e.stopPropagation();
    Haptics.selectionAsync().catch(() => {});
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setPinnedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleLongPressCard = (category: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsSelectionMode(true);
    setSelectedCategories([category]);
  };

  const toggleSelectCard = (category: string) => {
    Haptics.selectionAsync().catch(() => {});
    setSelectedCategories((prev) => {
      const next = prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category];
      if (next.length === 0) setIsSelectionMode(false);
      return next;
    });
  };

  const handleDeleteSelected = async () => {
    if (selectedCategories.length === 0) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    await deleteCategories(selectedCategories);
    setSelectedCategories([]);
    setIsSelectionMode(false);
  };

  const handleDeleteSingleCategory = async (category: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    await deleteCategories([category]);
    setActiveModalCategory(null);
  };

  const checkedCount = useMemo(() => items.filter((i) => i.isChecked).length, [items]);

  const groupedItemsMap = useMemo(() => {
    const groups: Record<string, ShoppingListItem[]> = {};
    for (const item of items) {
      const cat = item.category || 'General';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    }
    return groups;
  }, [items]);

  const groupedItems = useMemo(() => {
    const entries = Object.entries(groupedItemsMap);
    return entries.sort((a, b) => {
      const aPinned = pinnedCategories.includes(a[0]);
      const bPinned = pinnedCategories.includes(b[0]);
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
      return 0;
    });
  }, [groupedItemsMap, pinnedCategories]);

  const modalItems = activeModalCategory ? groupedItemsMap[activeModalCategory] || [] : [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View style={{ backgroundColor: '#F9FAFB', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
        {isSelectionMode ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Pressable
                onPress={() => {
                  setIsSelectionMode(false);
                  setSelectedCategories([]);
                }}
                style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} color="#374151" strokeWidth={2.5} />
              </Pressable>
              <Text style={{ fontSize: 18, fontWeight: '900', color: '#0F172A' }}>
                {selectedCategories.length} Card{selectedCategories.length > 1 ? 's' : ''} Selected
              </Text>
            </View>
            <Pressable
              onPress={handleDeleteSelected}
              style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#DC2626', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 50, gap: 6 }}
            >
              <Trash2 size={14} color="#FFFFFF" strokeWidth={2.5} />
              <Text style={{ fontSize: 12, fontWeight: '800', color: '#FFFFFF' }}>Delete Selected</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <View>
              <Text style={{ fontSize: 24, fontWeight: '900', color: '#0F172A', letterSpacing: -0.5 }}>
                {activeTab === 'list' ? 'Shopping List' : 'Favorites'}
              </Text>
              <Text style={{ fontSize: 12, color: '#6B7280', fontWeight: '500', marginTop: 1 }}>
                {activeTab === 'list'
                  ? (items.length > 0 ? `${checkedCount} of ${items.length} items checked` : 'Your list is empty')
                  : `${favoriteRecipes.length} saved recipe${favoriteRecipes.length !== 1 ? 's' : ''}`
                }
              </Text>
            </View>
            {activeTab === 'list' && checkedCount > 0 && (
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
                  clearChecked();
                }}
                style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FECACA', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 50, gap: 4 }}
              >
                <Trash2 size={13} color="#EF4444" strokeWidth={2} />
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#EF4444' }}>Clear Checked</Text>
              </Pressable>
            )}
            {activeTab === 'favorites' && favoriteRecipes.length > 0 && (
              <Pressable
                onPress={handleUnfavoriteAll}
                style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FECACA', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 50, gap: 4 }}
              >
                <Trash2 size={13} color="#EF4444" strokeWidth={2} />
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#EF4444' }}>Remove All</Text>
              </Pressable>
            )}
          </>
        )}
      </View>

      {/* Segmented Tab Switcher */}
      {!isSelectionMode && (
        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 12, marginBottom: 4, backgroundColor: '#F3F4F6', borderRadius: 14, padding: 3 }}>
          <Pressable
            onPress={() => setActiveTab('list')}
            style={{ flex: 1, paddingVertical: 8, borderRadius: 11, backgroundColor: activeTab === 'list' ? '#FFFFFF' : 'transparent', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6, shadowColor: activeTab === 'list' ? '#000' : 'transparent', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: activeTab === 'list' ? 2 : 0 }}
          >
            <ShoppingBag size={14} color={activeTab === 'list' ? '#0D9488' : '#9CA3AF'} strokeWidth={2.5} />
            <Text style={{ fontSize: 13, fontWeight: '700', color: activeTab === 'list' ? '#0D9488' : '#9CA3AF' }}>Shopping List</Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('favorites')}
            style={{ flex: 1, paddingVertical: 8, borderRadius: 11, backgroundColor: activeTab === 'favorites' ? '#FFFFFF' : 'transparent', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6, shadowColor: activeTab === 'favorites' ? '#000' : 'transparent', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: activeTab === 'favorites' ? 2 : 0 }}
          >
            <Heart size={14} color={activeTab === 'favorites' ? '#EF4444' : '#9CA3AF'} strokeWidth={2.5} fill={activeTab === 'favorites' ? '#EF4444' : 'transparent'} />
            <Text style={{ fontSize: 13, fontWeight: '700', color: activeTab === 'favorites' ? '#EF4444' : '#9CA3AF' }}>Favorites</Text>
            {favoriteRecipes.length > 0 && (
              <View style={{ backgroundColor: activeTab === 'favorites' ? '#EF4444' : '#D1D5DB', borderRadius: 8, paddingHorizontal: 5, paddingVertical: 1 }}>
                <Text style={{ fontSize: 10, fontWeight: '800', color: '#FFFFFF' }}>{favoriteRecipes.length}</Text>
              </View>
            )}
          </Pressable>
        </View>
      )}

      {/* Add Item Bar — only for Shopping List tab */}
      {!isSelectionMode && activeTab === 'list' && (
        <View style={{ padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F3F4F6', flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <TextInput
            placeholder="Add extra item (e.g. Garlic)..."
            placeholderTextColor="#9CA3AF"
            value={newItemName}
            onChangeText={setNewItemName}
            style={{ flex: 1, backgroundColor: '#F3F4F6', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, color: '#111827', fontWeight: '500' }}
          />
          <TextInput
            placeholder="Qty"
            placeholderTextColor="#9CA3AF"
            value={newItemQty}
            onChangeText={setNewItemQty}
            keyboardType="numeric"
            style={{ width: 56, backgroundColor: '#F3F4F6', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 10, fontSize: 14, color: '#111827', textAlign: 'center', fontWeight: '500' }}
          />
          <Pressable
            onPress={handleAddItem}
            style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#0D9488', alignItems: 'center', justifyContent: 'center' }}
          >
            <Plus size={20} color="#FFFFFF" strokeWidth={2.5} />
          </Pressable>
        </View>
      )}

      {/* Favorites Content */}
      {activeTab === 'favorites' && (
        <FavoriteRecipeList
          favoriteRecipes={favoriteRecipes}
          isLoading={favLoading}
          isFavorite={isFavorite}
          onSelectRecipe={(id) => router.push({ pathname: '/recipe/[id]', params: { id } } as any)}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {/* Shopping List Content */}
      {activeTab === 'list' && (isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0D9488" />
        </View>
      ) : items.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
          <View style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <ShoppingBag size={28} color="#9CA3AF" strokeWidth={1.5} />
          </View>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#374151', marginBottom: 4 }}>Your Cart is Empty</Text>
          <Text style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'center', lineHeight: 20 }}>
            Add ingredients from your favorite recipes or type them above to build your grocery list.
          </Text>
        </View>
      ) : (
        <FlatList
          data={groupedItems}
          keyExtractor={(item) => item[0]}
          numColumns={2}
          columnWrapperStyle={{ gap: 10 }}
          contentContainerStyle={{ paddingHorizontal: 14, paddingTop: 14, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: [category, groupItems], index }) => (
            <ShoppingListCard
              category={category}
              items={groupItems}
              index={index}
              isPinned={pinnedCategories.includes(category)}
              isSelected={selectedCategories.includes(category)}
              isSelectionMode={isSelectionMode}
              onLongPress={() => handleLongPressCard(category)}
              onPressCard={() => {
                if (isSelectionMode) {
                  toggleSelectCard(category);
                } else {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                  setActiveModalCategory(category);
                }
              }}
              onToggleSelect={() => toggleSelectCard(category)}
              onTogglePin={(e) => togglePinCategory(category, e)}
              onToggleItem={toggleItem}
            />
          )}
        />
      ))}

      {/* Category Modal */}
      <CategoryModal
        category={activeModalCategory}
        items={modalItems}
        modalItemName={modalItemName}
        onClose={() => setActiveModalCategory(null)}
        onDeleteCategory={handleDeleteSingleCategory}
        onAddItem={handleAddModalItem}
        onChangeItemName={setModalItemName}
        onToggleItem={toggleItem}
      />
    </SafeAreaView>
  );
}
