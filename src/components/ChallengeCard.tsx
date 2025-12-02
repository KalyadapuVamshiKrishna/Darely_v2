import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Challenge } from '../types';

interface ChallengeCardProps {
  challenge: Challenge;
  onPress: () => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.title}>{challenge.title}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{challenge.category}</Text>
        </View>
      </View>
      
      <Text style={styles.description} numberOfLines={2}>
        {challenge.description}
      </Text>
      
      <View style={styles.footer}>
        <Text style={styles.difficulty}>Diff: {challenge.difficulty}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1, // Allows title to take space vs badge
  },
  badge: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  badgeText: {
    color: '#0284c7',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    color: '#666',
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  difficulty: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
    fontStyle: 'italic',
  },
});

export default ChallengeCard;