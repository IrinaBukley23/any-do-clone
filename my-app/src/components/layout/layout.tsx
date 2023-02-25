import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { loginStart } from '../../store/reducers/authorization'
import { Grid, Button } from '@mui/material'
import SideBar from '../sideBar/sideBar'
import UserMenu from '../widgets/menu/userMenu'
import Quotes from '../widgets/quotes/quotes'
import Weather from '../widgets/weather/weather'
import { useTranslation } from 'react-i18next'
import styles from './layout.module.scss'
import { setLang } from '../../store/actions/actionCreators'

const Layout = () => {
  const { key } = useAppSelector((state) => state.authorization)
  const dispatch = useAppDispatch()

  const { t, i18n } = useTranslation()

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
    dispatch(setLang(language))
  }

  useEffect(() => {
    if (!key) dispatch(loginStart())
  }, [key])
  return key ? (
    <>
      <header className={styles.header}>
        <Grid
          container
          spacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 10 }}
          sx={{ alignItems: 'center' }}
        >
          <Grid item xs={12} sm={12} md={2} lg={3} sx={{ display: 'flex' }}>
            <Button
              color='primary'
              variant='contained'
              onClick={() => changeLanguage('en')}
              sx={{ mr: 2 }}
            >
              EN
            </Button>
            <Button color='primary' variant='contained' onClick={() => changeLanguage('ru')}>
              RU
            </Button>
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
  ) : (
    <Navigate to=''></Navigate>
  )
}

export default Layout
