import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Crown, Users, TrendingUp, Award } from 'lucide-react-native';

interface VillageStats {
  id: string;
  name: string;
  symbol: string;
  totalMembers: number;
  totalExperience: number;
  averageLevel: number;
  completedMissions: number;
  color: string;
}

interface VillageLeaderboardProps {
  userVillage: string;
  userContribution: number;
}

// Mock data - in a real app this would come from a server
const VILLAGE_DATA: VillageStats[] = [
  {
    id: 'leaf',
    name: 'Hidden Leaf Village',
    symbol: '🍃',
    totalMembers: 1247,
    totalExperience: 2847392,
    averageLevel: 23,
    completedMissions: 18493,
    color: '#2ECC71',
  },
  {
    id: 'sand',
    name: 'Hidden Sand Village',
    symbol: '🏜️',
    totalMembers: 892,
    totalExperience: 1923847,
    averageLevel: 21,
    completedMissions: 12847,
    color: '#F39C12',
  },
  {
    id: 'mist',
    name: 'Hidden Mist Village',
    symbol: '🌊',
    totalMembers: 743,
    totalExperience: 1647293,
    averageLevel: 22,
    completedMissions: 9847,
    color: '#3498DB',
  },
  {
    id: 'cloud',
    name: 'Hidden Cloud Village',
    symbol: '⚡',
    totalMembers: 634,
    totalExperience: 1384729,
    averageLevel: 20,
    completedMissions: 8293,
    color: '#9B59B6',
  },
  {
    id: 'stone',
    name: 'Hidden Stone Village',
    symbol: '🗻',
    totalMembers: 567,
    totalExperience: 1192847,
    averageLevel: 19,
    completedMissions: 7384,
    color: '#95A5A6',
  },
];

export function VillageLeaderboard({ userVillage, userContribution }: VillageLeaderboardProps) {
  const [villages, setVillages] = useState<VillageStats[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<'experience' | 'missions' | 'members'>('experience');

  useEffect(() => {
    // Sort villages based on selected metric
    const sortedVillages = [...VILLAGE_DATA].sort((a, b) => {
      switch (selectedMetric) {
        case 'experience':
          return b.totalExperience - a.totalExperience;
        case 'missions':
          return b.completedMissions - a.completedMissions;
        case 'members':
          return b.totalMembers - a.totalMembers;
        default:
          return 0;
      }
    });
    setVillages(sortedVillages);
  }, [selectedMetric]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getMetricValue = (village: VillageStats) => {
    switch (selectedMetric) {
      case 'experience':
        return formatNumber(village.totalExperience);
      case 'missions':
        return formatNumber(village.completedMissions);
      case 'members':
        return formatNumber(village.totalMembers);
      default:
        return '0';
    }
  };

  const userVillageData = villages.find(v => v.id === userVillage);
  const userVillageRank = villages.findIndex(v => v.id === userVillage) + 1;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Crown size={24} color="#F1C40F" />
        <Text style={styles.title}>Village Rankings</Text>
      </View>

      <View style={styles.metricSelector}>
        <TouchableOpacity
          style={[styles.metricButton, selectedMetric === 'experience' && styles.activeMetric]}
          onPress={() => setSelectedMetric('experience')}
        >
          <TrendingUp size={16} color={selectedMetric === 'experience' ? '#FFFFFF' : '#BDC3C7'} />
          <Text style={[styles.metricText, selectedMetric === 'experience' && styles.activeMetricText]}>
            Experience
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.metricButton, selectedMetric === 'missions' && styles.activeMetric]}
          onPress={() => setSelectedMetric('missions')}
        >
          <Award size={16} color={selectedMetric === 'missions' ? '#FFFFFF' : '#BDC3C7'} />
          <Text style={[styles.metricText, selectedMetric === 'missions' && styles.activeMetricText]}>
            Missions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.metricButton, selectedMetric === 'members' && styles.activeMetric]}
          onPress={() => setSelectedMetric('members')}
        >
          <Users size={16} color={selectedMetric === 'members' ? '#FFFFFF' : '#BDC3C7'} />
          <Text style={[styles.metricText, selectedMetric === 'members' && styles.activeMetricText]}>
            Members
          </Text>
        </TouchableOpacity>
      </View>

      {userVillageData && (
        <View style={[styles.userVillageCard, { borderColor: userVillageData.color }]}>
          <View style={styles.userVillageHeader}>
            <Text style={styles.userVillageSymbol}>{userVillageData.symbol}</Text>
            <View style={styles.userVillageInfo}>
              <Text style={styles.userVillageName}>Your Village: {userVillageData.name}</Text>
              <Text style={styles.userVillageRank}>Rank #{userVillageRank}</Text>
            </View>
            <Text style={styles.userContribution}>+{userContribution}</Text>
          </View>
        </View>
      )}

      <ScrollView style={styles.leaderboard} showsVerticalScrollIndicator={false}>
        {villages.map((village, index) => (
          <View
            key={village.id}
            style={[
              styles.villageCard,
              village.id === userVillage && styles.userVillageHighlight,
              { borderLeftColor: village.color }
            ]}
          >
            <View style={styles.rankContainer}>
              <Text style={styles.rankText}>{getRankIcon(index + 1)}</Text>
            </View>

            <View style={styles.villageInfo}>
              <View style={styles.villageHeader}>
                <Text style={styles.villageSymbol}>{village.symbol}</Text>
                <Text style={styles.villageName}>{village.name}</Text>
              </View>
              <View style={styles.villageStats}>
                <Text style={styles.primaryStat}>{getMetricValue(village)}</Text>
                <Text style={styles.statLabel}>
                  {selectedMetric === 'experience' ? 'Total XP' :
                   selectedMetric === 'missions' ? 'Missions' : 'Members'}
                </Text>
              </View>
            </View>

            <View style={styles.additionalStats}>
              <Text style={styles.additionalStat}>Avg Level: {village.averageLevel}</Text>
              <Text style={styles.additionalStat}>{village.totalMembers} ninjas</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Rankings update daily based on collective village performance
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A252F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  metricSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  metricButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#34495E',
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  activeMetric: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  metricText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#BDC3C7',
    marginLeft: 4,
  },
  activeMetricText: {
    color: '#FFFFFF',
  },
  userVillageCard: {
    backgroundColor: '#34495E',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 2,
  },
  userVillageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userVillageSymbol: {
    fontSize: 24,
    marginRight: 12,
  },
  userVillageInfo: {
    flex: 1,
  },
  userVillageName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  userVillageRank: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
  },
  userContribution: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#2ECC71',
  },
  leaderboard: {
    flex: 1,
    paddingHorizontal: 20,
  },
  villageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34495E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  userVillageHighlight: {
    backgroundColor: '#2C3E50',
    borderColor: '#FF6B35',
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  villageInfo: {
    flex: 1,
  },
  villageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  villageSymbol: {
    fontSize: 20,
    marginRight: 8,
  },
  villageName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  villageStats: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  primaryStat: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
    marginRight: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
  },
  additionalStats: {
    alignItems: 'flex-end',
  },
  additionalStat: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#7F8C8D',
    marginBottom: 2,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#7F8C8D',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});