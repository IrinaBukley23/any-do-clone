import './column.scss';
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { IColumn, State } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { editColumnTitle, setRemoveColumn } from '../../store/actions/actionCreators';
import CancelIcon from '@mui/icons-material/Cancel';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

interface IProps {
    columnItem: IColumn;
}

const Column = (props: IProps) => {
    const [open, setOpen] = useState(false);
    const { columnTitle, columnId } = props.columnItem;
    const dispatch = useDispatch();
    // const { taskList } = useSelector((state: State) => state.task);
    // const taskQuantity = taskList.length;
    const taskQuantity = 0;
  
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

    const handleRemove = () => {
        dispatch(setRemoveColumn(columnId))
    };

    return (
        <div id={columnId} key={columnId} className="column">
            {!isEdit && <Typography variant="h5" onClick={handleEdit}>{columnTitle}</Typography>}
            {isEdit && (
                <div className='column__edit'>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" value={correctedTitle} onChange={handleCorrect} sx={{width: '160px'}} />
                    <ThumbUpAltIcon onClick={handleSave} sx={{color: 'green', ml: '10px'}}></ThumbUpAltIcon>
                    <CancelIcon onClick={handleCancel} sx={{color: 'blue', ml: '10px'}}></CancelIcon>
                </div>
            )}
            <Typography variant="h5" component="p" sx={{fontSize: '14px', textAlign: 'left'}}>Карточек - {taskQuantity}</Typography>
                {/* <div className="column__wrapper">
                    <div className="task">Task</div>
                </div> */}
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

export default Column;