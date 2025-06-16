import { useState, useEffect } from 'react';
import { DEFAULT_MISSIONS, JUTSU_LIST, UserStats, Mission, Jutsu } from '@/data/gameData';

export function useGameData() {
  const [userStats, setUserStats] = useState<UserStats>({
    chakra: 50,
    strength: 30,
    intelligence: 40,
    agility: 25,
    stamina: 35,
    charisma: 20,
    experience: 150,
    level: 1,
  });

  const [missions, setMissions] = useState<Mission[]>(DEFAULT_MISSIONS);
  const [jutsuList, setJutsuList] = useState<Jutsu[]>(JUTSU_LIST);

  const toggleMission = (missionId: string) => {
    setMissions(prevMissions => 
      prevMissions.map(mission => {
        if (mission.id === missionId) {
          const wasCompleted = mission.completed;
          const newCompleted = !wasCompleted;
          
          if (newCompleted && !wasCompleted) {
            // Mission completed - add rewards
            setUserStats(prevStats => {
              const newStats = { ...prevStats };
              Object.entries(mission.statRewards).forEach(([stat, value]) => {
                const statKey = stat.toLowerCase() as keyof UserStats;
                if (typeof newStats[statKey] === 'number') {
                  (newStats[statKey] as number) += value;
                }
              });
              newStats.experience += mission.experienceReward;
              return newStats;
            });

            return {
              ...mission,
              completed: newCompleted,
              streak: mission.streak + 1,
              lastCompleted: new Date(),
            };
          } else if (!newCompleted && wasCompleted) {
            // Mission uncompleted - remove rewards
            setUserStats(prevStats => {
              const newStats = { ...prevStats };
              Object.entries(mission.statRewards).forEach(([stat, value]) => {
                const statKey = stat.toLowerCase() as keyof UserStats;
                if (typeof newStats[statKey] === 'number') {
                  (newStats[statKey] as number) = Math.max(0, (newStats[statKey] as number) - value);
                }
              });
              newStats.experience = Math.max(0, newStats.experience - mission.experienceReward);
              return newStats;
            });

            return {
              ...mission,
              completed: newCompleted,
            };
          }
        }
        return mission;
      })
    );
  };

  const checkUnlockedJutsu = () => {
    setJutsuList(prevJutsu =>
      prevJutsu.map(jutsu => {
        const statValue = userStats[jutsu.requiredStat.toLowerCase() as keyof UserStats] as number;
        return {
          ...jutsu,
          unlocked: statValue >= jutsu.requiredValue
        };
      })
    );
  };

  useEffect(() => {
    checkUnlockedJutsu();
  }, [userStats]);

  const getCompletedMissionsToday = () => {
    const today = new Date().toDateString();
    return missions.filter(mission => 
      mission.completed && 
      mission.lastCompleted?.toDateString() === today
    ).length;
  };

  const getTotalActiveStreaks = () => {
    return missions.reduce((total, mission) => total + mission.streak, 0);
  };

  return {
    userStats,
    missions,
    jutsuList,
    toggleMission,
    getCompletedMissionsToday,
    getTotalActiveStreaks,
  };
}