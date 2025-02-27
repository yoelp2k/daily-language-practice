import { DrillProps, ExerciseType } from '../types/drill';
import basicGreetingsComprehensive from '../data/drills/basic-greetings-comprehensive.json';
import basicGreetingsUnseen from '../data/drills/basic-greetings-unseen.json';
import basicNumbers from '../data/drills/portuguese-numbers.json';
import basicGreetings from '../data/drills/basic-greetings.json';
import distance from '../data/drills/distance-words-conversations.json';

const isExerciseType = (type: string): type is ExerciseType => {
  return Object.values(ExerciseType).includes(type as ExerciseType);
};

const validateDrill = (drill: any): drill is DrillProps => {
  if (!drill.id || typeof drill.id !== 'string') {
    console.warn('Invalid drill: missing or invalid id');
    return false;
  }
  if (!drill.title || typeof drill.title !== 'string') {
    console.warn(`Invalid drill ${drill.id}: missing or invalid title`);
    return false;
  }
  if (!drill.description || typeof drill.description !== 'string') {
    console.warn(`Invalid drill ${drill.id}: missing or invalid description`);
    return false;
  }
  if (!Array.isArray(drill.exercises)) {
    console.warn(`Invalid drill ${drill.id}: exercises must be an array`);
    return false;
  }

  const validExercises = drill.exercises.every((exercise: any, index: number) => {
    if (!exercise.question || typeof exercise.question !== 'string') {
      console.warn(`Invalid exercise at index ${index} in drill ${drill.id}: missing or invalid question`);
      return false;
    }
    if (!Array.isArray(exercise.answers)) {
      console.warn(`Invalid exercise at index ${index} in drill ${drill.id}: answers must be an array`);
      return false;
    }

    return exercise.answers.every((answer: any, ansIndex: number) => {
      if (typeof answer.correct !== 'string') {
        console.warn(`Invalid answer at index ${ansIndex} in exercise ${index} of drill ${drill.id}: missing or invalid correct property`);
        return false;
      }
      if (!isExerciseType(answer.type)) {
        console.warn(`Invalid answer at index ${ansIndex} in exercise ${index} of drill ${drill.id}: invalid type "${answer.type}"`);
        return false;
      }
      if (answer.type === ExerciseType.SELECTION && !Array.isArray(answer.options)) {
        console.warn(`Invalid answer at index ${ansIndex} in exercise ${index} of drill ${drill.id}: selection type requires options array`);
        return false;
      }
      return true;
    });
  });

  if (!validExercises) return false;
  if (drill.footer !== undefined && typeof drill.footer !== 'string') return false;
  
  return true;
};

export const loadDrills = async (): Promise<DrillProps[]> => {
  try {
    console.log('Loading drills...');
    const drills: unknown[] = [
      basicGreetingsUnseen,
      basicGreetingsComprehensive,
      basicNumbers,
      basicGreetings,
      distance
    ];

    console.log('Raw drills:', JSON.stringify(drills, null, 2));

    // Use type guard to ensure each drill is valid
    const validDrills = drills.filter((drill): drill is DrillProps => validateDrill(drill));

    if (validDrills.length === 0) {
      console.warn('No valid drills found');
    }

    return validDrills;
  } catch (error) {
    console.error('Error in loadDrills:', error);
    throw error;
  }
};
