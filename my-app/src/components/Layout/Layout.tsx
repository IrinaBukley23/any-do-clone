import { Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logout } from '../../store/reducers/authorization'
import SideBar from '../sideBar/sideBar'

import styles from './Layout.module.scss'

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const name = useAppSelector(state => state.authorization.loginName);
  const email = useAppSelector(state => state.authorization.loginEmail);
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
          <Grid item xs={2}>
            <Box>
              {name}
            </Box>
            <Box>
              {email}
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Button 
              onClick={() => {
                navigate('/');
                dispatch(logout())
              }} 
              color='secondary' 
              variant="outlined">
              Выход
            </Button>
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
