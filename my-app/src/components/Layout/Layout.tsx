import { Button, Grid } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { logout } from '../../store/reducers/authorization'
import SideBar from '../sideBar/sideBar'

import styles from './Layout.module.scss'

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <>
      <header style={{ height: '70px', background: '#ffffff' }}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            Погода
          </Grid>
          <Grid item xs={4}>
            Цитаты
          </Grid>
          <Grid item xs={4}>
            <Button onClick={() => {
              navigate('/');
              dispatch(logout())
            }} color='secondary' variant="outlined">Выход</Button>
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
