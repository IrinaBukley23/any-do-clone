import React from 'react'
import './App.css'
import { Avatar } from '@mui/material'
// import { Avatar, Button } from '@mui/material';
import StartPage from './pages/startPage/startPage'
import { Provider } from 'react-redux'
import setupStore from './store/store'

function App() {
  // const { user } = useSelector((state: RootState) => state.loginReducer)
  const store = setupStore()
  return (
    <Provider store={store}>
      <div className='App'>
        <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' color='secondary' />
        <StartPage />
      </div>
    </Provider>
  )
}

export default App
