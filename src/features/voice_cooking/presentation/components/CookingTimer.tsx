import * as Haptics from 'expo-haptics';
import { Pause, Play, RotateCcw, Timer as TimerIcon } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

interface CookingTimerProps {
  initialMinutes?: number;
}

export function CookingTimer({ initialMinutes = 15 }: CookingTimerProps) {
  const validMins = initialMinutes > 0 ? initialMinutes : 15;
  const [secondsLeft, setSecondsLeft] = useState(validMins * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setSecondsLeft(validMins * 60);
    setIsRunning(false);
  }, [validMins]);

  useEffect(() => {
    let interval: any;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const toggleTimer = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setIsRunning(false);
    setSecondsLeft(validMins * 60);
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <View className="bg-slate-900 rounded-2xl p-4 flex-row items-center justify-between shadow-md mb-4">
      <View className="flex-row items-center gap-3">
        <View className="w-10 h-10 rounded-xl bg-teal-500/20 items-center justify-center">
          <TimerIcon size={20} color="#14B8A6" strokeWidth={2} />
        </View>
        <View>
          <Text className="text-xs font-semibold text-slate-400">Recipe Step Timer ({validMins} mins)</Text>
          <Text className="text-xl font-black text-white font-mono tracking-wider">
            {timeString}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-2">
        <Pressable
          onPress={toggleTimer}
          className={`w-10 h-10 rounded-full items-center justify-center ${
            isRunning ? 'bg-amber-500' : 'bg-teal-600'
          }`}
        >
          {isRunning ? (
            <Pause size={18} color="#FFFFFF" strokeWidth={2.5} />
          ) : (
            <Play size={18} color="#FFFFFF" strokeWidth={2.5} className="ml-0.5" />
          )}
        </Pressable>

        <Pressable
          onPress={resetTimer}
          className="w-10 h-10 rounded-full bg-slate-800 items-center justify-center border border-slate-700"
        >
          <RotateCcw size={16} color="#94A3B8" strokeWidth={2} />
        </Pressable>
      </View>
    </View>
  );
}
