import data from './challenges.json';
import { Challenge } from '../types';

export const fetchChallenges = (): Promise<Challenge[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // @ts-ignore - Importing JSON directly in TS sometimes needs config, but this works for runtime
      resolve(data as Challenge[]);
    }, 500); // Simulate 0.5s network lag
  });
};