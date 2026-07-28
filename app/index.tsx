import React from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

export default function LandingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Hero Food Background Image */}
      <Image
        source={require('../assets/images/landing_hero.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Layered Gradient Darkness Overlay (Fades from transparent top to solid black bottom) */}
      <View style={styles.gradientOverlayTop} />
      <View style={styles.gradientOverlayMiddle} />
      <View style={styles.gradientOverlayBottom} />

      {/* Landing Content Container */}
      <SafeAreaView style={styles.contentContainer}>
        <View style={styles.bottomSection}>
          {/* Main Title */}
          <Text style={styles.titleText}>Cook Like a Chef</Text>

          {/* Subtitle Description */}
          <Text style={styles.descriptionText}>
            BingCart is a user-friendly recipe app designed for those who are new
            to cooking and want to try new recipes at home
          </Text>

          {/* Call to Action Button */}
          <Pressable
            onPress={handleGetStarted}
            style={({ pressed }) => [
              styles.getStartedButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    width: width,
    height: height * 0.7,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  gradientOverlayTop: {
    position: 'absolute',
    top: height * 0.25,
    left: 0,
    right: 0,
    height: height * 0.25,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  gradientOverlayMiddle: {
    position: 'absolute',
    top: height * 0.45,
    left: 0,
    right: 0,
    height: height * 0.25,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  gradientOverlayBottom: {
    position: 'absolute',
    top: height * 0.65,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  bottomSection: {
    alignItems: 'center',
    marginBottom: 10,
  },
  titleText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  descriptionText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  getStartedButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#20B2AA', // Vibrant emerald green to match screenshot
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#20B2AA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  getStartedButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});
