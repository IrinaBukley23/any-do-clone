import { Grid, Button } from '@mui/material'
import { Outlet } from 'react-router-dom'
import SideBar from '../sideBar/sideBar'
import UserMenu from '../widgets/menu/userMenu'
import Quotes from '../widgets/quotes/quotes'
import Weather from '../widgets/weather/weather'
import { useTranslation } from 'react-i18next';
import styles from './layout.module.scss'
import { useDispatch } from 'react-redux'
import { setLang } from '../../store/actions/actionCreators'

const Layout = () => {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    dispatch(setLang(language));
  };

  return (
    <>
      <header className={styles.header}>
        <Grid container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 10 }} sx={{alignItems: 'center'}}>
          <Grid item xs={12} sm={12} md={2} lg={3} sx={{display: 'flex'}}>
            <Button color='primary' variant='contained' onClick={() => changeLanguage('en')} sx={{ mr: 2 }}>EN</Button>
            <Button color='primary' variant='contained' onClick={() => changeLanguage('ru')}>RU</Button>
            <UserMenu></UserMenu>
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={5}>
            <Quotes></Quotes>
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={4}>
            <Weather></Weather>
          </Grid>
        </Grid>
      </header>
      <main className={styles.container}>
        <SideBar />
        <Outlet />
      </main>
    </>
  )
}

export default Layout


