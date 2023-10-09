import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

  if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
    const bmiInfo: string = bmiCalculator(Number(req.query.height), Number(req.query.weight));
    return res.send({
      weight: req.query.weight,
      height: req.query.height,
      bmi: bmiInfo
    });
  } else {
    return res.status(400).json({ error: 'Malformatted parameters' });
  }

});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { hours, target } = req.body;

  if (!target || !hours) {
    return res.status(400).send({ error: 'parameters missing' });
  } else if (isNaN(Number(target)) || hours.some(isNaN)) {  // eslint-disable-line
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(hours as number[], Number(target));
  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});