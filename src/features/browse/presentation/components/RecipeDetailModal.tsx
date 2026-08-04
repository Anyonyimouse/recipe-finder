import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { WebView } from 'react-native-webview';
import * as Haptics from 'expo-haptics';
import {
  ArrowLeft,
  Download,
  CheckCircle2,
  Clock,
  Users,
  Plus,
  Minus,
  Play,
} from 'lucide-react-native';
import { StatusBar } from 'react-native';
import { OnlineRecipe } from '../../types';
import { getYouTubeVideoId, getYouTubeHtml, parseInstructions } from '../../utils';

interface RecipeDetailModalProps {
  recipe: OnlineRecipe;
  onClose: () => void;
  downloadedIds: Record<string, boolean>;
  isDownloading: boolean;
  onDownload: (recipe: OnlineRecipe) => void;
  detailTab: 'ingredients' | 'instructions';
  setDetailTab: (tab: 'ingredients' | 'instructions') => void;
  targetServings: number;
  setTargetServings: (n: number) => void;
}

export function RecipeDetailModal({
  recipe,
  onClose,
  downloadedIds,
  isDownloading,
  onDownload,
  detailTab,
  setDetailTab,
  targetServings,
  setTargetServings,
}: RecipeDetailModalProps) {
  const videoId = recipe.strYoutube ? getYouTubeVideoId(recipe.strYoutube) : null;
  const isDownloaded = downloadedIds[recipe.idMeal];

  const SERVING_PRESETS = [
    { label: '👤 1 Solo', count: 1 },
    { label: '👥 2 Pax', count: 2 },
    { label: '⭐ Orig (4)', count: 4 },
    { label: '🎉 6 Party', count: 6 },
  ];

  const STATS = [
    { label: 'Prep Time', value: '15 min', emoji: '🕐' },
    { label: 'Cook Time', value: '20 min', emoji: '🍳' },
    { label: 'Calories', value: '450 kcal', emoji: '🔥' },
    { label: 'Difficulty', value: 'Easy', emoji: '😊' },
  ];

  return (
    <Modal
      visible
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

        {/* ── Hero Image ── */}
        <View style={{ height: 300, backgroundColor: '#0F766E', position: 'relative' }}>
          <Image
            source={{ uri: recipe.strMealThumb }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
          {/* bottom gradient */}
          <View
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: 80, backgroundColor: 'rgba(0,0,0,0.25)',
            }}
          />

          {/* Floating controls */}
          <SafeAreaView style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingTop: 8,
              }}
            >
              {/* Back button */}
              <Pressable
                onPress={onClose}
                style={{
                  width: 38, height: 38, borderRadius: 19,
                  backgroundColor: 'rgba(0,0,0,0.35)',
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <ArrowLeft size={19} color="#FFFFFF" strokeWidth={2.5} />
              </Pressable>

              {/* Download button */}
              <Pressable
                onPress={() => onDownload(recipe)}
                disabled={isDownloading || isDownloaded}
                style={{
                  width: 38, height: 38, borderRadius: 19,
                  backgroundColor: isDownloaded ? '#0D9488' : 'rgba(0,0,0,0.35)',
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                {isDownloaded ? (
                  <CheckCircle2 size={18} color="#FFFFFF" strokeWidth={2.5} />
                ) : isDownloading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Download size={18} color="#FFFFFF" strokeWidth={2.5} />
                )}
              </Pressable>
            </View>
          </SafeAreaView>
        </View>

        {/* ── Content Panel ── */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              marginTop: -24,
              paddingTop: 24,
              paddingHorizontal: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.05,
              shadowRadius: 10,
            }}
          >
            {/* Title + time badge */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 22, fontWeight: '800', color: '#111827',
                  flex: 1, marginRight: 12, lineHeight: 28,
                }}
              >
                {recipe.strMeal}
              </Text>
              <View
                style={{
                  flexDirection: 'row', alignItems: 'center',
                  backgroundColor: '#F3F4F6', borderRadius: 20,
                  paddingHorizontal: 10, paddingVertical: 6,
                }}
              >
                <Clock size={12} color="#6B7280" strokeWidth={2} />
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#4B5563', marginLeft: 4 }}>
                  35 Min
                </Text>
              </View>
            </View>

            {/* Description */}
            <Text style={{ fontSize: 13, color: '#6B7280', lineHeight: 20, marginBottom: 20 }}>
              Authentic {recipe.strArea} {recipe.strCategory.toLowerCase()} prepared traditional
              style with rich savory flavors.
            </Text>

            {/* Stats grid */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
              {STATS.map((stat) => (
                <View
                  key={stat.label}
                  style={{
                    flex: 1, minWidth: '45%',
                    backgroundColor: '#F9FAFB',
                    borderRadius: 14, padding: 14,
                    borderWidth: 1, borderColor: '#F3F4F6',
                  }}
                >
                  <Text style={{ fontSize: 18, marginBottom: 4 }}>{stat.emoji}</Text>
                  <Text style={{ fontSize: 16, fontWeight: '800', color: '#111827' }}>
                    {stat.value}
                  </Text>
                  <Text style={{ fontSize: 11, color: '#9CA3AF', fontWeight: '500', marginTop: 1 }}>
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>

            {/* ── Portion Calculator ── */}
            <View
              style={{
                backgroundColor: '#F0FDF9', borderRadius: 16, padding: 16,
                borderWidth: 1, borderColor: '#CCFBF1', marginBottom: 24,
              }}
            >
              <View
                style={{
                  flexDirection: 'row', alignItems: 'center',
                  justifyContent: 'space-between', marginBottom: 12,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      width: 32, height: 32, borderRadius: 10,
                      backgroundColor: '#0D9488',
                      alignItems: 'center', justifyContent: 'center', marginRight: 10,
                    }}
                  >
                    <Users size={16} color="#FFFFFF" strokeWidth={2} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#111827' }}>
                      Portion Calculator
                    </Text>
                    <Text style={{ fontSize: 11, color: '#0D9488', fontWeight: '500' }}>
                      Recipe for {targetServings} servings
                    </Text>
                  </View>
                </View>

                {/* Stepper */}
                <View
                  style={{
                    flexDirection: 'row', alignItems: 'center',
                    backgroundColor: '#FFFFFF', borderRadius: 12,
                    borderWidth: 1, borderColor: '#99F6E4', padding: 2,
                  }}
                >
                  <Pressable
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                      setTargetServings(Math.max(1, targetServings - 1));
                    }}
                    disabled={targetServings <= 1}
                    style={{
                      width: 32, height: 32, borderRadius: 9,
                      alignItems: 'center', justifyContent: 'center',
                      backgroundColor: targetServings <= 1 ? '#F3F4F6' : '#E6FFFA',
                    }}
                  >
                    <Minus
                      size={14}
                      color={targetServings <= 1 ? '#9CA3AF' : '#0D9488'}
                      strokeWidth={2.5}
                    />
                  </Pressable>
                  <View style={{ paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: '800', color: '#0D9488' }}>
                      {targetServings}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                      setTargetServings(Math.min(20, targetServings + 1));
                    }}
                    disabled={targetServings >= 20}
                    style={{
                      width: 32, height: 32, borderRadius: 9,
                      alignItems: 'center', justifyContent: 'center',
                      backgroundColor: targetServings >= 20 ? '#F3F4F6' : '#E6FFFA',
                    }}
                  >
                    <Plus
                      size={14}
                      color={targetServings >= 20 ? '#9CA3AF' : '#0D9488'}
                      strokeWidth={2.5}
                    />
                  </Pressable>
                </View>
              </View>

              {/* Preset pills */}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingTop: 4 }}>
                {SERVING_PRESETS.map((preset) => {
                  const isSelected = targetServings === preset.count;
                  return (
                    <Pressable
                      key={preset.count}
                      onPress={() => {
                        Haptics.selectionAsync().catch(() => {});
                        setTargetServings(preset.count);
                      }}
                      style={{
                        paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20,
                        backgroundColor: isSelected ? '#0D9488' : '#FFFFFF',
                        borderWidth: 1,
                        borderColor: isSelected ? '#0D9488' : '#D1D5DB',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11, fontWeight: '600',
                          color: isSelected ? '#FFFFFF' : '#4B5563',
                        }}
                      >
                        {preset.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* ── Tab switcher ── */}
            <View
              style={{
                flexDirection: 'row', backgroundColor: '#F3F4F6',
                borderRadius: 14, padding: 3, marginBottom: 20,
              }}
            >
              {(['ingredients', 'instructions'] as const).map((tab) => (
                <Pressable
                  key={tab}
                  onPress={() => setDetailTab(tab)}
                  style={{
                    flex: 1, paddingVertical: 10, borderRadius: 12,
                    backgroundColor: detailTab === tab ? '#FFFFFF' : 'transparent',
                    alignItems: 'center',
                    shadowColor: detailTab === tab ? '#000' : 'transparent',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05, shadowRadius: 3,
                    elevation: detailTab === tab ? 2 : 0,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13, fontWeight: '700',
                      color: detailTab === tab ? '#0D9488' : '#6B7280',
                    }}
                  >
                    {tab === 'ingredients'
                      ? `Ingredients (${recipe.ingredients.length})`
                      : 'Instructions'}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* ── Ingredients tab ── */}
            {detailTab === 'ingredients' && (
              <View
                style={{
                  backgroundColor: '#F9FAFB', borderRadius: 16, padding: 14,
                  gap: 10, borderWidth: 1, borderColor: '#F3F4F6',
                }}
              >
                {recipe.ingredients.map((ing, idx) => (
                  <View
                    key={idx}
                    style={{
                      flexDirection: 'row', alignItems: 'center',
                      justifyContent: 'space-between', paddingVertical: 2,
                    }}
                  >
                    <Text style={{ fontSize: 13, color: '#374151', fontWeight: '600' }}>
                      • {ing.name}
                    </Text>
                    <Text style={{ fontSize: 13, color: '#0D9488', fontWeight: '700' }}>
                      {ing.measure}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* ── Instructions tab ── */}
            {detailTab === 'instructions' && (
              <View>
                {/* Embedded video */}
                {videoId && (
                  <View style={{ marginBottom: 20 }}>
                    <View
                      style={{
                        flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'space-between', marginBottom: 10,
                      }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Play size={16} color="#EF4444" strokeWidth={2.5} />
                        <Text style={{ fontSize: 15, fontWeight: '800', color: '#111827' }}>
                          Video Recipe Tutorial
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        height: 200, borderRadius: 16, overflow: 'hidden',
                        backgroundColor: '#000000',
                        borderWidth: 1, borderColor: '#E5E7EB',
                      }}
                    >
                      <WebView
                        source={{ html: getYouTubeHtml(videoId), baseUrl: 'https://www.youtube.com' }}
                        style={{ flex: 1 }}
                        allowsInlineMediaPlayback
                        allowsFullscreenVideo
                        mediaPlaybackRequiresUserAction={false}
                        javaScriptEnabled
                        domStorageEnabled
                        originWhitelist={['*']}
                        userAgent="Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
                      />
                    </View>
                  </View>
                )}

                {/* Numbered steps */}
                {parseInstructions(recipe.strInstructions).map((stepText, idx) => (
                  <View
                    key={idx}
                    style={{
                      backgroundColor: '#F9FAFB', borderRadius: 14, padding: 14,
                      marginBottom: 10, borderWidth: 1, borderColor: '#F3F4F6',
                      flexDirection: 'row', gap: 12,
                    }}
                  >
                    <View
                      style={{
                        width: 28, height: 28, borderRadius: 14,
                        backgroundColor: '#0D9488',
                        alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 12, fontWeight: '800', color: '#FFFFFF' }}>
                        {idx + 1}
                      </Text>
                    </View>
                    <Text
                      style={{
                        flex: 1, fontSize: 14, color: '#374151',
                        lineHeight: 22, fontWeight: '500',
                      }}
                    >
                      {stepText}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
