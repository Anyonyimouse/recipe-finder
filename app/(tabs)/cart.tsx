import * as Haptics from 'expo-haptics';
import {
  CheckSquare,
  ChevronDown,
  ChevronUp,
  Pin,
  Plus,
  ShoppingBag,
  Square,
  Trash2,
  X,
  Maximize2,
  CheckCircle2,
} from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { useShoppingList } from '../../src/features/shopping_list/presentation/hooks/useShoppingList';
import { ShoppingListItem } from '../../src/types/shopping_list';

const CATEGORY_EMOJIS: Record<string, string> = {
  Produce: '🥬',
  'Meat & Seafood': '🥩',
  Dairy: '🧀',
  Spices: '🧂',
  General: '🛒',
};

// Pastel card backgrounds like Google Keep
const KEEP_BG_COLORS = [
  { bg: '#F0FDF9', border: '#CCFBF1', accent: '#0D9488' }, // Teal
  { bg: '#FEF3C7', border: '#FDE68A', accent: '#D97706' }, // Amber
  { bg: '#F0F9FF', border: '#BAE6FD', accent: '#0284C7' }, // Sky
  { bg: '#FDF2F8', border: '#FBCFE8', accent: '#DB2777' }, // Pink
  { bg: '#F3E8FF', border: '#E9D5FF', accent: '#9333EA' }, // Purple
];

export default function ShoppingListScreen() {
  const { items, isLoading, addItem, toggleItem, clearChecked, deleteCategories, reload } = useShoppingList();
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('1');

  // Modal Note View state
  const [activeModalCategory, setActiveModalCategory] = useState<string | null>(null);
  const [modalItemName, setModalItemName] = useState('');

  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [pinnedCategories, setPinnedCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      reload();
    }, [reload])
  );

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

  const toggleCardExpand = (category: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCards((prev) => ({ ...prev, [category]: !prev[category] }));
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

  // Modal active items
  const modalItems = activeModalCategory ? groupedItemsMap[activeModalCategory] || [] : [];
  const modalCheckedCount = modalItems.filter((i) => i.isChecked).length;
  const modalProgressPercent = modalItems.length > 0 ? Math.round((modalCheckedCount / modalItems.length) * 100) : 0;
  const modalEmoji = activeModalCategory ? CATEGORY_EMOJIS[activeModalCategory] || '🍲' : '🍲';

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View className="bg-gray-50 px-5 pt-3 pb-3 border-b border-black/5 flex-row items-center justify-between z-10">
        {isSelectionMode ? (
          <View className="flex-row items-center justify-between flex-1">
            <View className="flex-row items-center gap-2">
              <Pressable
                onPress={() => {
                  setIsSelectionMode(false);
                  setSelectedCategories([]);
                }}
                className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center"
              >
                <X size={16} color="#374151" strokeWidth={2.5} />
              </Pressable>
              <Text className="text-lg font-black text-slate-900">
                {selectedCategories.length} Card{selectedCategories.length > 1 ? 's' : ''} Selected
              </Text>
            </View>

            <Pressable
              onPress={handleDeleteSelected}
              className="flex-row items-center bg-red-600 px-3.5 py-1.5 rounded-full gap-1.5"
            >
              <Trash2 size={14} color="#FFFFFF" strokeWidth={2.5} />
              <Text className="text-xs font-extrabold text-white">Delete Selected</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <View>
              <Text className="text-2xl font-black text-slate-900 tracking-tight">Shopping List</Text>
              <Text className="text-xs text-gray-500 font-medium mt-0.5">
                {items.length > 0
                  ? `${checkedCount} of ${items.length} items checked`
                  : 'Your list is empty'}
              </Text>
            </View>

            {checkedCount > 0 && (
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
                  clearChecked();
                }}
                className="flex-row items-center bg-red-50 border border-red-200 px-3 py-1.5 rounded-full gap-1"
              >
                <Trash2 size={13} color="#EF4444" strokeWidth={2} />
                <Text className="text-xs font-semibold text-red-600">Clear Checked</Text>
              </Pressable>
            )}
          </>
        )}
      </View>

      {/* Add Item Bar */}
      {!isSelectionMode && (
        <View className="p-4 bg-white border-b border-gray-100 flex-row gap-2 items-center">
          <TextInput
            placeholder="Add extra item (e.g. Garlic)..."
            placeholderTextColor="#9CA3AF"
            value={newItemName}
            onChangeText={setNewItemName}
            className="flex-1 bg-gray-100 rounded-xl px-3.5 py-2.5 text-sm color-gray-900 font-medium"
          />
          <TextInput
            placeholder="Qty"
            placeholderTextColor="#9CA3AF"
            value={newItemQty}
            onChangeText={setNewItemQty}
            keyboardType="numeric"
            className="w-14 bg-gray-100 rounded-xl px-2.5 py-2.5 text-sm color-gray-900 text-center font-medium"
          />
          <Pressable
            onPress={handleAddItem}
            className="w-10 h-10 rounded-xl bg-teal-600 items-center justify-center"
          >
            <Plus size={20} color="#FFFFFF" strokeWidth={2.5} />
          </Pressable>
        </View>
      )}

      {/* Content — Google Keep Notes 2-Column Grid */}
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0D9488" />
        </View>
      ) : items.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <View className="w-16 h-16 rounded-2xl bg-gray-100 items-center justify-center mb-3">
            <ShoppingBag size={28} color="#9CA3AF" strokeWidth={1.5} />
          </View>
          <Text className="text-base font-bold text-gray-700 mb-1">Your Cart is Empty</Text>
          <Text className="text-xs text-gray-400 text-center leading-5">
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
          renderItem={({ item: [category, groupItems], index }) => {
            const emoji = CATEGORY_EMOJIS[category] || '🍲';
            const isRecipeGroup = !CATEGORY_EMOJIS[category];
            const isExpanded = Boolean(expandedCards[category]);
            const isPinned = pinnedCategories.includes(category);
            const isSelected = selectedCategories.includes(category);
            const theme = KEEP_BG_COLORS[index % KEEP_BG_COLORS.length];
            const checkedGroupCount = groupItems.filter((i) => i.isChecked).length;

            return (
              <Pressable
                onLongPress={() => handleLongPressCard(category)}
                onPress={() => {
                  if (isSelectionMode) {
                    toggleSelectCard(category);
                  } else {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                    setActiveModalCategory(category);
                  }
                }}
                style={{
                  flex: 1,
                  backgroundColor: isSelected ? '#FEE2E2' : theme.bg,
                  borderRadius: 18,
                  borderWidth: isSelected ? 2 : 1,
                  borderColor: isSelected ? '#EF4444' : isPinned ? '#0D9488' : theme.border,
                  padding: 12,
                  marginBottom: 10,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: isPinned ? 0.12 : 0.05,
                  shadowRadius: 6,
                  elevation: isPinned ? 4 : 2,
                  position: 'relative',
                }}
              >
                {/* Keep Note Card Header */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                    paddingBottom: 6,
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(0,0,0,0.06)',
                  }}
                >
                  <View style={{ flex: 1, marginRight: 4 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontSize: 15, marginRight: 4 }}>{emoji}</Text>
                      <Text
                        style={{ fontSize: 13, fontWeight: '800', color: '#111827', flex: 1 }}
                        numberOfLines={1}
                      >
                        {category}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 9, fontWeight: '700', color: theme.accent, marginTop: 1 }}>
                      {isPinned ? '📌 Pinned · ' : ''}
                      ({checkedGroupCount}/{groupItems.length})
                    </Text>
                  </View>

                  {/* Pin & Select Controls */}
                  {isSelectionMode ? (
                    <View
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 11,
                        backgroundColor: isSelected ? '#EF4444' : 'rgba(255,255,255,0.8)',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isSelected ? (
                        <CheckSquare size={14} color="#FFFFFF" strokeWidth={2.5} />
                      ) : (
                        <Square size={14} color="#9CA3AF" strokeWidth={2} />
                      )}
                    </View>
                  ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Pressable
                        onPress={(e) => togglePinCategory(category, e)}
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          backgroundColor: isPinned ? '#0D9488' : 'rgba(255,255,255,0.7)',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Pin
                          size={12}
                          color={isPinned ? '#FFFFFF' : '#6B7280'}
                          strokeWidth={2}
                        />
                      </Pressable>

                      <View
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          backgroundColor: 'rgba(255,255,255,0.7)',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Maximize2 size={12} color={theme.accent} strokeWidth={2.5} />
                      </View>
                    </View>
                  )}
                </View>

                {/* Items List Preview (3 Items) */}
                <View>
                  {groupItems.slice(0, 3).map((item) => (
                    <Pressable
                      key={item.id}
                      onPress={() => {
                        if (isSelectionMode) {
                          toggleSelectCard(category);
                        } else {
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                          toggleItem(item.id);
                        }
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: 5,
                        opacity: item.isChecked ? 0.4 : 1,
                      }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 4 }}>
                        {item.isChecked ? (
                          <CheckSquare size={15} color={theme.accent} strokeWidth={2.5} />
                        ) : (
                          <Square size={15} color="#9CA3AF" strokeWidth={2} />
                        )}
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '600',
                            color: '#374151',
                            marginLeft: 6,
                            flex: 1,
                            textDecorationLine: item.isChecked ? 'line-through' : 'none',
                          }}
                          numberOfLines={1}
                        >
                          {item.ingredientName}
                        </Text>
                      </View>

                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '800',
                          color: theme.accent,
                          backgroundColor: 'rgba(255,255,255,0.8)',
                          paddingHorizontal: 5,
                          paddingVertical: 2,
                          borderRadius: 6,
                        }}
                      >
                        {item.quantity} {item.unit}
                      </Text>
                    </Pressable>
                  ))}

                  {/* Show "+X more" button to open modal */}
                  {groupItems.length > 3 && (
                    <View style={{ paddingTop: 4, alignItems: 'center' }}>
                      <Text style={{ fontSize: 10, fontWeight: '700', color: theme.accent }}>
                        +{groupItems.length - 3} more items...
                      </Text>
                    </View>
                  )}
                </View>
              </Pressable>
            );
          }}
        />
      )}

      {/* ── Google Keep Full Note Modal ── */}
      <Modal
        visible={Boolean(activeModalCategory)}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setActiveModalCategory(null)}
      >
        <SafeAreaView className="flex-1 bg-gray-50">
          {/* Modal Header */}
          <View className="px-5 pt-3 pb-3 border-b border-gray-100 bg-white flex-row items-center justify-between">
            <View className="flex-row items-center flex-1 mr-3">
              <Text className="text-2xl mr-2">{modalEmoji}</Text>
              <View className="flex-1">
                <Text className="text-lg font-black text-gray-900" numberOfLines={1}>
                  {activeModalCategory}
                </Text>
                <Text className="text-xs text-teal-600 font-bold">
                  {modalCheckedCount} of {modalItems.length} items checked ({modalProgressPercent}%)
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-2">
              {activeModalCategory && (
                <Pressable
                  onPress={() => handleDeleteSingleCategory(activeModalCategory)}
                  className="w-9 h-9 rounded-full bg-red-50 items-center justify-center"
                >
                  <Trash2 size={16} color="#EF4444" strokeWidth={2} />
                </Pressable>
              )}
              <Pressable
                onPress={() => setActiveModalCategory(null)}
                className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
              >
                <X size={18} color="#374151" strokeWidth={2.5} />
              </Pressable>
            </View>
          </View>

          {/* Progress Bar */}
          <View className="h-1.5 bg-gray-200 w-full">
            <View
              style={{ width: `${modalProgressPercent}%` }}
              className="h-full bg-teal-600"
            />
          </View>

          {/* Add item to this note inside modal */}
          <View className="p-4 bg-white border-b border-gray-100 flex-row gap-2 items-center">
            <TextInput
              placeholder={`Add ingredient to ${activeModalCategory}...`}
              placeholderTextColor="#9CA3AF"
              value={modalItemName}
              onChangeText={setModalItemName}
              className="flex-1 bg-gray-100 rounded-xl px-3.5 py-2.5 text-sm color-gray-900 font-medium"
            />
            <Pressable
              onPress={handleAddModalItem}
              className="w-10 h-10 rounded-xl bg-teal-600 items-center justify-center"
            >
              <Plus size={20} color="#FFFFFF" strokeWidth={2.5} />
            </Pressable>
          </View>

          {/* Modal Items List */}
          <ScrollView
            contentContainerStyle={{ padding: 16, gap: 10 }}
            showsVerticalScrollIndicator={false}
          >
            {modalItems.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                  toggleItem(item.id);
                }}
                className={`flex-row items-center justify-between p-3.5 bg-white rounded-2xl border border-gray-200 shadow-sm ${
                  item.isChecked ? 'opacity-40' : 'opacity-100'
                }`}
              >
                <View className="flex-row items-center flex-1 mr-3">
                  {item.isChecked ? (
                    <CheckSquare size={22} color="#0D9488" strokeWidth={2.5} />
                  ) : (
                    <Square size={22} color="#9CA3AF" strokeWidth={2} />
                  )}
                  <Text
                    className={`text-base font-bold ml-3 color-gray-900 flex-1 ${
                      item.isChecked ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    {item.ingredientName}
                  </Text>
                </View>

                <View className="bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-100">
                  <Text className="text-xs font-black text-teal-700">
                    {item.quantity} {item.unit}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
