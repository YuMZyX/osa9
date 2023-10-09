interface BMIValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const bmiCalculator = (height: number, weight: number): string => {
  const heightInM = height / 100
  const bmi = weight / (heightInM * heightInM);
  if (bmi < 18.5) {
    return 'Underweight'
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Healthy weight'
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight'
  } else if (bmi >= 30) {
    return 'Obesity'
  }
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(bmiCalculator(height, weight))
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message)
  } else {
    console.log('Unknown error')
  }
}