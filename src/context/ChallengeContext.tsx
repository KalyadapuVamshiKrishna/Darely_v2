import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { LayoutAnimation, UIManager, Platform } from 'react-native';
import { Challenge } from '../data/types';
import { fetchChallenges } from '../services/api';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ChallengeContextType {
  challenges: Challenge[];
  addChallenge: (newChallenge: Omit<Challenge, 'id'>) => void;
  isLoading: boolean;
  refresh: () => void;
}

export const ChallengeContext = createContext<ChallengeContextType>({} as ChallengeContextType);

export const ChallengeProvider = ({ children }: { children: ReactNode }) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const data = await fetchChallenges();
    // Simulate "Network" sorting: Newest first
    setChallenges(data.reverse()); 
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addChallenge = (newChallenge: Omit<Challenge, 'id'>) => {
    // 1. Trigger Animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    // 2. Create Object
    const item: Challenge = {
      id: Date.now().toString(), // Simple unique ID
      ...newChallenge
    };

    // 3. Update State (Prepend to top)
    setChallenges([item, ...challenges]);
  };

  const refresh = () => {
    loadData();
  };

  return (
    <ChallengeContext.Provider value={{ challenges, addChallenge, isLoading, refresh }}>
      {children}
    </ChallengeContext.Provider>
  );
};