import { useState, useEffect } from 'react';

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

interface TutorialState {
  isActive: boolean;
  currentStepIndex: number;
  completedTutorials: string[];
}

const defaultTutorialState: TutorialState = {
  isActive: false,
  currentStepIndex: 0,
  completedTutorials: [],
};

export function useTutorial() {
  const [tutorialState, setTutorialState] = useState<TutorialState>(defaultTutorialState);

  useEffect(() => {
    // Load tutorial state from storage
    const savedState = localStorage.getItem('tutorialState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setTutorialState(parsed);
      } catch (error) {
        console.error('Failed to parse tutorial state:', error);
      }
    }
  }, []);

  const saveTutorialState = (state: TutorialState) => {
    setTutorialState(state);
    localStorage.setItem('tutorialState', JSON.stringify(state));
  };

  const startTutorial = (tutorialId: string, steps: TutorialStep[]) => {
    if (tutorialState.completedTutorials.includes(tutorialId)) {
      return; // Tutorial already completed
    }

    saveTutorialState({
      ...tutorialState,
      isActive: true,
      currentStepIndex: 0,
    });
  };

  const nextStep = (totalSteps: number) => {
    if (tutorialState.currentStepIndex < totalSteps - 1) {
      saveTutorialState({
        ...tutorialState,
        currentStepIndex: tutorialState.currentStepIndex + 1,
      });
    } else {
      completeTutorial();
    }
  };

  const skipTutorial = () => {
    saveTutorialState({
      ...tutorialState,
      isActive: false,
      currentStepIndex: 0,
    });
  };

  const completeTutorial = (tutorialId?: string) => {
    const newCompletedTutorials = tutorialId 
      ? [...tutorialState.completedTutorials, tutorialId]
      : tutorialState.completedTutorials;

    saveTutorialState({
      ...tutorialState,
      isActive: false,
      currentStepIndex: 0,
      completedTutorials: newCompletedTutorials,
    });
  };

  const resetTutorials = () => {
    saveTutorialState(defaultTutorialState);
    localStorage.removeItem('tutorialState');
  };

  const isTutorialCompleted = (tutorialId: string) => {
    return tutorialState.completedTutorials.includes(tutorialId);
  };

  return {
    tutorialState,
    startTutorial,
    nextStep,
    skipTutorial,
    completeTutorial,
    resetTutorials,
    isTutorialCompleted,
  };
}