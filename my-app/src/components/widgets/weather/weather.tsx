import { Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './weather.module.scss';
import { useTranslation } from 'react-i18next';

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
  const [error, setError] = useState('')
  const { t, } = useTranslation();
  const lang = localStorage.getItem('i18nextLng')
  useEffect(() => {
    if (isFirstLoad && city !== null) {
      isFirstLoad = false
      getWeather(city)
    }
  }, [lang]);

  async function getWeather(cityValue: string): Promise<void> {
    setCity(cityValue);
    localStorage.setItem('city', cityValue)
    const lang = localStorage.getItem('i18nextLng')
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&lang=${lang}&appid=f24a0e6c09481d6e6ccf0547c5467caf&units=metric`
      const res = await fetch(url)
      const data = await res.json()
      setError('')
      setData({
        temp: data.main.temp,
        description: data.weather[0].description,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity
      })
    } catch(error) {
      console.log(error)
      setError(`${t('weatherCityNotFound')}`)
    }
  }

  return (
    <Grid container spacing={1} className={styles.header__weather}>
      <Grid item xs={5}>
        <TextField
          id="wether"
          size="small"
          label={t('weatherLabel')}
          placeholder=''
          multiline
          variant="standard"
          value={city}
          onChange={(event) => {
            getWeather(event.target.value)
          }}
          
        />
      </Grid>
      <Grid item xs={3}>
        { error !== '' &&
          <div>
            {error}
          </div>
        }
        { weatherData !== null && error === '' &&
          <div>
            <div>{weatherData.temp}°C</div>
            <div>{weatherData.description}</div>
          </div>
        }
      </Grid>
      <Grid item xs={4}>
        { weatherData !== null && error === '' &&
          <div>
            <div>{t('weatherWind')}: {weatherData.windSpeed} {t('weatherWindMS')}</div>
            <div>{t('weatherHumidity')}: {weatherData.humidity} %</div>
          </div>
        }
      </Grid>
    </Grid>
  )
}

export default Weather;