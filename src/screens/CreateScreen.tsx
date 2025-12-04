import React, { useState, useContext } from 'react';
import { TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { YStack, Text, Button, XStack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { ChallengeContext } from '../context/ChallengeContext';
import { useThemeColors } from '../hooks/useThemeColors';

export const CreateScreen = () => {
  const navigation = useNavigation();
  const { addChallenge } = useContext(ChallengeContext);
  const { colors } = useThemeColors();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
  const [category, setCategory] = useState<'Health' | 'Learning' | 'Fitness' | 'Creativity'>('Health');

  const handleSubmit = () => {
    if (!title.trim() || !desc.trim()) {
      Alert.alert("Missing Info", "Please fill in the title and description!");
      return;
    }

    addChallenge({
      title,
      description: desc,
      fullDescription: desc + " (Custom Challenge)",
      category,
      difficulty
    });

    navigation.goBack();
  };

  const SelectButton = ({ label, selected, onPress }: any) => (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.selectBtn, 
        { 
          backgroundColor: selected ? colors.primary : 'transparent',
          borderColor: colors.border
        }
      ]}
    >
      <Text color={selected ? 'white' : colors.text} fontSize={12} fontWeight="600">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: colors.background }} 
      // FIX: Increased paddingTop to 120 to clear the header completely
      contentContainerStyle={{ padding: 20, paddingTop: 120, paddingBottom: 50 }} 
    >
      <YStack space="$4">
        {/* Title Input */}
        <YStack space="$2">
          <Text color={colors.subText} fontWeight="600">Title</Text>
          <TextInput 
            style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.cardBg }]}
            placeholder="e.g. Run 5km"
            placeholderTextColor={colors.subText}
            value={title}
            onChangeText={setTitle}
          />
        </YStack>

        {/* Description Input */}
        <YStack space="$2">
          <Text color={colors.subText} fontWeight="600">Short Description</Text>
          <TextInput 
            style={[styles.input, { height: 80, color: colors.text, borderColor: colors.border, backgroundColor: colors.cardBg }]}
            placeholder="What is the goal?"
            placeholderTextColor={colors.subText}
            multiline
            value={desc}
            onChangeText={setDesc}
          />
        </YStack>

        {/* Difficulty Selector */}
        <YStack space="$2">
          <Text color={colors.subText} fontWeight="600">Difficulty</Text>
          <XStack space="$2">
            {['Easy', 'Medium', 'Hard'].map((d) => (
              <SelectButton 
                key={d} 
                label={d} 
                selected={difficulty === d} 
                onPress={() => setDifficulty(d as any)} 
              />
            ))}
          </XStack>
        </YStack>

        {/* Category Selector */}
        <YStack space="$2">
          <Text color={colors.subText} fontWeight="600">Category</Text>
          <XStack space="$2" flexWrap="wrap">
            {['Health', 'Fitness', 'Learning', 'Creativity'].map((c) => (
              <SelectButton 
                key={c} 
                label={c} 
                selected={category === c} 
                onPress={() => setCategory(c as any)} 
              />
            ))}
          </XStack>
        </YStack>

        {/* Submit Button */}
        <Button 
          marginTop="$4" 
          backgroundColor={colors.primary} 
          color="white" 
          size="$5" 
          onPress={handleSubmit}
        >
          Create Challenge
        </Button>

      </YStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  selectBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 8,
  }
});