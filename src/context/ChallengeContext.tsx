import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { LayoutAnimation, UIManager, Platform, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Challenge } from '../data/types';
import { fetchChallenges } from '../services/api';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ChallengeContextType {
  challenges: Challenge[];
  addChallenge: (newChallenge: Omit<Challenge, 'id'>) => void;
  isLoading: boolean;
  refresh: () => void;
  // New Theme Props
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ChallengeContext = createContext<ChallengeContextType>({} as ChallengeContextType);

const STORAGE_KEY = '@challenge_app_data_v1';
const THEME_KEY = '@app_theme_preference';

export const ChallengeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize theme based on system, but allow override
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === 'dark');

  const loadData = async () => {
    setIsLoading(true);
    try {
      // 1. Load Data
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setChallenges(JSON.parse(storedData));
      } else {
        const apiData = await fetchChallenges();
        const sortedData = apiData.reverse();
        setChallenges(sortedData);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sortedData));
      }

      // 2. Load Theme Preference
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (savedTheme !== null) {
        // If user has saved a preference, respect it
        setIsDarkMode(savedTheme === 'dark');
      }
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addChallenge = async (newChallenge: Omit<Challenge, 'id'>) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const item: Challenge = { id: Date.now().toString(), ...newChallenge };
    const updatedList = [item, ...challenges];
    setChallenges(updatedList);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) { console.error(e); }
  };

  const refresh = async () => { loadData(); };

  // New Toggle Function
  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode); // Update UI immediately
    try {
      await AsyncStorage.setItem(THEME_KEY, newMode ? 'dark' : 'light');
    } catch (e) { console.error(e); }
  };

  return (
    <ChallengeContext.Provider value={{ challenges, addChallenge, isLoading, refresh, isDarkMode, toggleTheme }}>
      {children}
    </ChallengeContext.Provider>
  );
};