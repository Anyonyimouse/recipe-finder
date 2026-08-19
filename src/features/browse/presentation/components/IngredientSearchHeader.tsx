import React from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { Search, AlignJustify, UtensilsCrossed, X } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface IngredientSearchHeaderProps {
  showSearch: boolean;
  searchQuery: string;
  selectedCount: number;
  hasCuisineFilter: boolean;
  onToggleSearch: () => void;
  onChangeSearchQuery: (text: string) => void;
  onOpenIngredientModal: () => void;
  onOpenCuisineDrawer: () => void;
  onClearSelection: () => void;
}

export const IngredientSearchHeader: React.FC<IngredientSearchHeaderProps> = ({
  showSearch,
  searchQuery,
  selectedCount,
  hasCuisineFilter,
  onToggleSearch,
  onChangeSearchQuery,
  onOpenIngredientModal,
  onOpenCuisineDrawer,
  onClearSelection,
}) => {
  return (
    <View style={{ backgroundColor: '#F9FAFB', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12, zIndex: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.03)' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand */}
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text style={{ fontSize: 28, fontWeight: '900', color: '#0F172A', letterSpacing: -0.8 }}>
            Meal
          </Text>
          <Text style={{ fontSize: 28, fontWeight: '900', color: '#0D9488', letterSpacing: -0.8 }}>
            ify
          </Text>
        </View>

        {/* Header Actions */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
              onToggleSearch();
            }}
            hitSlop={8}
            style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: showSearch ? '#0D9488' : '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' }}
          >
            <Search size={18} color={showSearch ? '#FFFFFF' : '#374151'} strokeWidth={2.2} />
          </Pressable>

          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
              onOpenIngredientModal();
            }}
            hitSlop={8}
            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: selectedCount > 0 ? '#0D9488' : '#FFFFFF', borderWidth: 1, borderColor: selectedCount > 0 ? '#0D9488' : '#E5E7EB', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, gap: 6, minHeight: 40 }}
          >
            <UtensilsCrossed size={16} color={selectedCount > 0 ? '#FFFFFF' : '#0D9488'} strokeWidth={2.2} />
            <Text style={{ fontSize: 13, fontWeight: '800', color: selectedCount > 0 ? '#FFFFFF' : '#374151' }}>
              {selectedCount > 0 ? `${selectedCount} Pantry` : 'Pantry'}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
              onOpenCuisineDrawer();
            }}
            hitSlop={8}
            style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: hasCuisineFilter ? '#0D9488' : '#FFFFFF', borderWidth: 1, borderColor: hasCuisineFilter ? '#0D9488' : '#E5E7EB', alignItems: 'center', justifyContent: 'center' }}
          >
            <AlignJustify size={18} color={hasCuisineFilter ? '#FFFFFF' : '#374151'} strokeWidth={2.2} />
          </Pressable>
        </View>
      </View>

      {/* Expandable Search Input */}
      {showSearch && (
        <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 14, paddingHorizontal: 12, paddingVertical: 8 }}>
          <Search size={16} color="#9CA3AF" />
          <TextInput
            placeholder="Search recipe by name..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={onChangeSearchQuery}
            style={{ flex: 1, marginLeft: 8, fontSize: 14, color: '#111827', fontWeight: '500' }}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => onChangeSearchQuery('')} hitSlop={8}>
              <X size={16} color="#9CA3AF" />
            </Pressable>
          )}
        </View>
      )}

      {/* Selected Pantry Chips Row */}
      {selectedCount > 0 && (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, backgroundColor: '#CCFBF1', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 }}>
          <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F766E' }}>
            Filtering by {selectedCount} pantry ingredient{selectedCount > 1 ? 's' : ''}
          </Text>
          <Pressable onPress={onClearSelection} hitSlop={8}>
            <Text style={{ fontSize: 12, fontWeight: '800', color: '#0D9488' }}>Clear</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
