import { Tab, Tabs } from '@mui/material'
import { DialogForm } from '../../types/enum'
import { DialogModal } from '../ui/dialogModal'
import { LoginView } from './loginView'
import { SyntheticEvent } from 'react'
import { RegistrationView } from './registrationView'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { hideDialog, selectDialogForm } from '../../store/reducers/authorization'
import { useTranslation } from 'react-i18next'

export const LoginForm = () => {
  const dispatch = useAppDispatch()
  const { isDialogShown, dialogForm: currentDialogForm } = useAppSelector(
    (state) => state.authorization,
  )
  const { t } = useTranslation()
  const dialogForm: DialogForm = currentDialogForm ?? DialogForm.login
  const formsParams = {
    [DialogForm.login]: {
      textApprove: `${t('loginFormEnterText')}`,
      formId: `form-${DialogForm.login}`,
    },
    [DialogForm.register]: {
      textApprove: `${t('loginFormRegText')}`,
      formId: `form-${DialogForm.register}`,
    },
  }

  const formParams = formsParams[dialogForm]
  const formId = formParams.formId

  const handleChange = (e: SyntheticEvent, newValue: DialogForm) => {
    dispatch(selectDialogForm(newValue))
  }

  return (
    <DialogModal
      onClose={() => dispatch(hideDialog())}
      isOpen={isDialogShown}
      formsParams={formParams}
    >
      <Tabs onChange={handleChange} value={dialogForm}>
        <Tab label={t('loginFormEnterText')} value={DialogForm.login} />
        <Tab label={t('loginFormRegText')} value={DialogForm.register} />
      </Tabs>

      {dialogForm === DialogForm.login ? (
        <LoginView formId={formId} />
      ) : (
        <RegistrationView formId={formId} />
      )}
    </DialogModal>
  )
}
