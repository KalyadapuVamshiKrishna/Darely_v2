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

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <Theme name="light">
        <ChallengeProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator 
                initialRouteName="Home"
                screenOptions={{
                  headerShown: false, 
                  contentStyle: { backgroundColor: 'transparent' }
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
                    headerTintColor: '#000'
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
                    headerTintColor: '#000'
                  }} 
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </ChallengeProvider>
      </Theme>
    </TamaguiProvider>
  );
}