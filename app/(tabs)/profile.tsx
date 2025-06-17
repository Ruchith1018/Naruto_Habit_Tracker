import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Settings, CreditCard as Edit, Award, Calendar, Target, Flame, Crown } from 'lucide-react-native';
import { VillageLeaderboard } from '@/components/VillageLeaderboard';
import { useGameData } from '@/hooks/useGameData';
import { getCurrentRank, NINJA_RANKS } from '@/data/gameData';

export default function Profile() {
  const { userStats, missions, getTotalActiveStreaks } = useGameData();
  const currentRank = getCurrentRank(userStats.experience);
  const totalMissions = missions.length;
  const completedMissions = missions.filter(m => m.completed).length;
  const totalStreaks = getTotalActiveStreaks();
  const joinDate = 'November 2024'; // This would be dynamic in a real app

  const villages = [
    { name: 'Hidden Leaf', symbol: '🍃', selected: true },
    { name: 'Hidden Sand', symbol: '🏜️', selected: false },
    { name: 'Hidden Mist', symbol: '🌊', selected: false },
    { name: 'Hidden Cloud', symbol: '⚡', selected: false },
    { name: 'Hidden Rock', symbol: '🗻', selected: false },
  ];

  const selectedVillage = villages.find(v => v.selected) || villages[0];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>🥷</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Edit size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.username}>Young Ninja</Text>
            <Text style={styles.village}>{selectedVillage.symbol} {selectedVillage.name}</Text>
            <Text style={styles.joinDate}>Joined {joinDate}</Text>
          </View>
        </View>

        <View style={styles.rankDisplay}>
          <Text style={styles.rankBadge}>{currentRank.badge}</Text>
          <Text style={styles.rankName}>{currentRank.name}</Text>
        </View>
      </View>

      <View style={styles.statsOverview}>
        <Text style={styles.sectionTitle}>Profile Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Target size={24} color="#FF6B35" />
            <Text style={styles.statValue}>{completedMissions}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          
          <View style={styles.statCard}>
            <Flame size={24} color="#E74C3C" />
            <Text style={styles.statValue}>{totalStreaks}</Text>
            <Text style={styles.statLabel}>Total Streaks</Text>
          </View>
          
          <View style={styles.statCard}>
            <Calendar size={24} color="#2ECC71" />
            <Text style={styles.statValue}>{totalMissions}</Text>
            <Text style={styles.statLabel}>Total Missions</Text>
          </View>
          
          <View style={styles.statCard}>
            <Award size={24} color="#F1C40F" />
            <Text style={styles.statValue}>{userStats.experience}</Text>
            <Text style={styles.statLabel}>Experience</Text>
          </View>
        </View>
      </View>

      <View style={styles.villageLeaderboardSection}>
        <VillageLeaderboard 
          userVillage="leaf" 
          userContribution={userStats.experience}
        />
      </View>

      <View style={styles.villageSection}>
        <Text style={styles.sectionTitle}>Choose Your Village</Text>
        <View style={styles.villageGrid}>
          {villages.map((village, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.villageCard,
                village.selected && styles.selectedVillage
              ]}
            >
              <Text style={styles.villageSymbol}>{village.symbol}</Text>
              <Text style={styles.villageName}>{village.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.ninjaWaySection}>
        <Text style={styles.sectionTitle}>Your Ninja Way</Text>
        <View style={styles.ninjaWayCard}>
          <Text style={styles.ninjaWayText}>
            "I will never give up on my dreams, no matter how impossible they may seem. 
            Every day is a chance to become stronger and help others along the way."
          </Text>
          <TouchableOpacity style={styles.editNinjaWay}>
            <Edit size={16} color="#FF6B35" />
            <Text style={styles.editNinjaWayText}>Edit Your Way</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Ninja Path Progress</Text>
        <View style={styles.ranksTimeline}>
          {NINJA_RANKS.map((rank, index) => (
            <View key={index} style={styles.rankItem}>
              <View style={[
                styles.rankIndicator,
                userStats.experience >= rank.minExperience && styles.achievedRank,
                currentRank.name === rank.name && styles.currentRankIndicator
              ]}>
                <Text style={styles.rankEmoji}>{rank.badge}</Text>
              </View>
              <View style={styles.rankDetails}>
                <Text style={[
                  styles.rankItemName,
                  userStats.experience >= rank.minExperience && styles.achievedRankText,
                  currentRank.name === rank.name && styles.currentRankText
                ]}>
                  {rank.name}
                </Text>
                <Text style={styles.rankRequirement}>
                  {rank.minExperience} XP required
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.settingsButton}>
        <Settings size={20} color="#FFFFFF" />
        <Text style={styles.settingsText}>Settings</Text>
      </TouchableOpacity>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  avatarText: {
    fontSize: 32,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#34495E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  village: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
    marginBottom: 2,
  },
  joinDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
  },
  rankDisplay: {
    alignItems: 'center',
  },
  rankBadge: {
    fontSize: 32,
    marginBottom: 4,
  },
  rankName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  statsOverview: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#34495E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
  },
  villageLeaderboardSection: {
    marginBottom: 20,
  },
  villageSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  villageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  villageCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#34495E',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  selectedVillage: {
    borderColor: '#FF6B35',
    backgroundColor: '#2C3E50',
  },
  villageSymbol: {
    fontSize: 24,
    marginBottom: 4,
  },
  villageName: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  ninjaWaySection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  ninjaWayCard: {
    backgroundColor: '#34495E',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  ninjaWayText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    lineHeight: 20,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  editNinjaWay: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  editNinjaWayText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
    marginLeft: 4,
  },
  progressSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  ranksTimeline: {
    gap: 16,
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#34495E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#4A5568',
  },
  achievedRank: {
    backgroundColor: '#2ECC71',
    borderColor: '#2ECC71',
  },
  currentRankIndicator: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  rankEmoji: {
    fontSize: 16,
  },
  rankDetails: {
    flex: 1,
  },
  rankItemName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#7F8C8D',
    marginBottom: 2,
  },
  achievedRankText: {
    color: '#FFFFFF',
  },
  currentRankText: {
    color: '#FF6B35',
  },
  rankRequirement: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34495E',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  settingsText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});