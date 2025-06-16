import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ChevronRight, ChevronLeft, Minus, Plus } from 'lucide-react-native';
import { useOnboarding } from '@/hooks/useOnboarding';

export default function AgeSelection() {
  const [age, setAge] = useState(18);
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const handleContinue = () => {
    updateOnboardingData({ age });
    router.push('/onboarding/village');
  };

  const incrementAge = () => {
    if (age < 99) setAge(age + 1);
  };

  const decrementAge = () => {
    if (age > 13) setAge(age - 1);
  };

  const getAgeCategory = (age: number) => {
    if (age < 16) return { category: 'Young Ninja', description: 'Perfect age to start your ninja journey!' };
    if (age < 25) return { category: 'Academy Graduate', description: 'Ready for advanced training missions!' };
    if (age < 35) return { category: 'Experienced Ninja', description: 'Your wisdom will guide your training!' };
    return { category: 'Ninja Master', description: 'Your experience is invaluable to the village!' };
  };

  const ageInfo = getAgeCategory(age);

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
            <View style={[styles.progressFill, { width: '60%' }]} />
          </View>
          <Text style={styles.progressText}>Step 3 of 5</Text>
        </View>

        <View style={styles.mainContent}>
          <Text style={styles.instructorEmoji}>👨‍🏫</Text>
          <Text style={styles.instructorName}>Iruka-sensei</Text>
          
          <View style={styles.speechBubble}>
            <Text style={styles.question}>How old are you, {onboardingData.name}?</Text>
            <Text style={styles.description}>
              This helps us customize your mission difficulty and content to match your experience level.
            </Text>
          </View>

          <View style={styles.ageSelector}>
            <TouchableOpacity
              style={[styles.ageButton, age <= 13 && styles.disabledAgeButton]}
              onPress={decrementAge}
              disabled={age <= 13}
            >
              <Minus size={24} color={age <= 13 ? '#7F8C8D' : '#FFFFFF'} />
            </TouchableOpacity>

            <View style={styles.ageDisplay}>
              <Text style={styles.ageNumber}>{age}</Text>
              <Text style={styles.ageLabel}>years old</Text>
            </View>

            <TouchableOpacity
              style={[styles.ageButton, age >= 99 && styles.disabledAgeButton]}
              onPress={incrementAge}
              disabled={age >= 99}
            >
              <Plus size={24} color={age >= 99 ? '#7F8C8D' : '#FFFFFF'} />
            </TouchableOpacity>
          </View>

          <View style={styles.ageCategoryCard}>
            <Text style={styles.categoryTitle}>{ageInfo.category}</Text>
            <Text style={styles.categoryDescription}>{ageInfo.description}</Text>
          </View>

          <View style={styles.ageRanges}>
            <Text style={styles.rangesTitle}>Age Categories:</Text>
            <View style={styles.rangesList}>
              <View style={[styles.rangeItem, age < 16 && styles.activeRange]}>
                <Text style={[styles.rangeText, age < 16 && styles.activeRangeText]}>13-15: Young Ninja</Text>
              </View>
              <View style={[styles.rangeItem, age >= 16 && age < 25 && styles.activeRange]}>
                <Text style={[styles.rangeText, age >= 16 && age < 25 && styles.activeRangeText]}>16-24: Academy Graduate</Text>
              </View>
              <View style={[styles.rangeItem, age >= 25 && age < 35 && styles.activeRange]}>
                <Text style={[styles.rangeText, age >= 25 && age < 35 && styles.activeRangeText]}>25-34: Experienced Ninja</Text>
              </View>
              <View style={[styles.rangeItem, age >= 35 && styles.activeRange]}>
                <Text style={[styles.rangeText, age >= 35 && styles.activeRangeText]}>35+: Ninja Master</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#FF6B35', '#E55A2B']}
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
  ageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  ageButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledAgeButton: {
    backgroundColor: '#34495E',
  },
  ageDisplay: {
    alignItems: 'center',
    marginHorizontal: 40,
  },
  ageNumber: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
  },
  ageLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
  },
  ageCategoryCard: {
    backgroundColor: '#34495E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FF6B35',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  ageRanges: {
    width: '100%',
  },
  rangesTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#BDC3C7',
    textAlign: 'center',
    marginBottom: 12,
  },
  rangesList: {
    gap: 8,
  },
  rangeItem: {
    backgroundColor: '#2C3E50',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  activeRange: {
    borderColor: '#FF6B35',
    backgroundColor: '#34495E',
  },
  rangeText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
    textAlign: 'center',
  },
  activeRangeText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  continueButton: {
    marginTop: 'auto',
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