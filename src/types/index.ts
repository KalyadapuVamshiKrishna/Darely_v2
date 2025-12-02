export interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

// For Navigation
export type RootStackParamList = {
  Home: undefined;
  Details: { challenge: Challenge };
};