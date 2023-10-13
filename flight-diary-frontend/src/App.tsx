import { useState, useEffect } from "react"
import { DiaryEntry, Visibility, Weather } from "./types"
import { getAllEntries, createDiaryEntry } from "./services/diaryService";
import axios from 'axios';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility | string>('');
  const [weather, setWeather] = useState<Weather | string>('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getAllEntries().then((data: DiaryEntry[]) => {
      setDiaries(data);
    })
  }, [])
  
  const diaryEntryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()

      const result = await createDiaryEntry({
        date: date,
        weather: weather as Weather,
        visibility: visibility as Visibility,
        comment: comment
      })

      if (axios.isAxiosError(result)) {
        setErrorMessage(result.response?.data);
        clearError();
      } else if (result instanceof Error) {
        setErrorMessage('Something went wrong: Flight entry creation returned an error.');
        clearError();
      } else if (result === undefined) {
        setErrorMessage('Response from server was undefined, check input values.');
        clearError();
      } else {
        setDiaries(diaries.concat(result));
        clearFields();
      }

  };

  const clearFields = () => {
    setDate('');
    setComment('');
  }

  const clearError = () => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 4000)
  }

  const style = {
    color: 'red',
  };

  return (
    <div>
      <h1>Add new entry</h1>
      {errorMessage !== null ? <span style={style}>{errorMessage}</span> : ''}
      <form onSubmit={diaryEntryCreation}>
        Date: <input value={date} type="date" onChange={(event) => setDate(event.target.value)} /><br />
        Visibility: <br />
        <input type="radio" name="visibility" onChange={() => setVisibility('great')} /> great<br />
        <input type="radio" name="visibility" onChange={() => setVisibility('good')} /> good<br />
        <input type="radio" name="visibility" onChange={() => setVisibility('ok')} /> ok<br />
        <input type="radio" name="visibility" onChange={() => setVisibility('poor')} /> poor<br />
        Weather: <br /> 
        <input type="radio" name="weather" onChange={() => setWeather('sunny')} /> sunny<br />
        <input type="radio" name="weather" onChange={() => setWeather('rainy')} /> rainy<br />
        <input type="radio" name="weather" onChange={() => setWeather('cloudy')} /> cloudy<br />
        <input type="radio" name="weather" onChange={() => setWeather('stormy')} /> stormy<br />
        <input type="radio" name="weather" onChange={() => setWeather('windy')} /> windy<br />
        Comment: <input value={comment} onChange={(event) => setComment(event.target.value)} /><br />
        <button type='submit'>add</button>
      </form>
      <h1>Diary entries</h1>
        {diaries.map((entry: DiaryEntry) =>
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <span>visibility: {entry.visibility}</span><br />
          <span>weather: {entry.weather}</span><br />
          <span>comment: {entry.comment}</span>
        </div>
        )}
    </div>
  )
}

export default App;

/*
date: <input value={date} type="date" onChange={(event) => setDate(event.target.value)} /><br />
visibility: <input value={visibility} onChange={(event) => setVisibility(event.target.value)} /><br />
weather: <input value={weather} onChange={(event) => setWeather(event.target.value)} /><br />
comment: <input value={comment} onChange={(event) => setComment(event.target.value)} /><br />
*/