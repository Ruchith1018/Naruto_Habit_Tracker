import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ChevronRight, ChevronLeft, Crown } from 'lucide-react-native';
import { useOnboarding } from '@/hooks/useOnboarding';

const villages = [
  {
    id: 'leaf',
    name: 'Hidden Leaf Village',
    symbol: '🍃',
    description: 'Village of strong bonds and unwavering will',
    specialty: 'Balanced training in all ninja arts',
    isPremium: false,
    color: '#2ECC71',
  },
  {
    id: 'sand',
    name: 'Hidden Sand Village',
    symbol: '🏜️',
    description: 'Desert warriors with unbreakable resolve',
    specialty: 'Specializes in endurance and survival training',
    isPremium: true,
    color: '#F39C12',
  },
  {
    id: 'mist',
    name: 'Hidden Mist Village',
    symbol: '🌊',
    description: 'Masters of stealth and silent techniques',
    specialty: 'Advanced stealth and agility missions',
    isPremium: true,
    color: '#3498DB',
  },
  {
    id: 'cloud',
    name: 'Hidden Cloud Village',
    symbol: '⚡',
    description: 'Lightning-fast ninjas with explosive power',
    specialty: 'High-intensity strength and speed training',
    isPremium: true,
    color: '#9B59B6',
  },
  {
    id: 'stone',
    name: 'Hidden Stone Village',
    symbol: '🗻',
    description: 'Steadfast ninjas with unshakeable determination',
    specialty: 'Mental fortitude and strategic thinking',
    isPremium: true,
    color: '#95A5A6',
  },
];

export default function VillageSelection() {
  const [selectedVillage, setSelectedVillage] = useState<string>('leaf');
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const handleContinue = () => {
    updateOnboardingData({ village: selectedVillage });
    router.push('/onboarding/tutorial');
  };

  const selectedVillageData = villages.find(v => v.id === selectedVillage);

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
            <View style={[styles.progressFill, { width: '80%' }]} />
          </View>
          <Text style={styles.progressText}>Step 4 of 5</Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.instructorEmoji}>👨‍🏫</Text>
          <Text style={styles.instructorName}>Iruka-sensei</Text>
          
          <View style={styles.speechBubble}>
            <Text style={styles.question}>Choose Your Ninja Village</Text>
            <Text style={styles.description}>
              Each village has unique training specialties that will influence your mission types and bonuses.
            </Text>
          </View>
        </View>

        <ScrollView style={styles.villageList} showsVerticalScrollIndicator={false}>
          {villages.map((village) => (
            <TouchableOpacity
              key={village.id}
              style={[
                styles.villageCard,
                selectedVillage === village.id && styles.selectedVillageCard,
                { borderColor: selectedVillage === village.id ? village.color : '#4A5568' }
              ]}
              onPress={() => setSelectedVillage(village.id)}
              activeOpacity={0.8}
            >
              <View style={styles.villageHeader}>
                <View style={styles.villageSymbolContainer}>
                  <Text style={styles.villageSymbol}>{village.symbol}</Text>
                </View>
                <View style={styles.villageInfo}>
                  <View style={styles.villageTitleRow}>
                    <Text style={styles.villageName}>{village.name}</Text>
                    {village.isPremium && (
                      <View style={styles.premiumBadge}>
                        <Crown size={12} color="#F1C40F" />
                        <Text style={styles.premiumText}>Premium</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.villageDescription}>{village.description}</Text>
                </View>
                {selectedVillage === village.id && (
                  <View style={[styles.selectedIndicator, { backgroundColor: village.color }]}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
              </View>
              <View style={styles.villageSpecialty}>
                <Text style={styles.specialtyLabel}>Specialty:</Text>
                <Text style={styles.specialtyText}>{village.specialty}</Text>
              </View>
              {village.isPremium && (
                <View style={styles.premiumFeatures}>
                  <Text style={styles.premiumFeaturesTitle}>Premium Features:</Text>
                  <Text style={styles.premiumFeatureItem}>• Exclusive village missions</Text>
                  <Text style={styles.premiumFeatureItem}>• Special jutsu techniques</Text>
                  <Text style={styles.premiumFeatureItem}>• Village-specific achievements</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {selectedVillageData && (
          <View style={styles.selectionSummary}>
            <Text style={styles.summaryText}>
              You've chosen {selectedVillageData.symbol} {selectedVillageData.name}
            </Text>
            {selectedVillageData.isPremium && (
              <Text style={styles.premiumNote}>
                Premium villages can be unlocked later through gameplay or purchase
              </Text>
            )}
          </View>
        )}

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#FF6B35', '#E55A2B']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Begin Training</Text>
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
  villageList: {
    flex: 1,
  },
  villageCard: {
    backgroundColor: '#34495E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    position: 'relative',
  },
  selectedVillageCard: {
    backgroundColor: '#2C3E50',
  },
  villageHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  villageSymbolContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2C3E50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  villageSymbol: {
    fontSize: 24,
  },
  villageInfo: {
    flex: 1,
  },
  villageTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  villageName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    flex: 1,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C3E50',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  premiumText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#F1C40F',
    marginLeft: 2,
  },
  villageDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
  },
  selectedIndicator: {
    position: 'absolute',
    top: -8,
    right: -8,
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
  villageSpecialty: {
    backgroundColor: '#2C3E50',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  specialtyLabel: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
    marginBottom: 2,
  },
  specialtyText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  premiumFeatures: {
    backgroundColor: '#2C3E50',
    borderRadius: 8,
    padding: 8,
  },
  premiumFeaturesTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#F1C40F',
    marginBottom: 4,
  },
  premiumFeatureItem: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
    marginBottom: 2,
  },
  selectionSummary: {
    backgroundColor: '#34495E',
    borderRadius: 12,
    padding: 12,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  summaryText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  premiumNote: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#F1C40F',
    textAlign: 'center',
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