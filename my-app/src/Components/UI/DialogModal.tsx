import { Dialog, IconButton, Paper } from '@mui/material'
import { Box } from '@mui/system'
import { ReactNode } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import styles from './dialogModal.module.scss'
interface PropsDialogModal {
  onClose: () => void
  isOpen: boolean
  children: ReactNode
}

export const DialogModal = ({ onClose, isOpen, children }: PropsDialogModal) => {
  const handleClose = () => {
    onClose()
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
      <Paper className={styles.dialog}>{children}</Paper>
    </Dialog>
  )
}
