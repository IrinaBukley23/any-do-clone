import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TaskForm from '../taskForm/taskForm';
import { useTranslation } from 'react-i18next';
import { IColumn } from '../../api/ColumnApi';

interface PropsDialogModal {
    column: IColumn
    isOpen: boolean;
    handleClose: () => void;
  }

 const ResponsiveDialog = ({column, isOpen, handleClose }: PropsDialogModal) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { t, } = useTranslation();

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {`${t('modalCreateTask')}`}
        </DialogTitle>
        <DialogContent>
          <TaskForm column={column} handleClose={handleClose}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ResponsiveDialog;
