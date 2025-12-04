import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { LayoutAnimation, UIManager, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const STORAGE_KEY = '@challenge_app_data_v1';

export const ChallengeProvider = ({ children }: { children: ReactNode }) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // 1. Try to pull data from Local Storage (Disk)
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);

      if (storedData) {
        // A. If data exists on disk, use it!
        console.log('📦 Loaded from Storage');
        setChallenges(JSON.parse(storedData));
      } else {
        // B. If no data on disk (First launch), load defaults from JSON
        console.log('🌐 Loaded from "API" (Default JSON)');
        const apiData = await fetchChallenges();
        const sortedData = apiData.reverse();
        
        setChallenges(sortedData);
        // Save these defaults to disk immediately so we have them next time
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sortedData));
      }
    } catch (error) {
      console.error("Failed to load challenges", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addChallenge = async (newChallenge: Omit<Challenge, 'id'>) => {
    // 1. Trigger UI Animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    // 2. Create the new object
    const item: Challenge = {
      id: Date.now().toString(),
      ...newChallenge
    };

    // 3. Create the new list (New item at top)
    const updatedList = [item, ...challenges];

    // 4. Update State (Instant UI update)
    setChallenges(updatedList);

    // 5. Persist to Disk (Background save)
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      console.log('💾 Saved new list to storage');
    } catch (e) {
      console.error('Failed to save to storage', e);
    }
  };

  // Force a reset (Optional: helps for debugging)
  const refresh = async () => {
    loadData();
  };

  return (
    <ChallengeContext.Provider value={{ challenges, addChallenge, isLoading, refresh }}>
      {children}
    </ChallengeContext.Provider>
  );
};