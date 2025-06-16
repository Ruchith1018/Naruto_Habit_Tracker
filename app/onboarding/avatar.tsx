import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ChevronRight, ChevronLeft } from 'lucide-react-native';
import { useOnboarding } from '@/hooks/useOnboarding';

const avatars = [
  { id: 'naruto', name: 'Naruto', emoji: '🦊', description: 'Determined and energetic', color: '#FF6B35' },
  { id: 'sasuke', name: 'Sasuke', emoji: '⚡', description: 'Cool and focused', color: '#3498DB' },
  { id: 'sakura', name: 'Sakura', emoji: '🌸', description: 'Strong and intelligent', color: '#E91E63' },
  { id: 'kakashi', name: 'Kakashi', emoji: '🎭', description: 'Wise and mysterious', color: '#95A5A6' },
  { id: 'hinata', name: 'Hinata', emoji: '👁️', description: 'Gentle and observant', color: '#9B59B6' },
  { id: 'rock_lee', name: 'Rock Lee', emoji: '💪', description: 'Hardworking and passionate', color: '#2ECC71' },
  { id: 'shikamaru', name: 'Shikamaru', emoji: '🧠', description: 'Strategic and calm', color: '#F39C12' },
  { id: 'gaara', name: 'Gaara', emoji: '🏜️', description: 'Protective and strong', color: '#D35400' },
];

export default function AvatarSelection() {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const handleContinue = () => {
    if (!selectedAvatar) return;
    
    updateOnboardingData({ avatar: selectedAvatar });
    router.push('/onboarding/age');
  };

  return (
    <LinearGradient
      colors={['#1A252F', '#2C3E50', '#34495E']}
      style={styles.container}
    >
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '40%' }]} />
          </View>
          <Text style={styles.progressText}>Step 2 of 5</Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome, {onboardingData.name}!</Text>
          <Text style={styles.instructorEmoji}>👨‍🏫</Text>
          <Text style={styles.instructorName}>Iruka-sensei</Text>
          
          <View style={styles.speechBubble}>
            <Text style={styles.question}>Choose Your Starting Appearance</Text>
            <Text style={styles.description}>
              Select the ninja style that best represents your personality and approach to training.
            </Text>
          </View>
        </View>

        <ScrollView style={styles.avatarGrid} showsVerticalScrollIndicator={false}>
          <View style={styles.avatarContainer}>
            {avatars.map((avatar) => (
              <TouchableOpacity
                key={avatar.id}
                style={[
                  styles.avatarCard,
                  selectedAvatar === avatar.id && styles.selectedAvatarCard,
                  { borderColor: selectedAvatar === avatar.id ? avatar.color : '#4A5568' }
                ]}
                onPress={() => setSelectedAvatar(avatar.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.avatarEmoji}>{avatar.emoji}</Text>
                <Text style={styles.avatarName}>{avatar.name}</Text>
                <Text style={styles.avatarDescription}>{avatar.description}</Text>
                {selectedAvatar === avatar.id && (
                  <View style={[styles.selectedIndicator, { backgroundColor: avatar.color }]}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[styles.continueButton, !selectedAvatar && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!selectedAvatar}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={selectedAvatar ? ['#FF6B35', '#E55A2B'] : ['#7F8C8D', '#6C7B7F']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Continue</Text>
            <ChevronRight size={20} color="#FFFFFF" />
          </LinearGradient>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#34495E',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
    marginBottom: 16,
  },
  instructorEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  instructorName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
    marginBottom: 16,
  },
  speechBubble: {
    backgroundColor: '#34495E',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  question: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
    textAlign: 'center',
    lineHeight: 20,
  },
  avatarGrid: {
    flex: 1,
  },
  avatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  avatarCard: {
    width: '48%',
    backgroundColor: '#34495E',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 12,
    position: 'relative',
  },
  selectedAvatarCard: {
    backgroundColor: '#2C3E50',
  },
  avatarEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  avatarName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  avatarDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
    textAlign: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  continueButton: {
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.6,
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
});