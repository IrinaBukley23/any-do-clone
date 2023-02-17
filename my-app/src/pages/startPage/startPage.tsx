 import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import TelegramIcon from '@mui/icons-material/Telegram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import irina from '../../assets/team/irina.jpg'
import vlada from '../../assets/team/vlada.jpg'
import polina from '../../assets/team/polina.jpg'
import styles from './startPage.module.scss';
import { LoginForm } from '../../components/loginForm/loginForm';
import { useAppDispatch } from '../../store/hooks';
import { loginStart, registrationStart } from '../../store/reducers/authorization';

const StartPage = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.wrapper}>
      <Typography variant='h1' component='h6' sx={{ fontSize: 52 }}>
        Добро пожаловать в ЛидерТаск!
      </Typography>
      <Typography variant='h3' component='p' sx={{ fontWeitgh: 700, fontSize: 38, mt: 7 }}>
        Поздравляем! Сегодня ваш день — это великолепный день!
      </Typography>
      <div className={styles.wrapper__text}>
        <Typography component='p' sx={{ fontSize: 28, mb: 10 }}>
          С этого дня ваша личная продуктивность и эффективность сотрудников будут непрерывно расти.
          Вам станет просто и легко управлять делами.
        </Typography>
        <Button onClick={() => dispatch(loginStart())} color='primary' variant='contained' sx={{ mr: 5 }}>
          Войти
        </Button>
        <Button onClick={() => dispatch(registrationStart())} color='primary' variant='contained'>
          Зарегистрироваться
        </Button>
        <LoginForm />
        <div className={styles.wrapper__team}>
          <Card sx={{ display: 'flex', width: 300, justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <div className={styles.wrapper__photo}>
                <img src={irina} alt='irina' />
              </div>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component='div' variant='h5' sx={{ fontSize: 16 }}>
                  Irina Bukley
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  component='div'
                  sx={{ fontSize: 14 }}
                >
                  Front-end developer
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  pl: 1,
                  pb: 1,
                }}
              >
                <a href='https://github.com/IrinaBukley23'>
                  <GitHubIcon aria-label='previous'></GitHubIcon>
                </a>
                <a href='https://t.me/irina_bukley'>
                  <TelegramIcon aria-label='previous'></TelegramIcon>
                </a>
                <a href='https://www.linkedin.com/in/irina-bukley-283839227/'>
                  <LinkedInIcon aria-label='previous'></LinkedInIcon>
                </a>
              </Box>
            </Box>
          </Card>
          <Card sx={{ display: 'flex', mr: 5, ml: 5, width: 300, justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <div className={styles.wrapper__photo}>
                <img src={vlada} alt='vlada' />
              </div>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component='div' variant='h5' sx={{ fontSize: 16 }}>
                  Uladzislava Shkrabava
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  component='div'
                  sx={{ fontSize: 14 }}
                >
                  Front-end developer
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  pl: 1,
                  pb: 1,
                }}
              >
                <a href='https://github.com/vladislava96'>
                  <GitHubIcon aria-label='previous'></GitHubIcon>
                </a>
                <a href='https://t.me/Vladislavasname'>
                  <TelegramIcon aria-label='previous'></TelegramIcon>
                </a>
                <a href='##'>
                  <LinkedInIcon aria-label='previous'></LinkedInIcon>
                </a>
              </Box>
            </Box>
          </Card>
          <Card sx={{ display: 'flex', width: 300, justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <div className={styles.wrapper__photo}>
                <img src={polina} alt='polina' />
              </div>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component='div' variant='h5' sx={{ fontSize: 16 }}>
                  Polina Makarova
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  component='div'
                  sx={{ fontSize: 14 }}
                >
                  Front-end developer
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  pl: 1,
                  pb: 1,
                }}
              >
                <a href='https://github.com/sunnyfur'>
                  <GitHubIcon aria-label='previous'></GitHubIcon>
                </a>
                <a href='https://t.me/polin_makarova'>
                  <TelegramIcon aria-label='previous'></TelegramIcon>
                </a>
                <a href='##'>
                  <LinkedInIcon aria-label='previous'></LinkedInIcon>
                </a>
              </Box>
            </Box>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default StartPage;
