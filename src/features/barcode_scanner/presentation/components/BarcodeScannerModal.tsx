import * as Haptics from 'expo-haptics';
import { Barcode, CheckCircle2, Scan, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

interface BarcodeScannerModalProps {
  visible: boolean;
  onClose: () => void;
  onScanSuccess: (ingredientName: string) => void;
}

const MOCK_BARCODES: Record<string, string> = {
  '0480001234567': 'Chicken Breast',
  '0480009876543': 'Soy Sauce',
  '0480005554443': 'Garlic',
  '0480001112223': 'Cooking Oil',
};

export function BarcodeScannerModal({
  visible,
  onClose,
  onScanSuccess,
}: BarcodeScannerModalProps) {
  const [scannedResult, setScannedResult] = useState<string | null>(null);

  const simulateScan = (barcode: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    const match = MOCK_BARCODES[barcode] || 'Organic Tomatoes';
    setScannedResult(match);
  };

  const handleConfirmAdd = () => {
    if (scannedResult) {
      onScanSuccess(scannedResult);
      setScannedResult(null);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className="flex-1 bg-black/80 justify-center items-center p-5">
        <View className="w-full bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl items-center relative">
          <Pressable
            onPress={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800 items-center justify-center"
          >
            <X size={18} color="#94A3B8" strokeWidth={2.5} />
          </Pressable>

          <View className="w-14 h-14 rounded-2xl bg-teal-500/20 items-center justify-center mb-4">
            <Scan size={28} color="#14B8A6" strokeWidth={2} />
          </View>

          <Text className="text-xl font-black text-white text-center mb-1">Pantry Barcode Scanner</Text>
          <Text className="text-xs text-slate-400 text-center mb-6">
            Align barcode inside viewfinder to add items to My Pantry
          </Text>

          {/* Viewfinder Target */}
          <View className="w-64 h-40 rounded-2xl border-2 border-dashed border-teal-500 justify-center items-center bg-slate-950/60 mb-6 relative overflow-hidden">
            <View className="w-full h-0.5 bg-teal-400/80 animate-pulse" />
            <Text className="text-[11px] font-mono text-teal-400 mt-2">scanning active...</Text>
          </View>

          {/* Simulated scan barcode buttons */}
          <View className="w-full mb-6">
            <Text className="text-[11px] font-bold uppercase text-slate-500 mb-2 text-center">
              Quick Scan Simulation
            </Text>
            <View className="flex-row flex-wrap gap-2 justify-center">
              {Object.entries(MOCK_BARCODES).map(([code, name]) => (
                <Pressable
                  key={code}
                  onPress={() => simulateScan(code)}
                  className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg flex-row items-center gap-1.5"
                >
                  <Barcode size={14} color="#94A3B8" />
                  <Text className="text-xs font-semibold text-slate-200">{name}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {scannedResult && (
            <View className="w-full bg-teal-950 border border-teal-800 rounded-2xl p-4 items-center mb-4">
              <View className="flex-row items-center gap-2 mb-2">
                <CheckCircle2 size={18} color="#2DD4BF" />
                <Text className="text-sm font-extrabold text-teal-200">Scanned Item Detected</Text>
              </View>
              <Text className="text-base font-black text-white mb-3">{scannedResult}</Text>

              <Pressable
                onPress={handleConfirmAdd}
                className="w-full bg-teal-500 py-3 rounded-xl items-center"
              >
                <Text className="text-sm font-extrabold text-white">Add to My Pantry</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
