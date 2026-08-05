import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';
import { ChevronLeft, ChevronRight, Mic, Volume2, VolumeX } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

interface VoiceStepAssistantProps {
  steps: string[];
}

export function VoiceStepAssistant({ steps }: VoiceStepAssistantProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      // Stop speech if unmounted
      Speech.stop().catch(() => {});
    };
  }, []);

  const speakText = (text: string) => {
    Speech.stop().catch(() => {});
    setIsSpeaking(true);
    Speech.speak(text, {
      language: 'en',
      rate: 0.95,
      pitch: 1.0,
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const handleToggleRead = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    if (isSpeaking) {
      Speech.stop().catch(() => {});
      setIsSpeaking(false);
    } else {
      const stepText = steps[currentStepIndex];
      if (stepText) {
        speakText(`Step ${currentStepIndex + 1}: ${stepText}`);
      }
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      Haptics.selectionAsync().catch(() => {});
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      if (isSpeaking) {
        speakText(`Step ${nextIdx + 1}: ${steps[nextIdx]}`);
      }
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      Haptics.selectionAsync().catch(() => {});
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      if (isSpeaking) {
        speakText(`Step ${prevIdx + 1}: ${steps[prevIdx]}`);
      }
    }
  };

  if (!steps || steps.length === 0) return null;

  return (
    <View className="bg-teal-900 rounded-2xl p-4 border border-teal-800 shadow-md mb-4">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-2">
          <Mic size={18} color="#2DD4BF" strokeWidth={2.5} />
          <Text className="text-sm font-extrabold text-white">Hands-Free Voice Assistant</Text>
        </View>
        <Text className="text-xs font-bold text-teal-300">
          Step {currentStepIndex + 1} of {steps.length}
        </Text>
      </View>

      <Text className="text-sm text-teal-50 font-medium leading-6 mb-4">
        {steps[currentStepIndex]}
      </Text>

      <View className="flex-row items-center justify-between border-t border-teal-800/80 pt-3">
        <Pressable
          onPress={handlePrev}
          disabled={currentStepIndex === 0}
          className={`flex-row items-center gap-1 px-3 py-1.5 rounded-lg ${
            currentStepIndex === 0 ? 'opacity-30' : 'bg-teal-800'
          }`}
        >
          <ChevronLeft size={16} color="#FFFFFF" />
          <Text className="text-xs font-semibold text-white">Prev</Text>
        </Pressable>

        <Pressable
          onPress={handleToggleRead}
          className={`flex-row items-center gap-2 px-4 py-2 rounded-full ${
            isSpeaking ? 'bg-amber-500' : 'bg-teal-500'
          }`}
        >
          {isSpeaking ? (
            <VolumeX size={16} color="#FFFFFF" strokeWidth={2.5} />
          ) : (
            <Volume2 size={16} color="#FFFFFF" strokeWidth={2.5} />
          )}
          <Text className="text-xs font-bold text-white">
            {isSpeaking ? 'Stop Speaking' : 'Read Aloud'}
          </Text>
        </Pressable>

        <Pressable
          onPress={handleNext}
          disabled={currentStepIndex === steps.length - 1}
          className={`flex-row items-center gap-1 px-3 py-1.5 rounded-lg ${
            currentStepIndex === steps.length - 1 ? 'opacity-30' : 'bg-teal-800'
          }`}
        >
          <Text className="text-xs font-semibold text-white">Next</Text>
          <ChevronRight size={16} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}
