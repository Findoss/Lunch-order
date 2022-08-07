import type { Foods } from '../models/cafe/types';

export const textFood = (food: Foods, item: keyof Foods): string => {
  return `${food[item]}`;
};
