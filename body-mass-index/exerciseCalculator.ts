interface Exercises {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
interface ExerciseInfo {
  targetInfo: number;
  hours: number[];
}

const parseArgs = (args: string[]): ExerciseInfo => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const firstArg: number = 2;
  let target: number = 0;
  let hours: number[] = [];

  for (let i = firstArg; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      if (i === firstArg) {
        target = Number(args[i]);
      } else {
        hours = hours.concat(Number(args[i]));
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

  return {
    targetInfo: target,
    hours: hours
  }
}

const calculateExercises = (hours: number[], target: number): Exercises => {
  const periodLength: number = hours.length;
  const trainingDays: number = countTrainingDays(hours);
  const average: number = countAverage(hours);
  let success: boolean = null;
  let rating: number = 0;
  let description: string = '';

  if (average >= target) {
    success = true;
    rating = 3;
    description = 'Well done, you met your target!'
  } else if ((average / target) >= 0.75) {
    success = false;
    rating = 2;
    description = 'Not too bad, but could be better'
  } else {
    success = false;
    rating = 1;
    description = 'You were far from your target, try work harder in the next exercise period.'
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: description,
    target: target,
    average: average
  };
}

const countTrainingDays = (hours: number[]): number => {
  return hours.reduce((s, v) => v === 0 ? s + 0 : s + 1, 0);
}

const countAverage = (hours: number[]): number => {
  return hours.reduce((s, v) => s + v, 0) / hours.length;
}

try {
  const { targetInfo, hours } = parseArgs(process.argv);
  console.log(calculateExercises(hours, targetInfo));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log('Unknown error');
  }
}