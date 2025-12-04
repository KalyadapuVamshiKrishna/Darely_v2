import React, { useContext } from 'react';
import { FlatList, RefreshControl, View, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import { Spinner, Text } from 'tamagui'; 
import { SafeAreaView } from 'react-native-safe-area-context'; // Fixes the top notch collision
import { ChallengeCard } from '../components/ChallengeCard';
import { ChallengeContext } from '../context/ChallengeContext';
import { useNavigation } from '@react-navigation/native';
import { useThemeColors } from '../hooks/useThemeColors';

export const HomeScreen = () => {
  const { challenges, isLoading, refresh } = useContext(ChallengeContext);
  const navigation = useNavigation<any>();
  const { colors, isDark } = useThemeColors();

  // Loading State
  if (isLoading && challenges.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <Spinner size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    // edges={['top']} ensures we strictly respect the top notch
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      
      {/* Custom Header Title */}
      <View style={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10 }}>
        <Text fontSize="$8" fontWeight="800" color={colors.text}>
          Daily Goals 🎯
        </Text>
      </View>

      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 16 }}> 
            <ChallengeCard 
              item={item} 
              onPress={() => navigation.navigate('Details', { challenge: item })} 
            />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refresh} tintColor={colors.text} />
        }
        // paddingBottom: 100 ensures the last item isn't hidden behind the FAB
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }} 
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('Create')}
        activeOpacity={0.8}
      >
        <Text fontSize={30} color="white" lineHeight={30} marginBottom={4}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Android Shadow
    shadowColor: '#000', // iOS Shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 100,
  }
});