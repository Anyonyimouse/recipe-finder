import React from 'react';
import { View } from 'react-native';

export const RecipeCardSkeleton: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#F3F4F6', padding: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 }}>
      {/* Image Skeleton */}
      <View style={{ width: '100%', height: 110, borderRadius: 12, backgroundColor: '#E5E7EB', marginBottom: 10 }} />
      {/* Title Line */}
      <View style={{ width: '80%', height: 14, borderRadius: 4, backgroundColor: '#E5E7EB', marginBottom: 6 }} />
      {/* Subtitle Line */}
      <View style={{ width: '50%', height: 12, borderRadius: 4, backgroundColor: '#F3F4F6' }} />
    </View>
  );
};
