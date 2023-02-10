import { TextField } from '@mui/material';

const Weather = () => {
  async function getWeather(cityValue: string): Promise<void> {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&lang=en&appid=50703c1fd25d7bab5601ad831d36b3d7&units=metric`
      const res = await fetch(url)
      const data = await res.json()
      console.log(data);
    } catch(error) {
      console.log(error)
    }
  }
  return (
    <div>
      <TextField
        id="wether"
        label="Погода"
        placeholder="Введите город"
        multiline
        variant="standard"
        onChange={(event) => {getWeather(event.target.value)}}
      />
      <div>
        <img src=''></img>
      </div>
    </div>
  )
}

export default Weather;