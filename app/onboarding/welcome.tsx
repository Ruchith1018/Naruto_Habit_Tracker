import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

export default function Welcome() {
  return (
    <LinearGradient
      colors={['#1A252F', '#2C3E50', '#34495E']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.backgroundImage}
          />
          <View style={styles.logoOverlay}>
            <Text style={styles.logoEmoji}>🍃</Text>
            <Text style={styles.logoText}>Hidden Leaf Academy</Text>
          </View>
        </View>

        <View style={styles.welcomeSection}>
          <Text style={styles.title}>Welcome to Your Ninja Journey</Text>
          <Text style={styles.subtitle}>
            Transform your daily habits into epic ninja training missions. 
            Progress through the ranks from Academy Student to Hokage!
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>⚡</Text>
            <Text style={styles.featureText}>Master Six Ninja Stats</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>🎯</Text>
            <Text style={styles.featureText}>Complete Daily Missions</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>🏆</Text>
            <Text style={styles.featureText}>Unlock Powerful Jutsu</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.beginButton}
          onPress={() => router.push('/onboarding/name')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#FF6B35', '#E55A2B']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Begin Your Ninja Journey</Text>
            <ChevronRight size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.skipText}>Skip Setup</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 40,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logoOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  logoText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  welcomeSection: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  featureEmoji: {
    fontSize: 24,
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  beginButton: {
    marginBottom: 16,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  skipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#7F8C8D',
  },
});