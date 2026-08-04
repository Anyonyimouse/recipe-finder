import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Search, X, AlignJustify } from 'lucide-react-native';

interface BrowseHeaderProps {
  showSearch: boolean;
  setShowSearch: (v: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSubmitSearch: () => void;
  onClearSearch: () => void;
  hasFilter: boolean;
  filterLabel: string;
  onClearFilter: () => void;
  onOpenSidebar: () => void;
}

export function BrowseHeader({
  showSearch,
  setShowSearch,
  searchQuery,
  setSearchQuery,
  onSubmitSearch,
  onClearSearch,
  hasFilter,
  filterLabel,
  onClearFilter,
  onOpenSidebar,
}: BrowseHeaderProps) {
  return (
    <View
      style={{
        backgroundColor: '#F9FAFB',
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 12,
        zIndex: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.03)',
      }}
    >
      {/* Action buttons row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {/* Search toggle */}
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
              setShowSearch(!showSearch);
            }}
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              backgroundColor: showSearch ? '#0D9488' : '#FFFFFF',
              borderWidth: 1,
              borderColor: showSearch ? '#0D9488' : '#E5E7EB',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.06,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Search size={18} color={showSearch ? '#FFFFFF' : '#374151'} strokeWidth={2} />
          </Pressable>

          {/* Sidebar toggle */}
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
              onOpenSidebar();
            }}
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              backgroundColor: hasFilter ? '#0D9488' : '#FFFFFF',
              borderWidth: 1,
              borderColor: hasFilter ? '#0D9488' : '#E5E7EB',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.06,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <AlignJustify size={18} color={hasFilter ? '#FFFFFF' : '#374151'} strokeWidth={2} />
          </Pressable>
        </View>
      </View>

      {/* Collapsible search input */}
      {showSearch && (
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 14,
            paddingVertical: 4,
            marginTop: 12,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Search size={16} color="#9CA3AF" strokeWidth={2} />
          <TextInput
            placeholder="Search recipes..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={onSubmitSearch}
            returnKeyType="search"
            autoFocus
            style={{
              flex: 1,
              color: '#111827',
              fontWeight: '500',
              marginLeft: 10,
              fontSize: 14,
              paddingVertical: 10,
            }}
          />
          {searchQuery !== '' && (
            <Pressable onPress={onClearSearch} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <X size={16} color="#9CA3AF" strokeWidth={2.5} />
            </Pressable>
          )}
        </View>
      )}

      {/* Active filter badge */}
      {hasFilter && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 8 }}>
          <View
            style={{
              backgroundColor: '#F0FDF9',
              borderWidth: 1,
              borderColor: '#99F6E4',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 4,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Text style={{ fontSize: 11, color: '#0D9488', fontWeight: '700' }}>
              {filterLabel}
            </Text>
            <Pressable onPress={onClearFilter} hitSlop={6}>
              <X size={13} color="#0D9488" strokeWidth={2.5} />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
