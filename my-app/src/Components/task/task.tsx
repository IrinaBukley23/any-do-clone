import './task.modules.scss';
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { ITask, State } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { editColumnTitle, setRemoveColumn } from '../../store/actions/actionCreators';
import CancelIcon from '@mui/icons-material/Cancel';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

interface IProps {
    taskItem: ITask;
}

const Task = (props: IProps) => {
    const [open, setOpen] = useState(false);
    const { taskTitle, taskId, taskDescr } = props.taskItem;
    const dispatch = useDispatch();
  
    const [isEdit, setIsEdit] = useState(false);
    const [correctedTitle, setCorrectedTitle] = useState(taskTitle);
  
    const handleEdit = () => {
      setIsEdit(true);
    };
  
    const handleCorrect = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCorrectedTitle(e.target.value);
    };
  
    const handleSave = () => {
      setIsEdit(false);
      dispatch(editColumnTitle(taskId, correctedTitle));
    };
  
    const handleCancel = () => {
      setIsEdit(false);
    };

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleRemove = () => {
        dispatch(setRemoveColumn(taskId))
    };

    return (
        <div id={taskId} key={taskId}>
            {!isEdit && <Typography variant="h5" className="task" onClick={handleEdit}>{taskTitle}</Typography>}
            {isEdit && (
                <div className='column__edit'>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" value={correctedTitle} onChange={handleCorrect} sx={{width: '160px'}} />
                    <ThumbUpAltIcon onClick={handleSave} sx={{color: 'green', ml: '10px'}}></ThumbUpAltIcon>
                    <CancelIcon onClick={handleCancel} sx={{color: 'blue', ml: '10px'}}></CancelIcon>
                </div>
            )}
            <div>
                <Tooltip title="Delete column">
                    <IconButton 
                        onClick={handleOpen}
                        sx={{position: 'absolute', top: '5px', right: '5px' , color: 'red'}}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <Dialog
                    open={open}
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
                        <Button onClick={handleRemove} autoFocus>
                            Да
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Button
                color='primary'
                variant='contained'
                sx={{ height: '40px', mt: '30px'}}>
                Добавить задачу
            </Button>
        </div>
    )
}

export default Task;