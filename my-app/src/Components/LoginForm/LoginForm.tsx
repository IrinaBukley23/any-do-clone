import { Tab, Tabs } from '@mui/material'
// import { useDispatch } from 'react-redux';
// import { loginSlice } from '../../store/reducers/loginSlice';
import { typeForm } from '../../types/enum'
import { DialogModal } from '../UI/DialogModal'
import { LoginView } from './LoginView'
import { SyntheticEvent } from 'react'
import { RegistrationView } from './RegistrationView'

interface LoginProps {
  onClose: () => void
  onChange: (typeForm: typeForm) => void
  isOpen: boolean
  kindForm: typeForm
}
const formsParams = {
  [typeForm.login]: {
    textAprove: 'Войти',
    formId: `form-${typeForm.login}`,
  },
  [typeForm.registr]: {
    textAprove: 'Зарегистрироваться',
    formId: `form-${typeForm.login}`,
  },
}

export const LoginForm = ({ onClose, onChange, isOpen, kindForm = typeForm.login }: LoginProps) => {
  // const { setToken, setUser } = loginSlice.actions
  // const dispatch = useDispatch()

  const handleChange = (e: SyntheticEvent, newValue: typeForm) => {
    onChange(newValue)
  }

  return (
    <DialogModal onClose={onClose} isOpen={isOpen} formsParams={formsParams[kindForm]}>
      <Tabs onChange={handleChange} value={kindForm}>
        <Tab label='Войти' value={typeForm.login} />
        <Tab label='Зарегистрироваться' value={typeForm.registr} />
      </Tabs>
      {kindForm === 'login' ? (
        <LoginView formId={formsParams[kindForm].formId} onClose={onClose} />
      ) : (
        <RegistrationView formId={formsParams[kindForm].formId} onClose={onClose} />
      )}
    </DialogModal>
  )
}
