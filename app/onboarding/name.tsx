import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ChevronRight, ChevronLeft } from 'lucide-react-native';
import { useOnboarding } from '@/hooks/useOnboarding';

export default function NameEntry() {
  const [name, setName] = useState('');
  const { updateOnboardingData } = useOnboarding();

  const handleContinue = () => {
    if (name.trim().length < 2) {
      Alert.alert('Invalid Name', 'Please enter a name with at least 2 characters.');
      return;
    }
    if (name.length > 15) {
      Alert.alert('Name Too Long', 'Please keep your ninja name under 15 characters.');
      return;
    }
    
    updateOnboardingData({ name: name.trim() });
    router.push('/onboarding/avatar');
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
            <View style={[styles.progressFill, { width: '20%' }]} />
          </View>
          <Text style={styles.progressText}>Step 1 of 5</Text>
        </View>

        <View style={styles.mainContent}>
          <Text style={styles.instructorEmoji}>👨‍🏫</Text>
          <Text style={styles.instructorName}>Iruka-sensei</Text>
          
          <View style={styles.speechBubble}>
            <Text style={styles.question}>What is your ninja name?</Text>
            <Text style={styles.description}>
              Choose a name that represents your ninja way. This will be how other ninjas know you in the academy.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.nameInput}
              value={name}
              onChangeText={setName}
              placeholder="Enter your ninja name..."
              placeholderTextColor="#7F8C8D"
              maxLength={15}
              autoFocus
              returnKeyType="next"
              onSubmitEditing={handleContinue}
            />
            <Text style={styles.characterCount}>{name.length}/15</Text>
          </View>

          <View style={styles.suggestions}>
            <Text style={styles.suggestionsTitle}>Need inspiration?</Text>
            <View style={styles.suggestionTags}>
              {['ShadowBlade', 'FireFist', 'StormNinja', 'LeafDancer'].map((suggestion) => (
                <TouchableOpacity
                  key={suggestion}
                  style={styles.suggestionTag}
                  onPress={() => setName(suggestion)}
                >
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.continueButton, !name.trim() && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!name.trim()}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={name.trim() ? ['#FF6B35', '#E55A2B'] : ['#7F8C8D', '#6C7B7F']}
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
    marginBottom: 40,
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
  mainContent: {
    flex: 1,
    alignItems: 'center',
  },
  instructorEmoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  instructorName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
    marginBottom: 24,
  },
  speechBubble: {
    backgroundColor: '#34495E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#4A5568',
    position: 'relative',
  },
  question: {
    fontSize: 20,
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
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  nameInput: {
    backgroundColor: '#2C3E50',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#4A5568',
    textAlign: 'center',
  },
  characterCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#7F8C8D',
    textAlign: 'right',
    marginTop: 4,
  },
  suggestions: {
    width: '100%',
    marginBottom: 32,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#BDC3C7',
    textAlign: 'center',
    marginBottom: 12,
  },
  suggestionTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  suggestionTag: {
    backgroundColor: '#2C3E50',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  suggestionText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  continueButton: {
    marginTop: 'auto',
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