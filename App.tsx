import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TamaguiProvider, Theme } from 'tamagui';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import config from './src/theme/tamagui.config';

import { ChallengeProvider } from './src/context/ChallengeContext'; 
import { HomeScreen } from './src/screens/HomeScreen';
import { DetailsScreen } from './src/screens/DetailsScreen';
import { CreateScreen } from './src/screens/CreateScreen';
import { useThemeColors } from './src/hooks/useThemeColors'; // Import the hook

const Stack = createNativeStackNavigator();

// 1. Create a separate component for the Navigation Stack
// This allows us to use the "useThemeColors" hook!
const AppNavigator = () => {
  const { colors, isDark } = useThemeColors();

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, 
          contentStyle: { backgroundColor: 'transparent' },
          // DYNAMIC HEADER COLOR!
          headerTintColor: colors.text, 
          headerTitleStyle: { color: colors.text },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ 
            headerShown: true, 
            title: '', 
            headerTransparent: true, 
          }} 
        />
        
        <Stack.Screen 
          name="Create" 
          component={CreateScreen} 
          options={{ 
            headerShown: true, 
            title: 'New Challenge', 
            presentation: 'modal',
            headerTransparent: true, 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// 2. The Main App Component just handles setup
export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      {/* We can hardcode "light" here because our custom hook handles the real switching */}
      <Theme name="light">
        <ChallengeProvider>
          <SafeAreaProvider>
             {/* Render the "Smart" Navigator inside the providers */}
             <AppNavigator />
          </SafeAreaProvider>
        </ChallengeProvider>
      </Theme>
    </TamaguiProvider>
  );
}