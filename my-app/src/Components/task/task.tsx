import './task.modules.scss';
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { ITask } from '../../types/types';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { editColumnTitle, editTaskDescr, editTaskTitle, setRemoveColumn, setRemoveTask } from '../../store/actions/actionCreators';
import CancelIcon from '@mui/icons-material/Cancel';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { DialogConfirm } from '../UI/DialogConfirm';

interface IProps {
    taskItem: ITask;
}

const Task = (props: IProps) => {
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const { taskTitle, taskId, taskDescr } = props.taskItem;
    const dispatch = useDispatch();
  
    const [isEditTitle, setIsEditTitle] = useState(false);
    const [isEditDescr, setIsEditDescr] = useState(false);
    const [correctedTitle, setCorrectedTitle] = useState(taskTitle);
    const [correctedDescr, setCorrectedDescr] = useState(taskDescr);
  
    const handleEditTitle = () => {
      setIsEditTitle(true);
    };
    const handleEditDescr = () => {
        setIsEditDescr(true);
      };
  
    const handleCorrectTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCorrectedTitle(e.target.value);
    };

    const handleCorrectDescr = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCorrectedDescr(e.target.value);
      };
  
    const handleSaveTitle = () => {
      setIsEditTitle(false);
      dispatch(editTaskTitle(taskId, correctedTitle));
    };

    const handleSaveDescr = () => {
        setIsEditDescr(false);
        dispatch(editTaskDescr(taskId, correctedDescr));
      };
  
    const handleCancelTitle = () => {
      setIsEditTitle(false);
    };

    const handleCancelDescr = () => {
        setIsEditDescr(false);
      };

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleRemove = () => {
        dispatch(setRemoveTask(taskId))
    };

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
      };
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    return (
        <div id={taskId} key={taskId} className="task">
            {!isEditTitle && <Typography variant="h5" className="task" onClick={handleEditTitle}>{taskTitle}</Typography>}
            {isEditTitle && (
                <div className='column__edit'>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" value={correctedTitle} onChange={handleCorrectTitle} sx={{width: '160px'}} />
                    <ThumbUpAltIcon onClick={handleSaveTitle} sx={{color: 'green', ml: '10px'}}></ThumbUpAltIcon>
                    <CancelIcon onClick={handleCancelTitle} sx={{color: 'blue', ml: '10px'}}></CancelIcon>
                </div>
            )}
            {!isEditDescr && <Typography variant="h5" className="task" onClick={handleEditDescr}>{taskDescr}</Typography>}
            {isEditDescr && (
                <div className='column__edit'>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" value={correctedDescr} onChange={handleCorrectDescr} sx={{width: '160px'}} />
                    <ThumbUpAltIcon onClick={handleSaveDescr} sx={{color: 'green', ml: '10px'}}></ThumbUpAltIcon>
                    <CancelIcon onClick={handleCancelDescr} sx={{color: 'blue', ml: '10px'}}></CancelIcon>
                </div>
            )}
            <div>
                <Tooltip title="Delete task">
                    <IconButton 
                        onClick={handleOpenConfirm}
                        sx={{position: 'absolute', bottom: '0', right: '0' , color: '#ab45fa'}}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <DialogConfirm isOpen={openConfirm} handleClose={handleCloseConfirm} handleRemove={handleRemove} />
            </div>
        </div>
    )
}

export default Task;