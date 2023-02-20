import { Grid } from '@mui/material'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { loginStart } from '../../store/reducers/authorization'
import SideBar from '../sideBar/sideBar'
import UserMenu from '../widgets/menu/userMenu'
import Quotes from '../widgets/quotes/quotes'
import Weather from '../widgets/weather/weather'

import styles from './layout.module.scss'

const Layout = () => {
  const { key } = useAppSelector((state) => state.authorization)
  const dispatch = useAppDispatch()
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
          <Grid item xs={12} sm={12} md={2} lg={3}>
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
