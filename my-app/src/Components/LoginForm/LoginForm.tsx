import { Tab, Tabs } from '@mui/material'
import React, { SyntheticEvent, useState } from 'react';
import { typeForm } from '../../utils/types';
import { DialogModal } from '../UI/DialogModal';
import { LoginView } from './LoginView';
import { RegistrationView } from './RegistrationView';

interface LoginProps {
  onClose: () => void
  onChange: (typeForm: typeForm) => void
  isOpen: boolean
  kindForm: typeForm
}

export const LoginForm = ({ onClose, onChange, isOpen, kindForm = typeForm.login }: LoginProps) => {
  const handleChange = (e: SyntheticEvent, newValue: typeForm) => {
    onChange(newValue)
  }

  return (
    <DialogModal onClose={onClose} isOpen={isOpen}>
      <Tabs onChange={handleChange} value={kindForm}>
        <Tab label='Войти' value={typeForm.login} />
        <Tab label='Зарегистрироваться' value={typeForm.registr} />
      </Tabs>
      {kindForm === 'login' ? <LoginView /> : <RegistrationView />}
    </DialogModal>
  )
}
