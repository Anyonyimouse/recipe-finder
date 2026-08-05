import * as Haptics from 'expo-haptics';
import { Camera, Check, Sparkles, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Modal, Pressable, Text, View } from 'react-native';

interface FridgeScannerModalProps {
  visible: boolean;
  onClose: () => void;
  onIngredientsDetected: (detectedIngredients: string[]) => void;
}

const AI_DETECTION_PRESETS = [
  ['Tomatoes', 'Garlic', 'Onion', 'Chicken Breast', 'Eggs'],
  ['Pork Belly', 'Soy Sauce', 'Vinegar', 'Black Pepper'],
  ['Pasta', 'Tomato Sauce', 'Cheese', 'Ground Beef'],
];

export function FridgeScannerModal({
  visible,
  onClose,
  onIngredientsDetected,
}: FridgeScannerModalProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedItems, setDetectedItems] = useState<string[]>([]);

  const handleSimulatePhotoScan = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    setIsScanning(true);
    setDetectedItems([]);

    setTimeout(() => {
      setIsScanning(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      const randomSet = AI_DETECTION_PRESETS[Math.floor(Math.random() * AI_DETECTION_PRESETS.length)];
      setDetectedItems(randomSet);
    }, 1800);
  };

  const handleApplyItems = () => {
    if (detectedItems.length > 0) {
      onIngredientsDetected(detectedItems);
      setDetectedItems([]);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className="flex-1 bg-black/85 justify-center items-center p-5">
        <View className="w-full bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl items-center relative">
          <Pressable
            onPress={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800 items-center justify-center"
          >
            <X size={18} color="#94A3B8" strokeWidth={2.5} />
          </Pressable>

          <View className="w-14 h-14 rounded-2xl bg-amber-500/20 items-center justify-center mb-3">
            <Sparkles size={28} color="#F59E0B" strokeWidth={2} />
          </View>

          <Text className="text-xl font-black text-white text-center mb-1">AI Fridge Photo Scanner</Text>
          <Text className="text-xs text-slate-400 text-center mb-6">
            Take a photo of your fridge or pantry to automatically detect ingredients using AI
          </Text>

          {/* Camera Viewfinder Box */}
          <View className="w-full h-44 rounded-2xl border border-slate-800 bg-slate-950 justify-center items-center mb-6 relative overflow-hidden">
            {isScanning ? (
              <View className="items-center">
                <ActivityIndicator size="large" color="#F59E0B" />
                <Text className="text-xs font-semibold text-amber-400 mt-3 font-mono">
                  Analyzing ingredients with AI...
                </Text>
              </View>
            ) : (
              <Pressable
                onPress={handleSimulatePhotoScan}
                className="items-center bg-amber-500/10 px-5 py-3 rounded-2xl border border-amber-500/30"
              >
                <Camera size={32} color="#F59E0B" strokeWidth={2} />
                <Text className="text-xs font-bold text-amber-400 mt-2">Tap to Take Photo</Text>
              </Pressable>
            )}
          </View>

          {/* Detected Ingredients Result */}
          {detectedItems.length > 0 && (
            <View className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl p-4 mb-4">
              <Text className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-2">
                ✨ {detectedItems.length} Ingredients Detected by AI:
              </Text>
              <View className="flex-row flex-wrap gap-1.5 mb-4">
                {detectedItems.map((item) => (
                  <View
                    key={item}
                    className="bg-amber-500/20 border border-amber-500/40 px-2.5 py-1 rounded-lg flex-row items-center gap-1"
                  >
                    <Check size={12} color="#F59E0B" strokeWidth={3} />
                    <Text className="text-xs font-bold text-amber-200">{item}</Text>
                  </View>
                ))}
              </View>

              <Pressable
                onPress={handleApplyItems}
                className="w-full bg-amber-500 py-3 rounded-xl items-center"
              >
                <Text className="text-sm font-extrabold text-slate-950">Add to My Pantry Filter</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
