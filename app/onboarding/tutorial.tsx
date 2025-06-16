import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ChevronRight, ChevronLeft, X, Target, Zap, TrendingUp, Users } from 'lucide-react-native';
import { useOnboarding } from '@/hooks/useOnboarding';

const tutorialSteps = [
  {
    id: 'welcome',
    title: 'Welcome to the Academy!',
    description: 'Let\'s learn the ninja way together.',
    content: {
      type: 'welcome',
      message: `Congratulations on joining the Hidden Leaf Academy! I'm Iruka-sensei, and I'll be your guide as you begin your ninja journey.

Your path to becoming a great ninja starts with understanding the fundamentals. Let's explore what makes a true shinobi!`,
    },
  },
  {
    id: 'stats',
    title: 'Your Ninja Stats',
    description: 'Understanding your six core abilities',
    content: {
      type: 'stats',
      stats: [
        { name: 'Chakra', icon: '💙', description: 'Spiritual energy and focus' },
        { name: 'Strength', icon: '💪', description: 'Physical power and endurance' },
        { name: 'Intelligence', icon: '🧠', description: 'Mental capacity and wisdom' },
        { name: 'Agility', icon: '⚡', description: 'Speed and coordination' },
        { name: 'Stamina', icon: '🔥', description: 'Endurance and consistency' },
        { name: 'Charisma', icon: '👥', description: 'Social skills and leadership' },
      ],
    },
  },
  {
    id: 'missions',
    title: 'Mission Board',
    description: 'Your daily training assignments',
    content: {
      type: 'missions',
      message: `The Mission Board is where you'll find your daily training assignments. Each mission is designed to strengthen specific ninja abilities.

Missions are categorized by training type:
• Physical Training - Builds Strength & Stamina
• Mental Training - Develops Intelligence
• Chakra Control - Enhances spiritual energy
• Social Bonds - Improves Charisma
• Stealth Operations - Increases Agility`,
    },
  },
  {
    id: 'ranks',
    title: 'Ninja Ranking System',
    description: 'Your path to becoming Hokage',
    content: {
      type: 'ranks',
      ranks: [
        { name: 'Academy Student', badge: '🎓', xp: 0 },
        { name: 'Genin', badge: '🥋', xp: 100 },
        { name: 'Chunin', badge: '⚔️', xp: 500 },
        { name: 'Jonin', badge: '🛡️', xp: 2500 },
        { name: 'Kage', badge: '👑', xp: 10000 },
      ],
    },
  },
  {
    id: 'jutsu',
    title: 'Jutsu System',
    description: 'Unlock powerful abilities',
    content: {
      type: 'jutsu',
      message: `As your stats grow, you'll unlock powerful jutsu techniques! These special abilities provide gameplay bonuses and help you on your ninja journey.

Your first jutsu will unlock when you reach 100 total stat points. Keep training consistently to discover new techniques!`,
    },
  },
];

export default function Tutorial() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const { onboardingData, completeOnboarding } = useOnboarding();

  const currentTutorial = tutorialSteps[currentStep];
  const isLastStep = currentStep === tutorialSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      completeOnboarding();
      router.replace('/(tabs)');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (showSkipConfirm) {
      completeOnboarding();
      router.replace('/(tabs)');
    } else {
      setShowSkipConfirm(true);
    }
  };

  const renderContent = () => {
    switch (currentTutorial.content.type) {
      case 'welcome':
        return (
          <View style={styles.welcomeContent}>
            <Text style={styles.instructorEmoji}>👨‍🏫</Text>
            <Text style={styles.welcomeMessage}>{currentTutorial.content.message}</Text>
          </View>
        );

      case 'stats':
        return (
          <View style={styles.statsContent}>
            <Text style={styles.sectionTitle}>Your Six Ninja Stats</Text>
            <View style={styles.statsList}>
              {currentTutorial.content.stats.map((stat, index) => (
                <View key={stat.name} style={styles.statItem}>
                  <Text style={styles.statIcon}>{stat.icon}</Text>
                  <View style={styles.statInfo}>
                    <Text style={styles.statName}>{stat.name}</Text>
                    <Text style={styles.statDescription}>{stat.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        );

      case 'missions':
        return (
          <View style={styles.missionsContent}>
            <Target size={48} color="#FF6B35" style={styles.contentIcon} />
            <Text style={styles.missionMessage}>{currentTutorial.content.message}</Text>
          </View>
        );

      case 'ranks':
        return (
          <View style={styles.ranksContent}>
            <Text style={styles.sectionTitle}>Ninja Ranking Path</Text>
            <View style={styles.ranksList}>
              {currentTutorial.content.ranks.map((rank, index) => (
                <View key={rank.name} style={styles.rankItem}>
                  <Text style={styles.rankBadge}>{rank.badge}</Text>
                  <View style={styles.rankInfo}>
                    <Text style={styles.rankName}>{rank.name}</Text>
                    <Text style={styles.rankXP}>{rank.xp} XP required</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        );

      case 'jutsu':
        return (
          <View style={styles.jutsuContent}>
            <Zap size={48} color="#F1C40F" style={styles.contentIcon} />
            <Text style={styles.jutsuMessage}>{currentTutorial.content.message}</Text>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={['#1A252F', '#2C3E50', '#34495E']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft size={24} color={currentStep === 0 ? '#7F8C8D' : '#FFFFFF'} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
          >
            {showSkipConfirm ? (
              <Text style={styles.skipConfirmText}>Tap again to skip</Text>
            ) : (
              <X size={24} color="#7F8C8D" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            Step {currentStep + 1} of {tutorialSteps.length}
          </Text>
        </View>

        <View style={styles.tutorialCard}>
          <Text style={styles.tutorialTitle}>{currentTutorial.title}</Text>
          <Text style={styles.tutorialDescription}>{currentTutorial.description}</Text>
        </View>

        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
          {renderContent()}
        </ScrollView>

        <View style={styles.navigationContainer}>
          <View style={styles.stepIndicators}>
            {tutorialSteps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.stepIndicator,
                  index === currentStep && styles.activeStepIndicator,
                  index < currentStep && styles.completedStepIndicator,
                ]}
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FF6B35', '#E55A2B']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {isLastStep ? 'Start Your Journey' : 'Continue'}
              </Text>
              <ChevronRight size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  skipConfirmText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#E74C3C',
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
  tutorialCard: {
    backgroundColor: '#34495E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4A5568',
    alignItems: 'center',
  },
  tutorialTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  tutorialDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  welcomeContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  instructorEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  welcomeMessage: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  statsContent: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsList: {
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C3E50',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  statIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  statInfo: {
    flex: 1,
  },
  statName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
  },
  missionsContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  contentIcon: {
    marginBottom: 20,
  },
  missionMessage: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  ranksContent: {
    paddingVertical: 20,
  },
  ranksList: {
    gap: 12,
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C3E50',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  rankBadge: {
    fontSize: 24,
    marginRight: 16,
  },
  rankInfo: {
    flex: 1,
  },
  rankName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  rankXP: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
  },
  jutsuContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  jutsuMessage: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  navigationContainer: {
    marginTop: 20,
  },
  stepIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
  },
  stepIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34495E',
  },
  activeStepIndicator: {
    backgroundColor: '#FF6B35',
  },
  completedStepIndicator: {
    backgroundColor: '#2ECC71',
  },
  nextButton: {
    width: '100%',
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