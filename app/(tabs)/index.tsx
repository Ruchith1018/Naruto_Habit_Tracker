import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Star, Flame, Target, TrendingUp } from 'lucide-react-native';
import { StatWheel } from '@/components/StatWheel';
import { useGameData } from '@/hooks/useGameData';
import { getCurrentRank, getNextRank } from '@/data/gameData';

export default function Dashboard() {
  const { userStats, missions, getCompletedMissionsToday, getTotalActiveStreaks } = useGameData();
  
  const currentRank = getCurrentRank(userStats.experience);
  const nextRank = getNextRank(userStats.experience);
  const completedToday = getCompletedMissionsToday();
  const totalStreaks = getTotalActiveStreaks();

  const progressToNextRank = nextRank 
    ? ((userStats.experience - currentRank.minExperience) / (nextRank.minExperience - currentRank.minExperience)) * 100
    : 100;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#2C3E50', '#34495E', '#4A5568']}
        style={styles.header}
      >
        <View style={styles.rankContainer}>
          <Text style={styles.rankBadge}>{currentRank.badge}</Text>
          <View style={styles.rankInfo}>
            <Text style={styles.rankName}>{currentRank.name}</Text>
            <Text style={styles.experienceText}>{userStats.experience} XP</Text>
          </View>
        </View>

        {nextRank && (
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>
              Progress to {nextRank.name}: {Math.round(progressToNextRank)}%
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progressToNextRank}%`, backgroundColor: nextRank.color }
                ]} 
              />
            </View>
            <Text style={styles.nextRankText}>
              {nextRank.minExperience - userStats.experience} XP needed
            </Text>
          </View>
        )}
      </LinearGradient>

      <View style={styles.statsGrid}>
        <Text style={styles.sectionTitle}>Ninja Attributes</Text>
        <View style={styles.statsRow}>
          <StatWheel
            label="Chakra"
            value={userStats.chakra}
            maxValue={1000}
            color="#3498DB"
          />
          <StatWheel
            label="Strength"
            value={userStats.strength}
            maxValue={1000}
            color="#E74C3C"
          />
          <StatWheel
            label="Intelligence"
            value={userStats.intelligence}
            maxValue={1000}
            color="#9B59B6"
          />
        </View>
        <View style={styles.statsRow}>
          <StatWheel
            label="Agility"
            value={userStats.agility}
            maxValue={1000}
            color="#2ECC71"
          />
          <StatWheel
            label="Stamina"
            value={userStats.stamina}
            maxValue={1000}
            color="#F39C12"
          />
          <StatWheel
            label="Charisma"
            value={userStats.charisma}
            maxValue={1000}
            color="#1ABC9C"
          />
        </View>
      </View>

      <View style={styles.summaryGrid}>
        <TouchableOpacity style={[styles.summaryCard, styles.todayCard]}>
          <Target size={24} color="#FF6B35" />
          <Text style={styles.summaryValue}>{completedToday}</Text>
          <Text style={styles.summaryLabel}>Missions Today</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.summaryCard, styles.streakCard]}>
          <Flame size={24} color="#E74C3C" />
          <Text style={styles.summaryValue}>{totalStreaks}</Text>
          <Text style={styles.summaryLabel}>Active Streaks</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.summaryCard, styles.totalCard]}>
          <Star size={24} color="#F1C40F" />
          <Text style={styles.summaryValue}>{missions.length}</Text>
          <Text style={styles.summaryLabel}>Total Missions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.summaryCard, styles.levelCard]}>
          <TrendingUp size={24} color="#9B59B6" />
          <Text style={styles.summaryValue}>{userStats.level}</Text>
          <Text style={styles.summaryLabel}>Ninja Level</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          "The true measure of a ninja is not their power, but their dedication to improvement."
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A252F',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rankBadge: {
    fontSize: 40,
    marginRight: 16,
  },
  rankInfo: {
    flex: 1,
  },
  rankName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  experienceText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
  },
  progressContainer: {
    marginTop: 10,
  },
  progressLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#34495E',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  nextRankText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
  },
  statsGrid: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap: 12,
  },
  summaryCard: {
    width: '48%',
    backgroundColor: '#34495E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  todayCard: {
    borderColor: '#FF6B35',
  },
  streakCard: {
    borderColor: '#E74C3C',
  },
  totalCard: {
    borderColor: '#F1C40F',
  },
  levelCard: {
    borderColor: '#9B59B6',
  },
  summaryValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});