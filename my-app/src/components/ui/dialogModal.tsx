import { Button, Dialog, DialogActions, DialogContent, IconButton, Paper } from '@mui/material'
import { Box } from '@mui/system'
import { ReactNode } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import styles from './dialogModal.module.scss'
import { FormParam } from '../../types/types'
import { useTranslation } from 'react-i18next';
interface PropsDialogModal {
  onClose?: () => void
  isOpen: boolean
  formsParams: FormParam
  children: ReactNode
}

export const DialogModal = ({ onClose, isOpen, formsParams, children }: PropsDialogModal) => {
  const { t, } = useTranslation();

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <Box>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            zIndex: 200,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent className={styles.dialog}>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('taskCancel')}</Button>
        <Button form={formsParams.formId} color='primary' variant='contained' type='submit'>
          {formsParams.textApprove}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
