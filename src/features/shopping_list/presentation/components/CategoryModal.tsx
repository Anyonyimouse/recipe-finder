import React from 'react';
import { View, Text, Modal, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckSquare, Square, Trash2, X, Plus } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { ShoppingListItem } from '../../../../types/shopping_list';
import { CATEGORY_EMOJIS } from './ShoppingListCard';

interface CategoryModalProps {
  category: string | null;
  items: ShoppingListItem[];
  modalItemName: string;
  onClose: () => void;
  onDeleteCategory: (category: string) => void;
  onAddItem: () => void;
  onChangeItemName: (text: string) => void;
  onToggleItem: (id: string) => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  category,
  items,
  modalItemName,
  onClose,
  onDeleteCategory,
  onAddItem,
  onChangeItemName,
  onToggleItem,
}) => {
  if (!category) return null;

  const modalCheckedCount = items.filter((i) => i.isChecked).length;
  const modalProgressPercent = items.length > 0 ? Math.round((modalCheckedCount / items.length) * 100) : 0;
  const modalEmoji = CATEGORY_EMOJIS[category] || '🍲';

  return (
    <Modal
      visible={Boolean(category)}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
        {/* Modal Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 12 }}>
            <Text style={{ fontSize: 24, marginRight: 8 }}>{modalEmoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: '900', color: '#111827' }} numberOfLines={1}>
                {category}
              </Text>
              <Text style={{ fontSize: 12, color: '#0D9488', fontWeight: '700' }}>
                {modalCheckedCount} of {items.length} items checked ({modalProgressPercent}%)
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Pressable
              onPress={() => onDeleteCategory(category)}
              style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#FEF2F2', alignItems: 'center', justifyContent: 'center' }}
            >
              <Trash2 size={16} color="#EF4444" strokeWidth={2} />
            </Pressable>
            <Pressable
              onPress={onClose}
              style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} color="#374151" strokeWidth={2.5} />
            </Pressable>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={{ height: 6, backgroundColor: '#E5E7EB', width: '100%' }}>
          <View
            style={{ width: `${modalProgressPercent}%`, height: '100%', backgroundColor: '#0D9488' }}
          />
        </View>

        {/* Add item inside modal */}
        <View style={{ padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F3F4F6', flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <TextInput
            placeholder={`Add ingredient to ${category}...`}
            placeholderTextColor="#9CA3AF"
            value={modalItemName}
            onChangeText={onChangeItemName}
            style={{ flex: 1, backgroundColor: '#F3F4F6', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, color: '#111827', fontWeight: '500' }}
          />
          <Pressable
            onPress={onAddItem}
            style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#0D9488', alignItems: 'center', justifyContent: 'center' }}
          >
            <Plus size={20} color="#FFFFFF" strokeWidth={2.5} />
          </Pressable>
        </View>

        {/* Modal Items List */}
        <ScrollView
          contentContainerStyle={{ padding: 16, gap: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {items.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                onToggleItem(item.id);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 14,
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                opacity: item.isChecked ? 0.4 : 1,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 12 }}>
                {item.isChecked ? (
                  <CheckSquare size={22} color="#0D9488" strokeWidth={2.5} />
                ) : (
                  <Square size={22} color="#9CA3AF" strokeWidth={2} />
                )}
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    color: '#111827',
                    marginLeft: 12,
                    flex: 1,
                    textDecorationLine: item.isChecked ? 'line-through' : 'none',
                  }}
                >
                  {item.ingredientName}
                </Text>
              </View>

              <View style={{ backgroundColor: '#CCFBF1', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#99F6E4' }}>
                <Text style={{ fontSize: 12, fontWeight: '800', color: '#0F766E' }}>
                  {item.quantity} {item.unit}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};
