import React, { useContext } from 'react';
import { FlatList, RefreshControl, View, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import { Spinner, YStack, Text } from 'tamagui';
import { ChallengeCard } from '../components/ChallengeCard';
import { ChallengeContext } from '../context/ChallengeContext'; // Import Context
import { useNavigation } from '@react-navigation/native';
import { useThemeColors } from '../hooks/useThemeColors';
// We can use a simple text or an icon for the FAB
import { Plus } from '@tamagui/lucide-icons'; // Or just use Text "+" if icons fail

export const HomeScreen = () => {
  // 1. Consume Context
  const { challenges, isLoading, refresh } = useContext(ChallengeContext);
  const navigation = useNavigation<any>();
  const { colors, isDark } = useThemeColors();

  if (isLoading && challenges.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <Spinner size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      
      <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <Text fontSize="$8" fontWeight="800" color={colors.text} marginBottom="$2">
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
        contentContainerStyle={{ paddingBottom: 80, paddingTop: 10 }} // Extra padding for FAB
      />

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('Create')}
        activeOpacity={0.8}
      >
        <Text fontSize={30} color="white" lineHeight={30}>+</Text>
      </TouchableOpacity>
    </View>
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
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  }
});