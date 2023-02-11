import { Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './weather.module.scss';

const defaultCity = localStorage.getItem('city');

let isFirstLoad = true;

interface IWeatherData {
  temp: string,
  description: string,
  windSpeed: string,
  humidity: string
}

const Weather = () => {
  const [weatherData, setData] = useState<IWeatherData | null>(null);

  const [city, setCity] = useState(defaultCity)

  useEffect(() => {
    if (isFirstLoad && city !== null) {
      isFirstLoad = false
      getWeather(city)
    }
  });

  console.log(weatherData)

  async function getWeather(cityValue: string): Promise<void> {
    setCity(cityValue);
    localStorage.setItem('city', cityValue)
    console.log('start')
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&lang=en&appid=f24a0e6c09481d6e6ccf0547c5467caf&units=metric`
      const res = await fetch(url)
      const data = await res.json()
      console.log(data);
      setData({
        temp: data.main.temp,
        description: data.weather[0].description,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity
      })
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <Grid container spacing={1} className={styles.header__weather}>
      <Grid item xs={4}>
        <TextField
          id="wether"
          size="small"
          label="Погода"
          placeholder="Введите город"
          multiline
          variant="standard"
          value={city}
          onChange={(event) => {
            getWeather(event.target.value)
          }}
          sx={{marginLeft: '25px', fontSize: '0.8'}}
        />
      </Grid>
      <Grid item xs={4}>
          {weatherData !== null &&
            <div>
              <div>{weatherData.temp}°C</div>
              <div>{weatherData.description}</div>
            </div>
          }
        </Grid>
        <Grid item xs={4}>
          {weatherData !== null &&
            <div>
              <div>Wind: {weatherData.windSpeed} m/s</div>
              <div>Humidity: {weatherData.humidity} %</div>
            </div>
          }
        </Grid>
    </Grid>
  )
}

export default Weather;