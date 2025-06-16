import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CircleCheck as CheckCircle, Circle, Flame, Brain, Heart, Shield, Zap, Users } from 'lucide-react-native';

interface MissionCardProps {
  mission: {
    id: string;
    title: string;
    category: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    statRewards: { [key: string]: number };
    completed: boolean;
    streak: number;
  };
  onToggle: (missionId: string) => void;
}

const categoryIcons = {
  'Physical Training': Flame,
  'Mental Training': Brain,
  'Chakra Control': Heart,
  'Social Bonds': Users,
  'Stealth Operations': Shield,
  'Medical Jutsu': Zap,
};

const categoryColors = {
  'Physical Training': '#E74C3C',
  'Mental Training': '#9B59B6',
  'Chakra Control': '#3498DB',
  'Social Bonds': '#F39C12',
  'Stealth Operations': '#2ECC71',
  'Medical Jutsu': '#1ABC9C',
};

export function MissionCard({ mission, onToggle }: MissionCardProps) {
  const IconComponent = categoryIcons[mission.category as keyof typeof categoryIcons] || Circle;
  const categoryColor = categoryColors[mission.category as keyof typeof categoryColors] || '#7F8C8D';

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#2ECC71';
      case 'Medium': return '#F39C12';
      case 'Hard': return '#E74C3C';
      default: return '#7F8C8D';
    }
  };

  const getDifficultyStars = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '★';
      case 'Medium': return '★★';
      case 'Hard': return '★★★';
      default: return '★';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        mission.completed && styles.completedContainer
      ]}
      onPress={() => onToggle(mission.id)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <IconComponent size={20} color={categoryColor} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, mission.completed && styles.completedTitle]}>
            {mission.title}
          </Text>
          <Text style={styles.category}>{mission.category}</Text>
        </View>
        <View style={styles.statusContainer}>
          {mission.completed ? (
            <CheckCircle size={24} color="#2ECC71" />
          ) : (
            <Circle size={24} color="#7F8C8D" />
          )}
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.difficultyContainer}>
          <Text style={[styles.difficulty, { color: getDifficultyColor(mission.difficulty) }]}>
            {getDifficultyStars(mission.difficulty)} {mission.difficulty}
          </Text>
        </View>
        
        {mission.streak > 0 && (
          <View style={styles.streakContainer}>
            <Flame size={14} color="#FF6B35" />
            <Text style={styles.streakText}>{mission.streak} day streak</Text>
          </View>
        )}
      </View>

      <View style={styles.rewards}>
        {Object.entries(mission.statRewards).map(([stat, value]) => (
          <View key={stat} style={styles.reward}>
            <Text style={styles.rewardStat}>{stat}</Text>
            <Text style={styles.rewardValue}>+{value}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#34495E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  completedContainer: {
    backgroundColor: '#2D3748',
    borderColor: '#2ECC71',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2C3E50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#BDC3C7',
  },
  category: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
  },
  statusContainer: {
    marginLeft: 12,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  difficultyContainer: {
    flex: 1,
  },
  difficulty: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#FF6B35',
    marginLeft: 4,
  },
  rewards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  reward: {
    backgroundColor: '#2C3E50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardStat: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
    marginRight: 4,
  },
  rewardValue: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#2ECC71',
  },
});