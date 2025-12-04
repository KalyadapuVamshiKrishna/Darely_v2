import React from 'react';
import { Alert } from 'react-native';
import { YStack, Text, Button, XStack, ScrollView, Separator } from 'tamagui';
import { useRoute } from '@react-navigation/native';
import { Challenge } from '../data/types';
import { useThemeColors } from '../hooks/useThemeColors';

export const DetailsScreen = () => {
  const { colors } = useThemeColors();
  const route = useRoute<any>();
  const { challenge } = route.params as { challenge: Challenge };

  const handleAccept = () => {
    Alert.alert("🚀 Challenge Accepted!", `You have committed to: ${challenge.title}\n\nGo make it happen!`);
  };

  return (
    <ScrollView 
      backgroundColor={colors.background} 
      // CRITICAL: paddingTop 100 pushes content down so it doesn't overlap the transparent header/back button
      contentContainerStyle={{ flexGrow: 1, padding: 20, paddingTop: 100 }} 
    >
      <YStack space="$4">
        
        {/* Title & Tags */}
        <YStack space="$2">
            <Text fontSize="$9" fontWeight="800" color={colors.text} lineHeight="$9">
                {challenge.title}
            </Text>
            
            <XStack space="$3" marginTop="$2">
                <Button 
                    size="$2" 
                    disabled 
                    borderRadius="$4" 
                    backgroundColor={colors.primary} 
                    color="white"
                >
                    {challenge.category}
                </Button>
                
                <Button 
                    size="$2" 
                    variant="outlined" 
                    disabled 
                    borderRadius="$4" 
                    borderColor={colors.border} 
                    color={colors.text}
                >
                    {challenge.difficulty}
                </Button>
            </XStack>
        </YStack>

        <Separator marginVertical="$4" borderColor={colors.border} />

        {/* Description Section */}
        <YStack space="$2">
             <Text fontSize="$5" fontWeight="600" color={colors.subText}>
                 About this Challenge
             </Text>
             <Text fontSize="$5" lineHeight="$8" color={colors.text}>
                 {challenge.fullDescription}
             </Text>
        </YStack>

        {/* Big Action Button */}
        <YStack marginTop="$8">
            <Button 
                backgroundColor={colors.text} // Inverts based on theme (Black in light mode, White in dark)
                color={colors.cardBg}
                size="$6" 
                onPress={handleAccept}
                pressStyle={{ opacity: 0.8, scale: 0.98 }}
                animation="bouncy"
                fontWeight="bold"
            >
                Accept Challenge
            </Button>
        </YStack>

      </YStack>
    </ScrollView>
  );
};