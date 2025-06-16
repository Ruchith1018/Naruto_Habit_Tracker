import { useState, useEffect } from 'react';

interface OnboardingData {
  name: string;
  avatar: string;
  age: number;
  village: string;
  isCompleted: boolean;
}

const defaultOnboardingData: OnboardingData = {
  name: '',
  avatar: '',
  age: 18,
  village: 'leaf',
  isCompleted: false,
};

export function useOnboarding() {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(defaultOnboardingData);

  useEffect(() => {
    // In a real app, this would load from AsyncStorage or similar
    const savedData = localStorage.getItem('onboardingData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setOnboardingData(parsed);
      } catch (error) {
        console.error('Failed to parse onboarding data:', error);
      }
    }
  }, []);

  const updateOnboardingData = (updates: Partial<OnboardingData>) => {
    const newData = { ...onboardingData, ...updates };
    setOnboardingData(newData);
    localStorage.setItem('onboardingData', JSON.stringify(newData));
  };

  const completeOnboarding = () => {
    const completedData = { ...onboardingData, isCompleted: true };
    setOnboardingData(completedData);
    localStorage.setItem('onboardingData', JSON.stringify(completedData));
  };

  const resetOnboarding = () => {
    setOnboardingData(defaultOnboardingData);
    localStorage.removeItem('onboardingData');
  };

  return {
    onboardingData,
    updateOnboardingData,
    completeOnboarding,
    resetOnboarding,
  };
}