import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import SideBar from '../sideBar/sideBar'
import UserMenu from '../widgets/menu/userMenu'
import Quotes from '../widgets/quotes/quotes'
import Weather from '../widgets/weather/weather'

import styles from './Layout.module.scss'

const Layout = () => {
  return (
    <>
      <header style={{ height: '70px', background: '#ffffff', display: 'flex', alignItems: 'center'}}>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 12 }} sx={{alignItems: 'center'}}>
          <Grid item md={3}>
            <Weather></Weather>
          </Grid>
          <Grid item md={5}>
            <Quotes></Quotes>
          </Grid>
          <Grid item md={4} sx={{justifyContent: 'end'}}>
            <UserMenu></UserMenu>
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
