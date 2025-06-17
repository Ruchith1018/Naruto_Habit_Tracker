export interface NinjaRank {
  name: string;
  minExperience: number;
  color: string;
  badge: string;
}

export interface Mission {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  statRewards: { [key: string]: number };
  experienceReward: number;
  completed: boolean;
  streak: number;
  lastCompleted?: Date;
}

export interface Jutsu {
  id: string;
  name: string;
  description: string;
  requiredStat: string;
  requiredValue: number;
  effect: string;
  cooldownHours: number;
  lastUsed?: Date;
  unlocked: boolean;
}

export interface UserStats {
  chakra: number;
  strength: number;
  intelligence: number;
  agility: number;
  stamina: number;
  charisma: number;
  experience: number;
  level: number;
}

export const NINJA_RANKS: NinjaRank[] = [
  { name: 'Academy Student', minExperience: 0, color: '#95A5A6', badge: '🎓' },
  { name: 'Genin', minExperience: 100, color: '#3498DB', badge: '🥋' },
  { name: 'Chunin', minExperience: 500, color: '#9B59B6', badge: '⚔️' },
  { name: 'Special Jonin', minExperience: 1200, color: '#E67E22', badge: '🗡️' },
  { name: 'Jonin', minExperience: 2500, color: '#E74C3C', badge: '🛡️' },
  { name: 'ANBU', minExperience: 5000, color: '#2C3E50', badge: '🎭' },
  { name: 'Kage', minExperience: 10000, color: '#F1C40F', badge: '👑' },
];

export const DEFAULT_MISSIONS: Mission[] = [
  {
    id: '1',
    title: 'Morning Meditation Training',
    category: 'Chakra Control',
    difficulty: 'Easy',
    statRewards: { Chakra: 10, Stamina: 5 },
    experienceReward: 15,
    completed: false,
    streak: 0,
  },
  {
    id: '2',
    title: 'Physical Conditioning',
    category: 'Physical Training',
    difficulty: 'Medium',
    statRewards: { Strength: 15, Stamina: 10 },
    experienceReward: 25,
    completed: false,
    streak: 0,
  },
  {
    id: '3',
    title: 'Knowledge Scroll Study',
    category: 'Mental Training',
    difficulty: 'Easy',
    statRewards: { Intelligence: 12, Chakra: 3 },
    experienceReward: 18,
    completed: false,
    streak: 0,
  },
  {
    id: '4',
    title: 'Team Building Exercise',
    category: 'Social Bonds',
    difficulty: 'Medium',
    statRewards: { Charisma: 15, Intelligence: 5 },
    experienceReward: 22,
    completed: false,
    streak: 0,
  },
  {
    id: '5',
    title: 'Stealth Movement Practice',
    category: 'Stealth Operations',
    difficulty: 'Hard',
    statRewards: { Agility: 20, Chakra: 8 },
    experienceReward: 35,
    completed: false,
    streak: 0,
  },
  {
    id: '6',
    title: 'Medical Ninjutsu Training',
    category: 'Medical Jutsu',
    difficulty: 'Medium',
    statRewards: { Intelligence: 10, Chakra: 10, Stamina: 5 },
    experienceReward: 28,
    completed: false,
    streak: 0,
  }
];

export const JUTSU_LIST: Jutsu[] = [
  {
    id: '1',
    name: 'Shadow Clone Technique',
    description: 'Create shadow clones to help with multiple tasks',
    requiredStat: 'Chakra',
    requiredValue: 100,
    effect: 'Complete 2 missions simultaneously for the next hour',
    cooldownHours: 24,
    unlocked: false,
  },
  {
    id: '2',
    name: 'Leaf Hurricane',
    description: 'Protect your mission streaks with powerful winds',
    requiredStat: 'Strength',
    requiredValue: 80,
    effect: 'Streak protection - prevents streak loss for 24 hours',
    cooldownHours: 48,
    unlocked: false,
  },
  {
    id: '3',
    name: 'Mind Transfer Jutsu',
    description: 'Transfer your consciousness to skip difficult tasks',
    requiredStat: 'Intelligence',
    requiredValue: 120,
    effect: 'Skip one mission without breaking your streak',
    cooldownHours: 168, // 1 week
    unlocked: false,
  },
  {
    id: '4',
    name: 'Body Flicker Technique',
    description: 'Move at incredible speed to complete tasks faster',
    requiredStat: 'Agility',
    requiredValue: 90,
    effect: 'Reduce all mission cooldowns by 50% for 2 hours',
    cooldownHours: 72,
    unlocked: false,
  },
  {
    id: '5',
    name: 'Rasengan',
    description: 'Channel your chakra into a powerful spinning sphere',
    requiredStat: 'Chakra',
    requiredValue: 200,
    effect: 'Double XP and stat gains for the next 3 missions',
    cooldownHours: 48,
    unlocked: false,
  },
];

export function getCurrentRank(experience: number): NinjaRank {
  const sortedRanks = [...NINJA_RANKS].sort((a, b) => b.minExperience - a.minExperience);
  return sortedRanks.find(rank => experience >= rank.minExperience) || NINJA_RANKS[0];
}

export function getNextRank(experience: number): NinjaRank | null {
  const currentRank = getCurrentRank(experience);
  const currentIndex = NINJA_RANKS.findIndex(rank => rank.name === currentRank.name);
  return currentIndex < NINJA_RANKS.length - 1 ? NINJA_RANKS[currentIndex + 1] : null;
}