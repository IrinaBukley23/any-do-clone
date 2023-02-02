import React from 'react'
import './App.css'
import { Avatar, Button, Divider } from '@mui/material'

import { LoginForm } from './Components/LoginForm/LoginForm'
// import { Avatar, Button } from '@mui/material';
import StartPage from './pages/startPage/startPage'

function App() {
  // const { user } = useSelector((state: RootState) => state.loginReducer)

  return (
    <div className='App'>
      <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' color='secondary' />

      {/* <Button color='primary' variant="contained" disabled>Text</Button>
      <Button color='primary' variant="contained">Text</Button>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" color='secondary' /> */}
      <StartPage />
    </div>
  )
}

export default App
