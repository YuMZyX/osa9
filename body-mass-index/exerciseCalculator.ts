interface Exercises {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): Exercises => {
  const periodLength = hours.length;
  const trainingDays = countTrainingDays(hours);
  console.log(trainingDays);
  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: true,
    rating: 3,
    ratingDescription: 'test',
    target: 3,
    average: 2.12
  };
}

const countTrainingDays = (hours: number[]): number => {
  return hours.reduce((s, v) => v === 0 ? s + 0 : s + 1)
}

console.log(calculateExercises([1,2,0,0,3], 2))