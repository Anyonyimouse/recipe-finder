import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { CheckSquare, Square, Pin, Maximize2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { ShoppingListItem } from '../../../../types/shopping_list';

export const CATEGORY_EMOJIS: Record<string, string> = {
  Produce: '🥬',
  'Meat & Seafood': '🥩',
  Dairy: '🧀',
  Spices: '🧂',
  General: '🛒',
};

export const KEEP_BG_COLORS = [
  { bg: '#F0FDF9', border: '#CCFBF1', accent: '#0D9488' }, // Teal
  { bg: '#FEF3C7', border: '#FDE68A', accent: '#D97706' }, // Amber
  { bg: '#F0F9FF', border: '#BAE6FD', accent: '#0284C7' }, // Sky
  { bg: '#FDF2F8', border: '#FBCFE8', accent: '#DB2777' }, // Pink
  { bg: '#F3E8FF', border: '#E9D5FF', accent: '#9333EA' }, // Purple
];

interface ShoppingListCardProps {
  category: string;
  items: ShoppingListItem[];
  index: number;
  isPinned: boolean;
  isSelected: boolean;
  isSelectionMode: boolean;
  onLongPress: () => void;
  onPressCard: () => void;
  onToggleSelect: () => void;
  onTogglePin: (e: any) => void;
  onToggleItem: (id: string) => void;
}

export const ShoppingListCard = React.memo<ShoppingListCardProps>(({
  category,
  items,
  index,
  isPinned,
  isSelected,
  isSelectionMode,
  onLongPress,
  onPressCard,
  onToggleSelect,
  onTogglePin,
  onToggleItem,
}) => {
  const emoji = CATEGORY_EMOJIS[category] || '🍲';
  const theme = KEEP_BG_COLORS[index % KEEP_BG_COLORS.length];
  const checkedGroupCount = items.filter((i) => i.isChecked).length;

  return (
    <Pressable
      onLongPress={onLongPress}
      onPress={onPressCard}
      style={{
        flex: 1,
        backgroundColor: isSelected ? '#FEE2E2' : theme.bg,
        borderRadius: 18,
        borderWidth: isSelected ? 2 : 1,
        borderColor: isSelected ? '#EF4444' : isPinned ? '#0D9488' : theme.border,
        padding: 12,
        marginBottom: 10,
        minHeight: 48,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isPinned ? 0.12 : 0.05,
        shadowRadius: 6,
        elevation: isPinned ? 4 : 2,
        position: 'relative',
      }}
    >
      {/* Header */}
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
            ({checkedGroupCount}/{items.length})
          </Text>
        </View>

        {/* Pin & Selection Controls */}
        {isSelectionMode ? (
          <Pressable
            onPress={onToggleSelect}
            hitSlop={8}
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
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
          </Pressable>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Pressable
              onPress={onTogglePin}
              hitSlop={8}
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
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
                width: 28,
                height: 28,
                borderRadius: 14,
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

      {/* Items Preview */}
      <View>
        {items.slice(0, 3).map((item) => (
          <Pressable
            key={item.id}
            onPress={() => {
              if (isSelectionMode) {
                onToggleSelect();
              } else {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                onToggleItem(item.id);
              }
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 6,
              minHeight: 36,
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
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 6,
              }}
            >
              {item.quantity} {item.unit}
            </Text>
          </Pressable>
        ))}

        {items.length > 3 && (
          <View style={{ paddingTop: 4, alignItems: 'center' }}>
            <Text style={{ fontSize: 10, fontWeight: '700', color: theme.accent }}>
              +{items.length - 3} more items...
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
});

ShoppingListCard.displayName = 'ShoppingListCard';
