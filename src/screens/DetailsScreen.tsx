import React, { useState } from 'react';
import { Modal, View, StyleSheet } from 'react-native'; 
import { YStack, Text, Button, XStack, ScrollView, Separator } from 'tamagui';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Challenge } from '../data/types';
import { useThemeColors } from '../hooks/useThemeColors';

export const DetailsScreen = () => {
  const { colors, isDark } = useThemeColors();
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { challenge } = route.params as { challenge: Challenge };

 
  const [modalVisible, setModalVisible] = useState(false);

  
  const handleAccept = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.goBack(); 
  };

  return (
    <>
      <ScrollView 
        backgroundColor={colors.background} 
        contentContainerStyle={{ flexGrow: 1, padding: 20, paddingTop: 100 }} 
      >
        <YStack space="$4">
          
          {/* Header Section */}
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
                  backgroundColor={colors.text}
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

      {/* 3. The Custom Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Dimmed Background */}
        <View style={styles.modalOverlay}>
            
            {/* The Popup Card */}
            <YStack 
                backgroundColor={colors.cardBg} 
                borderRadius="$6" 
                padding="$6" 
                width="85%" 
                alignItems="center"
                space="$4"
                // Add Shadow
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.25,
                    shadowRadius: 10,
                    elevation: 10,
                    borderWidth: 1,
                    borderColor: colors.border
                }}
            >
                {/* Icon / Emoji */}
                <Text fontSize={50}>🚀</Text>

                <YStack alignItems="center" space="$2">
                    <Text fontSize="$8" fontWeight="800" color={colors.text} textAlign="center">
                        Challenge Accepted!
                    </Text>
                    <Text fontSize="$4" color={colors.subText} textAlign="center">
                        You've committed to "{challenge.title}". Time to crush it!
                    </Text>
                </YStack>

                {/* Modal Action Button */}
                <Button 
                    backgroundColor={colors.primary} 
                    color="white"
                    size="$5"
                    width="100%"
                    marginTop="$2"
                    onPress={handleCloseModal}
                >
                    Let's Go!
                </Button>
            </YStack>

        </View>
      </Modal>
    </>
  );
};

// Styles for the semi-transparent background
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // 60% opacity black
    justifyContent: 'center',
    alignItems: 'center',
  },
});