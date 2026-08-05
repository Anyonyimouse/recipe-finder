import React from 'react';
import { View, Text } from 'react-native';
import { AlertTriangle, Clock } from 'lucide-react-native';

interface ExpirationAlertBadgeProps {
  daysLeft: number;
}

export function ExpirationAlertBadge({ daysLeft }: ExpirationAlertBadgeProps) {
  const isExpired = daysLeft <= 0;
  const isUrgent = daysLeft <= 3 && daysLeft > 0;

  if (daysLeft > 7) return null;

  return (
    <View
      className={`flex-row items-center px-2 py-0.5 rounded-md gap-1 ${
        isExpired
          ? 'bg-red-100 border border-red-200'
          : isUrgent
          ? 'bg-amber-100 border border-amber-200'
          : 'bg-gray-100 border border-gray-200'
      }`}
    >
      {isExpired || isUrgent ? (
        <AlertTriangle size={11} color={isExpired ? '#EF4444' : '#F59E0B'} />
      ) : (
        <Clock size={11} color="#6B7280" />
      )}
      <Text
        className={`text-[10px] font-bold ${
          isExpired
            ? 'text-red-700'
            : isUrgent
            ? 'text-amber-800'
            : 'text-gray-600'
        }`}
      >
        {isExpired ? 'Expired' : `Expires in ${daysLeft}d`}
      </Text>
    </View>
  );
}
