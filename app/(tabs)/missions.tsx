import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Plus, Filter } from 'lucide-react-native';
import { MissionCard } from '@/components/MissionCard';
import { TutorialManager } from '@/components/TutorialManager';
import { useGameData } from '@/hooks/useGameData';

export default function Missions() {
  const { missions, toggleMission } = useGameData();
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');

  const filteredMissions = missions.filter(mission => {
    if (filter === 'completed') return mission.completed;
    if (filter === 'active') return !mission.completed;
    return true;
  });

  const completedCount = missions.filter(m => m.completed).length;
  const totalCount = missions.length;

  return (
    <TutorialManager tutorialId="missions" autoStart={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Mission Board</Text>
          <Text style={styles.subtitle}>
            {completedCount} of {totalCount} missions completed
          </Text>
          
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
              onPress={() => setFilter('all')}
            >
              <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>
                All ({totalCount})
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.filterButton, filter === 'active' && styles.activeFilter]}
              onPress={() => setFilter('active')}
            >
              <Text style={[styles.filterText, filter === 'active' && styles.activeFilterText]}>
                Active ({totalCount - completedCount})
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}
              onPress={() => setFilter('completed')}
            >
              <Text style={[styles.filterText, filter === 'completed' && styles.activeFilterText]}>
                Done ({completedCount})
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.missionsList} showsVerticalScrollIndicator={false}>
          {filteredMissions.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No missions found</Text>
              <Text style={styles.emptySubtext}>
                {filter === 'completed' 
                  ? 'Complete some missions to see them here'
                  : 'All missions are completed! Great work, ninja!'
                }
              </Text>
            </View>
          ) : (
            filteredMissions.map(mission => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onToggle={toggleMission}
              />
            ))
          )}
        </ScrollView>

        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </TutorialManager>
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
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#34495E',
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  activeFilter: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  filterText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#BDC3C7',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  missionsList: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#BDC3C7',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});