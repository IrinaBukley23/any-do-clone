import styles from './column.module.scss';
import React, { useState } from 'react';
import { Button, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { ColumnItemType, State } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { editColumnTitle, setCurrentId, setRemoveColumn } from '../../store/actions/actionCreators';
import CancelIcon from '@mui/icons-material/Cancel';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Task from '../task/task';
import { DialogConfirm } from '../UI/DialogConfirm';
import ResponsiveDialog from '../UI/OpenDialog';

interface IProps {
    columnItem: ColumnItemType;
}

const Column = (props: IProps) => {
    const [open, setOpen] = useState(false);
    const [isTaskModal, setIsTaskModal] = useState(false);
    const { columnTitle, columnId } = props.columnItem;
    const dispatch = useDispatch();
    const { taskList } = useSelector((state: State) => state.task);
    const taskQuantity = taskList.length;
  
    const [isEdit, setIsEdit] = useState(false);
    const [correctedTitle, setCorrectedTitle] = useState(columnTitle);
  
    const handleEdit = () => {
      setIsEdit(true);
    };
  
    const handleCorrect = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCorrectedTitle(e.target.value);
    };
  
    const handleSave = () => {
      setIsEdit(false);
      dispatch(editColumnTitle(columnId, correctedTitle));
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

    const handleTaskFormOpen = (e: React.SyntheticEvent) => {
        const targetId = ((e.target as HTMLElement).closest('div') as HTMLElement).id;
        dispatch(setCurrentId(targetId));
        setIsTaskModal(true);
    };
    const handleTaskFormClose = () => {
        setIsTaskModal(false);
    };

    const handleRemove = () => {
        dispatch(setRemoveColumn(columnId))
    };

    return (
        <div id={columnId} key={columnId} className={styles.column}>
            {!isEdit && <Typography variant="h5" onClick={handleEdit}>{columnTitle}</Typography>
            }
            {isEdit && (
                <div className={styles.column__edit}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" value={correctedTitle} onChange={handleCorrect} sx={{width: '160px'}} />
                    <ThumbUpAltIcon onClick={handleSave} sx={{color: 'green', ml: '10px'}}></ThumbUpAltIcon>
                    <CancelIcon onClick={handleCancel} sx={{color: 'blue', ml: '10px'}}></CancelIcon>
                </div>
            )}
            <Typography variant="h5" component="p" sx={{fontSize: '14px', textAlign: 'left'}}>Карточек - {taskQuantity}</Typography>
            <div>
                <Tooltip title="Delete column">
                    <IconButton 
                        onClick={handleOpen}
                        sx={{position: 'absolute', top: '5px', right: '5px' , color: '#ab45fa'}}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <DialogConfirm isOpen={open} handleClose={handleClose} handleRemove={handleRemove} />
            </div>
            <div className={styles.column__wrapper}>
                {taskList?.filter(task => task.currentColumnId === columnId).map((task, i) => (
                    <Task key={i} taskItem={task}/>
                ) )}
            </div>
            <Button onClick={handleTaskFormOpen} color='primary' variant='contained' sx={{ height: '40px', mt: '30px'}}>
                Добавить задачу
            </Button>
            <ResponsiveDialog isOpen={isTaskModal} handleClose={handleTaskFormClose} />
        </div>
    )
}

export default Column;
