import './App.css'
import { Avatar, Button } from '@mui/material'
import { useState } from 'react'
import { LoginForm } from './components/LoginForm/LoginForm'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'

function App() {
  // const { user } = useSelector((state: RootState) => state.loginReducer)
  const [isOpen, toggleOpen] = useState(false)
  const handleClose = () => {
    toggleOpen(!isOpen)
  }

  return (
    <div className='App'>
      <Button color='primary' variant='contained' disabled>
        Text
      </Button>
      <LoginForm onClose={handleClose} isOpen={isOpen} />

      <Button onClick={handleClose} color='primary' variant='contained'>
        Text
      </Button>
      <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' color='secondary' />
    </div>
  )
}

export default App
