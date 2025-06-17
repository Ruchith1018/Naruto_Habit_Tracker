import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Award, Star, X } from 'lucide-react-native';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  requirement: {
    type: 'missions' | 'streak' | 'stat' | 'jutsu' | 'rank';
    value: number;
    stat?: string;
  };
}

interface AchievementSystemProps {
  userStats: any;
  missions: any[];
  jutsuList: any[];
  onAchievementUnlocked?: (achievement: Achievement) => void;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_mission',
    title: 'First Steps',
    description: 'Complete your first mission',
    icon: '🎯',
    unlocked: false,
    requirement: { type: 'missions', value: 1 },
  },
  {
    id: 'week_streak',
    title: 'Dedicated Ninja',
    description: 'Maintain a 7-day mission streak',
    icon: '🔥',
    unlocked: false,
    requirement: { type: 'streak', value: 7 },
  },
  {
    id: 'chakra_master',
    title: 'Chakra Master',
    description: 'Reach 200 Chakra points',
    icon: '💙',
    unlocked: false,
    requirement: { type: 'stat', value: 200, stat: 'chakra' },
  },
  {
    id: 'strength_warrior',
    title: 'Strength Warrior',
    description: 'Reach 200 Strength points',
    icon: '💪',
    unlocked: false,
    requirement: { type: 'stat', value: 200, stat: 'strength' },
  },
  {
    id: 'intelligence_sage',
    title: 'Intelligence Sage',
    description: 'Reach 200 Intelligence points',
    icon: '🧠',
    unlocked: false,
    requirement: { type: 'stat', value: 200, stat: 'intelligence' },
  },
  {
    id: 'first_jutsu',
    title: 'Jutsu Apprentice',
    description: 'Unlock your first jutsu technique',
    icon: '⚡',
    unlocked: false,
    requirement: { type: 'jutsu', value: 1 },
  },
  {
    id: 'mission_master',
    title: 'Mission Master',
    description: 'Complete 50 missions',
    icon: '🏆',
    unlocked: false,
    requirement: { type: 'missions', value: 50 },
  },
  {
    id: 'genin_rank',
    title: 'Genin Graduate',
    description: 'Reach Genin rank',
    icon: '🥋',
    unlocked: false,
    requirement: { type: 'rank', value: 100 },
  },
];

export function AchievementSystem({ userStats, missions, jutsuList, onAchievementUnlocked }: AchievementSystemProps) {
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [showModal, setShowModal] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [celebrationAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    checkAchievements();
  }, [userStats, missions, jutsuList]);

  const checkAchievements = () => {
    const completedMissions = missions.filter(m => m.completed).length;
    const maxStreak = Math.max(...missions.map(m => m.streak), 0);
    const unlockedJutsu = jutsuList.filter(j => j.unlocked).length;

    setAchievements(prevAchievements => 
      prevAchievements.map(achievement => {
        if (achievement.unlocked) return achievement;

        let shouldUnlock = false;

        switch (achievement.requirement.type) {
          case 'missions':
            shouldUnlock = completedMissions >= achievement.requirement.value;
            break;
          case 'streak':
            shouldUnlock = maxStreak >= achievement.requirement.value;
            break;
          case 'stat':
            if (achievement.requirement.stat) {
              const statValue = userStats[achievement.requirement.stat] || 0;
              shouldUnlock = statValue >= achievement.requirement.value;
            }
            break;
          case 'jutsu':
            shouldUnlock = unlockedJutsu >= achievement.requirement.value;
            break;
          case 'rank':
            shouldUnlock = userStats.experience >= achievement.requirement.value;
            break;
        }

        if (shouldUnlock) {
          const unlockedAchievement = {
            ...achievement,
            unlocked: true,
            unlockedAt: new Date(),
          };
          
          // Show celebration
          setNewAchievement(unlockedAchievement);
          setShowModal(true);
          onAchievementUnlocked?.(unlockedAchievement);
          
          // Trigger celebration animation
          Animated.sequence([
            Animated.timing(celebrationAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(celebrationAnim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]).start();

          return unlockedAchievement;
        }

        return achievement;
      })
    );
  };

  const getProgressPercentage = (achievement: Achievement) => {
    if (achievement.unlocked) return 100;

    const completedMissions = missions.filter(m => m.completed).length;
    const maxStreak = Math.max(...missions.map(m => m.streak), 0);
    const unlockedJutsu = jutsuList.filter(j => j.unlocked).length;

    switch (achievement.requirement.type) {
      case 'missions':
        return Math.min((completedMissions / achievement.requirement.value) * 100, 100);
      case 'streak':
        return Math.min((maxStreak / achievement.requirement.value) * 100, 100);
      case 'stat':
        if (achievement.requirement.stat) {
          const statValue = userStats[achievement.requirement.stat] || 0;
          return Math.min((statValue / achievement.requirement.value) * 100, 100);
        }
        return 0;
      case 'jutsu':
        return Math.min((unlockedJutsu / achievement.requirement.value) * 100, 100);
      case 'rank':
        return Math.min((userStats.experience / achievement.requirement.value) * 100, 100);
      default:
        return 0;
    }
  };

  return (
    <>
      <View style={styles.achievementsContainer}>
        <View style={styles.header}>
          <Award size={24} color="#E67E22" />
          <Text style={styles.title}>Achievements</Text>
        </View>
        
        <View style={styles.achievementsList}>
          {achievements.map(achievement => {
            const progress = getProgressPercentage(achievement);
            
            return (
              <View
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  achievement.unlocked && styles.unlockedCard
                ]}
              >
                <View style={styles.achievementHeader}>
                  <Text style={[
                    styles.achievementIcon,
                    !achievement.unlocked && styles.lockedIcon
                  ]}>
                    {achievement.icon}
                  </Text>
                  <View style={styles.achievementInfo}>
                    <Text style={[
                      styles.achievementTitle,
                      !achievement.unlocked && styles.lockedText
                    ]}>
                      {achievement.title}
                    </Text>
                    <Text style={[
                      styles.achievementDescription,
                      !achievement.unlocked && styles.lockedText
                    ]}>
                      {achievement.description}
                    </Text>
                  </View>
                  {achievement.unlocked && (
                    <Star size={20} color="#F1C40F" />
                  )}
                </View>
                
                {!achievement.unlocked && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill,
                          { width: `${progress}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressText}>{Math.round(progress)}%</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{
                  scale: celebrationAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                }],
                opacity: celebrationAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ]}
          >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <X size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.celebrationTitle}>Achievement Unlocked!</Text>
            
            {newAchievement && (
              <>
                <Text style={styles.celebrationIcon}>{newAchievement.icon}</Text>
                <Text style={styles.celebrationName}>{newAchievement.title}</Text>
                <Text style={styles.celebrationDescription}>
                  {newAchievement.description}
                </Text>
              </>
            )}

            <TouchableOpacity
              style={styles.celebrationButton}
              onPress={() => setShowModal(false)}
            >
              <LinearGradient
                colors={['#F1C40F', '#E67E22']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Awesome!</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  achievementsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  achievementsList: {
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#34495E',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  unlockedCard: {
    borderColor: '#F1C40F',
    backgroundColor: '#2C3E50',
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  lockedIcon: {
    opacity: 0.5,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
  },
  lockedText: {
    color: '#7F8C8D',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#2C3E50',
    borderRadius: 2,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F1C40F',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
    minWidth: 35,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#34495E',
    borderRadius: 16,
    padding: 32,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F1C40F',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  celebrationTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#F1C40F',
    textAlign: 'center',
    marginBottom: 20,
  },
  celebrationIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  celebrationName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  celebrationDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  celebrationButton: {
    width: '100%',
  },
  buttonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});