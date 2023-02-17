import styles from './task.module.scss'
import React, { useState } from 'react';
import { FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Tooltip, Typography } from '@mui/material';
import { ITask } from '../../types/types';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { editTaskDescr, editTaskTitle, setRemoveTask } from '../../store/actions/actionCreators';
import CancelIcon from '@mui/icons-material/Cancel';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { DialogConfirm } from '../UI/DialogConfirm';

interface IProps {
    taskItem: ITask;
}

const users = [
  {
    name: 'Ирина',
    email: 'irina@mail.ru'
  },
  {
    name: 'Полина',
    email: 'polina@mail.ru'
  },
  {
    name: 'Владислава',
    email: 'vlada@mail.ru'
  }
];

const regUsers = async function getRandomQuote() {
  try {
    const url = 'http://143.42.31.53:8080/users'
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  } catch(error) {
    console.log(error);
  }
}

const Task = (props: IProps) => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const { taskTitle, taskId, taskDescr, taskOrder } = props.taskItem;
    const dispatch = useDispatch();
  
    const [isEditTitle, setIsEditTitle] = useState(false);
    const [isEditDescr, setIsEditDescr] = useState(false);
    const [correctedTitle, setCorrectedTitle] = useState(taskTitle);
    const [correctedDescr, setCorrectedDescr] = useState(taskDescr);

    const [user, setUser] = React.useState('');

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setUser(event.target.value as string);
  };
  
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

    const handleRemove = () => {
      dispatch(setRemoveTask(taskId));
      setOpenConfirm(false);
    };

    const handleOpenConfirm = () => {
      setOpenConfirm(true);
      };
    const handleCloseConfirm = () => {
      setOpenConfirm(false);
    };

    return (
        <div id={taskId} key={taskId} className={styles.task}>
            {!isEditTitle && <Typography variant="h5" className={styles.task} onClick={handleEditTitle}>{taskTitle}</Typography>}
            {isEditTitle && (
                <div className={styles.task__edit}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" value={correctedTitle} onChange={handleCorrectTitle} sx={{width: '160px'}} />
                    <ThumbUpAltIcon onClick={handleSaveTitle} sx={{color: 'green', ml: '10px'}}></ThumbUpAltIcon>
                    <CancelIcon onClick={handleCancelTitle} sx={{color: 'blue', ml: '10px'}}></CancelIcon>
                </div>
            )}
            {!isEditDescr && <Typography variant="h5" paragraph={true} onClick={handleEditDescr} noWrap={true} sx={{fontSize: '14px', textAlign: 'left', pl: '10px', mb: '15px', mt: '15px'}}>{taskDescr}</Typography>}
            {isEditDescr && (
                <div className={styles.task__edit}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" value={correctedDescr} onChange={handleCorrectDescr} sx={{width: '160px', fontSize: '14px', textAlign: 'left',}} />
                    <ThumbUpAltIcon onClick={handleSaveDescr} sx={{color: 'green', ml: '10px'}}></ThumbUpAltIcon>
                    <CancelIcon onClick={handleCancelDescr} sx={{color: 'blue', ml: '10px'}}></CancelIcon>
                </div>
            )}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">User</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user}
                label="User"
                onChange={handleChangeSelect}
                sx={{width: '80%', fontSize: '14px', textAlign: 'left'}}
              >
                {users.map((user, i) => (
                  <MenuItem key={i} value={user.name}>{user.name} ({user.email})</MenuItem>
                ))}
              </Select>
            </FormControl>
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