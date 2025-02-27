import { DrillProps } from '../types';
import basicGreetings from '../data/drills/basic-greetings.json';
import basicNumbers from '../data/drills/basic-numbers.json';

export const loadDrills = async (): Promise<DrillProps[]> => {
  // For now, return static imports
  return [
    basicGreetings as DrillProps,
    basicNumbers as DrillProps
  ];
};
