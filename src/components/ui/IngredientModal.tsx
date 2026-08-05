import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Pressable,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, X, Check, Trash2, Scan, Sparkles } from 'lucide-react-native';
import { Ingredient } from '../../types/ingredient';
import { IngredientChip } from './IngredientChip';
import { BarcodeScannerModal } from '../../features/barcode_scanner/presentation/components/BarcodeScannerModal';
import { FridgeScannerModal } from '../../features/ai_scanner/presentation/components/FridgeScannerModal';

interface IngredientModalProps {
  visible: boolean;
  ingredients: Ingredient[];
  selectedIds: string[];
  onToggleIngredient: (id: string) => void;
  onClearSelection: () => void;
  onClose: () => void;
}

export const IngredientModal: React.FC<IngredientModalProps> = ({
  visible,
  ingredients,
  selectedIds,
  onToggleIngredient,
  onClearSelection,
  onClose,
}) => {
  const [modalSearch, setModalSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isBarcodeScannerOpen, setIsBarcodeScannerOpen] = useState(false);
  const [isFridgeScannerOpen, setIsFridgeScannerOpen] = useState(false);

  const categories = ['All', 'Produce', 'Meat', 'Seafood', 'Pantry', 'Dairy'];

  const filteredIngredients = ingredients.filter((ing) => {
    const matchesSearch = ing.name.toLowerCase().includes(modalSearch.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBarcodeAdd = (scannedName: string) => {
    const match = ingredients.find((i) => i.name.toLowerCase() === scannedName.toLowerCase());
    if (match && !selectedIds.includes(match.id)) {
      onToggleIngredient(match.id);
    }
  };

  const handleAiDetected = (detectedList: string[]) => {
    for (const name of detectedList) {
      const match = ingredients.find((i) => i.name.toLowerCase() === name.toLowerCase());
      if (match && !selectedIds.includes(match.id)) {
        onToggleIngredient(match.id);
      }
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF' }}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#111827' }}>
              My Pantry
            </Text>
            <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>
              {ingredients.length} items available · {selectedIds.length} selected
            </Text>
          </View>
          <Pressable
            onPress={onClose}
            style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={18} color="#374151" strokeWidth={2.5} />
          </Pressable>
        </View>

        {/* AI & Barcode Quick Action Buttons */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingTop: 12, gap: 10, backgroundColor: '#FFFFFF' }}>
          <Pressable
            onPress={() => setIsFridgeScannerOpen(true)}
            style={{ flex: 1, backgroundColor: '#FEF3C7', borderColor: '#FCD34D', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          >
            <Sparkles size={16} color="#D97706" strokeWidth={2.5} />
            <Text style={{ fontSize: 12, fontWeight: '800', color: '#92400E' }}>AI Fridge Scan</Text>
          </Pressable>

          <Pressable
            onPress={() => setIsBarcodeScannerOpen(true)}
            style={{ flex: 1, backgroundColor: '#F0FDF4', borderColor: '#86EFAC', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          >
            <Scan size={16} color="#16A34A" strokeWidth={2.5} />
            <Text style={{ fontSize: 12, fontWeight: '800', color: '#166534' }}>Barcode Scan</Text>
          </Pressable>
        </View>

        {/* Search */}
        <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 4, backgroundColor: '#FFFFFF' }}>
          <View style={{ backgroundColor: '#F3F4F6', borderRadius: 14, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 4, marginBottom: 14 }}>
            <Search size={16} color="#9CA3AF" strokeWidth={2} />
            <TextInput
              placeholder="Search ingredients..."
              placeholderTextColor="#9CA3AF"
              value={modalSearch}
              onChangeText={setModalSearch}
              style={{ flex: 1, color: '#111827', fontWeight: '500', marginLeft: 10, fontSize: 14, paddingVertical: 10 }}
            />
            {modalSearch !== '' && (
              <Pressable onPress={() => setModalSearch('')} hitSlop={8}>
                <X size={15} color="#9CA3AF" strokeWidth={2.5} />
              </Pressable>
            )}
          </View>

          {/* Category Pill Filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingBottom: 14 }}
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <Pressable
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  style={{
                    paddingHorizontal: 18,
                    paddingVertical: 8,
                    borderRadius: 50,
                    backgroundColor: isActive ? '#0D9488' : '#F3F4F6',
                    borderWidth: 1,
                    borderColor: isActive ? '#0D9488' : 'transparent',
                  }}
                >
                  <Text style={{ fontSize: 13, fontWeight: '600', color: isActive ? '#FFFFFF' : '#6B7280' }}>
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Ingredients Grid */}
        <FlatList
          data={filteredIngredients}
          keyExtractor={(item) => item.id}
          extraData={selectedIds}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 100 }}
          columnWrapperStyle={{ gap: 10 }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <View style={{ flex: 1 }}>
                <IngredientChip
                  ingredient={item}
                  isSelected={isSelected}
                  onToggle={onToggleIngredient}
                />
              </View>
            );
          }}
          initialNumToRender={16}
          maxToRenderPerBatch={16}
          windowSize={5}
          removeClippedSubviews={true}
        />

        {/* Footer */}
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 28, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#F3F4F6', flexDirection: 'row', alignItems: 'center', gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 8 }}>
          <Pressable
            onPress={onClearSelection}
            disabled={selectedIds.length === 0}
            style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderRadius: 14, borderWidth: 1, borderColor: selectedIds.length === 0 ? '#F3F4F6' : '#FECACA', backgroundColor: selectedIds.length === 0 ? '#F9FAFB' : '#FEF2F2', opacity: selectedIds.length === 0 ? 0.5 : 1 }}
          >
            <Trash2 size={16} color="#EF4444" strokeWidth={2} />
            <Text style={{ color: '#EF4444', fontWeight: '600', fontSize: 13, marginLeft: 6 }}>Clear</Text>
          </Pressable>

          <Pressable
            onPress={onClose}
            style={{ flex: 1, backgroundColor: '#0D9488', paddingVertical: 14, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', shadowColor: '#0D9488', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 }}
          >
            <Check size={18} color="#FFFFFF" strokeWidth={2.5} />
            <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 15, marginLeft: 8 }}>
              Apply {selectedIds.length > 0 ? `(${selectedIds.length})` : ''}
            </Text>
          </Pressable>
        </View>

        {/* Scanners */}
        <BarcodeScannerModal
          visible={isBarcodeScannerOpen}
          onClose={() => setIsBarcodeScannerOpen(false)}
          onScanSuccess={handleBarcodeAdd}
        />

        <FridgeScannerModal
          visible={isFridgeScannerOpen}
          onClose={() => setIsFridgeScannerOpen(false)}
          onIngredientsDetected={handleAiDetected}
        />
      </SafeAreaView>
    </Modal>
  );
};
