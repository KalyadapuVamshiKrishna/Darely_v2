import { useContext } from 'react';
import { ChallengeContext } from '../context/ChallengeContext';

export const useThemeColors = () => {
  // Now we get the theme from our Global State, not the phone settings
  const { isDarkMode } = useContext(ChallengeContext);

  return {
    isDark: isDarkMode,
    colors: {
      background: isDarkMode ? '#121212' : '#F5F7FA',
      cardBg: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      text: isDarkMode ? '#FFFFFF' : '#1A1A1A',
      subText: isDarkMode ? '#A0A0A0' : '#64748B',
      border: isDarkMode ? '#333333' : '#E2E8F0',
      primary: '#3B82F6',
      // Dynamic Shadow Color
      shadow: isDarkMode ? '#000000' : '#000000',
    }
  };
};