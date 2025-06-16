import { useEffect } from 'react';
import { router } from 'expo-router';
import { useOnboarding } from '@/hooks/useOnboarding';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Index() {
  const { onboardingData } = useOnboarding();

  useEffect(() => {
    // Small delay to ensure proper navigation
    const timer = setTimeout(() => {
      if (onboardingData.isCompleted) {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboarding/welcome');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [onboardingData.isCompleted]);

  return (
    <LinearGradient
      colors={['#1A252F', '#2C3E50', '#34495E']}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Loading state while determining navigation */}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});