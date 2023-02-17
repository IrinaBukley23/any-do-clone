import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

interface PropsDialogModal {
    handleRemove: () => void;
    isOpen: boolean;
    handleClose: () => void;
  }

export const DialogConfirm = ({ isOpen, handleClose, handleRemove }: PropsDialogModal) => {  
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {'Удаление'}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Вы действительно хотите удалить?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Нет</Button>
                <Button onClick={handleRemove} autoFocus>Да</Button>
            </DialogActions>
        </Dialog>
    )
  }
  