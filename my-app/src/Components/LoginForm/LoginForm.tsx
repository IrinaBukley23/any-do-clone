import { Tab, Tabs } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { DialogModal } from '../UI/DialogModal'
import { LoginView } from './LoginView'
import { RegistrationView } from './RegistrationView'

interface LoginProps {
  onClose: () => void
  isOpen: boolean
}
enum typeForm {
  login = 'login',
  registr = 'registration',
}

export const LoginForm = ({ onClose, isOpen }: LoginProps) => {
  const [kindForm, setKindForm] = useState(typeForm.login)
  const handleChange = (e: SyntheticEvent, newValue: typeForm) => {
    setKindForm(newValue)
  }

  return (
    <DialogModal onClose={onClose} isOpen={isOpen}>
      <Tabs onChange={handleChange} value={kindForm}>
        <Tab label='Login' value={typeForm.login} />
        <Tab label='Registration' value={typeForm.registr} />
      </Tabs>
      {kindForm === 'login' ? <LoginView /> : <RegistrationView />}
    </DialogModal>
  )
}
