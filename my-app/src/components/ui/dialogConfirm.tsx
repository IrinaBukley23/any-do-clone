import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useTranslation } from 'react-i18next';

interface PropsDialogModal {
    handleRemove: () => void;
    isOpen: boolean;
    handleClose: () => void;
  }

export const DialogConfirm = ({ isOpen, handleClose, handleRemove }: PropsDialogModal) => {  
    const { t, } = useTranslation();

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            { `${t('modalDeleteTitle')}` }
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {t('modalDeleteText')}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t('modalDeleteNo')}</Button>
                <Button onClick={handleRemove} autoFocus>
                    {t('modalDeleteYes')}
                </Button>
            </DialogActions>
        </Dialog>
    )
  }
  