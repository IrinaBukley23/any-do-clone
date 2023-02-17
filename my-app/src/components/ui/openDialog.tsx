import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TaskForm from '../taskForm/taskForm';


interface PropsDialogModal {
    isOpen: boolean;
    handleClose: () => void;
  }

 const ResponsiveDialog = ({ isOpen, handleClose }: PropsDialogModal) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'Создать задачу?'}
        </DialogTitle>
        <DialogContent>
          <TaskForm handleClose={handleClose}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ResponsiveDialog;
