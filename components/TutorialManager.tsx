import React, { useEffect, useState } from 'react';
import { TutorialOverlay } from './TutorialOverlay';
import { useTutorial } from '@/hooks/useTutorial';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetElement?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  arrowDirection?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  instructor?: {
    name: string;
    emoji: string;
  };
}

// Tutorial definitions
const DASHBOARD_TUTORIAL: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to the Academy!',
    description: "Let's learn the ninja way together. I'll guide you through your training dashboard.",
    instructor: {
      name: 'Iruka-sensei',
      emoji: '👨‍🏫',
    },
  },
  {
    id: 'stats-intro',
    title: 'Your Ninja Stats',
    description: 'These six wheels show your ninja abilities. Complete missions to grow stronger in each area!',
    targetElement: { x: 20, y: 300, width: 350, height: 200 },
    arrowDirection: 'top',
    instructor: {
      name: 'Iruka-sensei',
      emoji: '👨‍🏫',
    },
  },
  {
    id: 'rank-system',
    title: 'Your Ninja Rank',
    description: 'This shows your current rank and progress. Earn experience by completing missions to advance!',
    targetElement: { x: 20, y: 100, width: 350, height: 180 },
    arrowDirection: 'bottom',
    instructor: {
      name: 'Iruka-sensei',
      emoji: '👨‍🏫',
    },
  },
  {
    id: 'mission-summary',
    title: 'Mission Overview',
    description: 'Track your daily progress, active streaks, and total missions. Consistency is the key to becoming a great ninja!',
    targetElement: { x: 20, y: 520, width: 350, height: 200 },
    arrowDirection: 'top',
    instructor: {
      name: 'Iruka-sensei',
      emoji: '👨‍🏫',
    },
  },
];

const MISSIONS_TUTORIAL: TutorialStep[] = [
  {
    id: 'mission-board',
    title: 'The Mission Board',
    description: 'Here you\'ll find all your training missions. Each mission strengthens specific ninja abilities.',
    instructor: {
      name: 'Iruka-sensei',
      emoji: '👨‍🏫',
    },
  },
  {
    id: 'mission-filters',
    title: 'Mission Filters',
    description: 'Use these filters to organize your missions. Focus on active missions or review completed ones.',
    targetElement: { x: 20, y: 140, width: 350, height: 40 },
    arrowDirection: 'bottom',
    instructor: {
      name: 'Iruka-sensei',
      emoji: '👨‍🏫',
    },
  },
  {
    id: 'mission-completion',
    title: 'Complete Missions',
    description: 'Tap any mission to mark it complete. You\'ll earn stat points and experience for your progress!',
    targetElement: { x: 20, y: 200, width: 350, height: 120 },
    arrowDirection: 'top',
    instructor: {
      name: 'Iruka-sensei',
      emoji: '👨‍🏫',
    },
  },
];

interface TutorialManagerProps {
  tutorialId: string;
  children: React.ReactNode;
  autoStart?: boolean;
}

export function TutorialManager({ tutorialId, children, autoStart = false }: TutorialManagerProps) {
  const { tutorialState, startTutorial, nextStep, skipTutorial, completeTutorial, isTutorialCompleted } = useTutorial();
  const [currentTutorial, setCurrentTutorial] = useState<TutorialStep[]>([]);

  useEffect(() => {
    // Set tutorial steps based on tutorialId
    switch (tutorialId) {
      case 'dashboard':
        setCurrentTutorial(DASHBOARD_TUTORIAL);
        break;
      case 'missions':
        setCurrentTutorial(MISSIONS_TUTORIAL);
        break;
      default:
        setCurrentTutorial([]);
    }

    // Auto-start tutorial if not completed
    if (autoStart && !isTutorialCompleted(tutorialId)) {
      const steps = tutorialId === 'dashboard' ? DASHBOARD_TUTORIAL : 
                   tutorialId === 'missions' ? MISSIONS_TUTORIAL : [];
      if (steps.length > 0) {
        setTimeout(() => startTutorial(tutorialId, steps), 1000);
      }
    }
  }, [tutorialId, autoStart, isTutorialCompleted, startTutorial]);

  const handleNext = () => {
    nextStep(currentTutorial.length);
  };

  const handleSkip = () => {
    skipTutorial();
  };

  const handleClose = () => {
    completeTutorial(tutorialId);
  };

  const currentStep = currentTutorial[tutorialState.currentStepIndex];

  return (
    <>
      {children}
      <TutorialOverlay
        visible={tutorialState.isActive && currentTutorial.length > 0}
        currentStep={currentStep}
        onNext={handleNext}
        onSkip={handleSkip}
        onClose={handleClose}
        totalSteps={currentTutorial.length}
        currentStepIndex={tutorialState.currentStepIndex}
      />
    </>
  );
}