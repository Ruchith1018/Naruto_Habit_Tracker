import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ChartBar as BarChart3, TrendingUp, Award, Zap } from 'lucide-react-native';
import { StatWheel } from '@/components/StatWheel';
import { JutsuActivation } from '@/components/JutsuActivation';
import { useGameData } from '@/hooks/useGameData';
import { getCurrentRank } from '@/data/gameData';

export default function Stats() {
  const { userStats, jutsuList, activateJutsu } = useGameData();
  const currentRank = getCurrentRank(userStats.experience);
  const unlockedJutsu = jutsuList.filter(jutsu => jutsu.unlocked);

  const statColors = {
    chakra: '#3498DB',
    strength: '#E74C3C', 
    intelligence: '#9B59B6',
    agility: '#2ECC71',
    stamina: '#F39C12',
    charisma: '#1ABC9C',
  };

  const statData = [
    { name: 'Chakra', value: userStats.chakra, color: statColors.chakra },
    { name: 'Strength', value: userStats.strength, color: statColors.strength },
    { name: 'Intelligence', value: userStats.intelligence, color: statColors.intelligence },
    { name: 'Agility', value: userStats.agility, color: statColors.agility },
    { name: 'Stamina', value: userStats.stamina, color: statColors.stamina },
    { name: 'Charisma', value: userStats.charisma, color: statColors.charisma },
  ];

  const totalStats = Object.values(userStats)
    .filter((value, index) => index < 6) // Only count the 6 main stats
    .reduce((sum, value) => sum + (value as number), 0);

  const handleJutsuActivation = (jutsuId: string) => {
    // In a real app, this would trigger the jutsu effect
    console.log(`Activated jutsu: ${jutsuId}`);
    // You could add visual effects, temporary stat boosts, etc.
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Ninja Statistics</Text>
        <Text style={styles.subtitle}>Track your ninja development</Text>
      </View>

      <View style={styles.overviewCard}>
        <View style={styles.overviewHeader}>
          <BarChart3 size={24} color="#FF6B35" />
          <Text style={styles.overviewTitle}>Power Overview</Text>
        </View>
        <View style={styles.overviewStats}>
          <View style={styles.overviewStat}>
            <Text style={styles.overviewValue}>{totalStats}</Text>
            <Text style={styles.overviewLabel}>Total Power</Text>
          </View>
          <View style={styles.overviewStat}>
            <Text style={styles.overviewValue}>{currentRank.name}</Text>
            <Text style={styles.overviewLabel}>Current Rank</Text>
          </View>
          <View style={styles.overviewStat}>
            <Text style={styles.overviewValue}>{userStats.experience}</Text>
            <Text style={styles.overviewLabel}>Experience</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Detailed Stats</Text>
        <View style={styles.statsGrid}>
          {statData.map((stat, index) => (
            <View key={stat.name} style={styles.statItem}>
              <StatWheel
                label={stat.name}
                value={stat.value}
                maxValue={1000}
                color={stat.color}
                size={90}
              />
              <View style={styles.statDetails}>
                <Text style={styles.statValue}>{stat.value}/1000</Text>
                <View style={styles.statBar}>
                  <View 
                    style={[
                      styles.statBarFill, 
                      { 
                        width: `${(stat.value / 1000) * 100}%`,
                        backgroundColor: stat.color 
                      }
                    ]} 
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.jutsuSection}>
        <View style={styles.jutsuHeader}>
          <Zap size={24} color="#F1C40F" />
          <Text style={styles.sectionTitle}>Jutsu Collection</Text>
        </View>
        {jutsuList.length === 0 ? (
          <View style={styles.emptyJutsu}>
            <Text style={styles.emptyText}>No jutsu available yet</Text>
            <Text style={styles.emptySubtext}>
              Increase your stats to unlock powerful techniques
            </Text>
          </View>
        ) : (
          <View style={styles.jutsuList}>
            {jutsuList.map(jutsu => (
              <JutsuActivation
                key={jutsu.id}
                jutsu={jutsu}
                onActivate={handleJutsuActivation}
              />
            ))}
          </View>
        )}
      </View>

      <View style={styles.achievementsSection}>
        <View style={styles.achievementHeader}>
          <Award size={24} color="#E67E22" />
          <Text style={styles.sectionTitle}>Achievements</Text>
        </View>
        <View style={styles.achievementsList}>
          <View style={styles.achievementCard}>
            <Text style={styles.achievementTitle}>🥇 First Steps</Text>
            <Text style={styles.achievementDesc}>Complete your first mission</Text>
          </View>
          <View style={styles.achievementCard}>
            <Text style={styles.achievementTitle}>🔥 On Fire</Text>
            <Text style={styles.achievementDesc}>Maintain a 7-day streak</Text>
          </View>
          <View style={styles.achievementCard}>
            <Text style={styles.achievementTitle}>📚 Scholar</Text>
            <Text style={styles.achievementDesc}>Reach 100 Intelligence</Text>
          </View>
        </View>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#2C3E50',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
  },
  overviewCard: {
    margin: 20,
    backgroundColor: '#34495E',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  overviewTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewStat: {
    alignItems: 'center',
  },
  overviewValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  overviewLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  statsGrid: {
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34495E',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  statDetails: {
    flex: 1,
    marginLeft: 16,
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  statBar: {
    height: 6,
    backgroundColor: '#2C3E50',
    borderRadius: 3,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  jutsuSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  jutsuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyJutsu: {
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
    textAlign: 'center',
  },
  jutsuList: {
    gap: 12,
  },
  achievementsSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
  },
});