import styles from './task.module.scss';
import React, { useEffect, useState } from 'react';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { DialogConfirm } from '../ui/dialogConfirm';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import { useTranslation } from 'react-i18next';
import { deleteCard, updateCard, updateCardDescription, updateCardTitle } from '../../store/reducers/cards';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadUsers, userSelectors } from '../../store/reducers/users';
import { ICard } from '../../types/types';

interface IProps {
  card: ICard;
}

const Task = (props: IProps) => {
  const card = props.card;
  const { title: taskTitle, id: taskId, description: taskDescr, participant} = card;
  const { t, } = useTranslation();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isEditDescr, setIsEditDescr] = useState(false);
  const [correctedTitle, setCorrectedTitle] = useState(taskTitle);
  const [correctedDescr, setCorrectedDescr] = useState(taskDescr);
  const [user, setUser] = useState(participant);
  const [isFirstEffect, setIsFirstEffect] = useState(true);

  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => userSelectors.selectAll(state.users));

  useEffect(() => {
    if (isFirstEffect) {
      setIsFirstEffect(false);
      dispatch(loadUsers());
    }
  });

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setUser(event.target.value as string);
    dispatch(updateCard({
      id: taskId,
      cardUpdate: { ...card, participant: event.target.value }
    }));
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
  
  const handleSaveTitle = async () => {
    await dispatch(updateCardTitle(taskId, correctedTitle));

    setIsEditTitle(false);
  };

  const handleSaveDescr = async () => {
    await dispatch(updateCardDescription(taskId, correctedDescr))

    setIsEditDescr(false);
  };

  const handleCancelTitle = () => {
    setIsEditTitle(false);
  };

  const handleRemove = () => {
    dispatch(deleteCard(taskId))
    setOpenConfirm(false);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false)
  };

  const handleCancelDescr = () => {
    setIsEditDescr(false)
  };

  return (
    <div id={String(taskId)} key={taskId} className={styles.task}>
      {!isEditTitle &&
        <Typography
          variant='h5'
          className={styles.task__title}
          onDoubleClick={handleEditTitle}
        >
          {taskTitle}
        </Typography>
      }
      {isEditTitle && (
        <div className='task__edit'>
          <TextField 
            id='outlined-basic'
            label=''
            variant='outlined'
            placeholder=''
            value={correctedTitle}
            onChange={handleCorrectTitle}
            sx={{width: '160px'}}
          />
          <IconButton color='success' onClick={handleSaveTitle}>
            <DownloadDoneIcon />
          </IconButton>
          <IconButton color='error' onClick={handleCancelTitle}>
            <CancelIcon />
          </IconButton>
        </div>
      )}
      {!isEditDescr &&
        <Typography
          variant='h5'
          onDoubleClick={handleEditDescr}
          sx={{fontSize: '14px', textAlign: 'left', pl: '10px', mb: '15px', mt: '15px'}}
        >
          {taskDescr}
        </Typography>
      }
      {isEditDescr && (
        <div className='task__edit'>
          <TextField
            id='outlined-basic'
            label=''
            variant='outlined'
            placeholder=''
            value={correctedDescr} 
            onChange={handleCorrectDescr} 
            sx={{width: '160px', fontSize: '14px', textAlign: 'left',}}
          />
          <IconButton color='success' onClick={handleSaveDescr}>
            <DownloadDoneIcon />
          </IconButton>
          <IconButton color='error' onClick={handleCancelDescr}>
            <CancelIcon />
          </IconButton>
        </div>
      )}
      <FormControl fullWidth>
        <InputLabel>{t('taskUser')}</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={user}
          label=''
          onChange={handleChangeSelect}
          sx={{width: '80%', fontSize: '14px', textAlign: 'left'}}
        >
          {users.map((user, i) => (
            <MenuItem key={i} value={user.name}>{user.name} ({user.email})</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
        <Tooltip title={t('taskDel')}>
          <IconButton
            onClick={handleOpenConfirm}
            sx={{position: 'absolute', bottom: '0', right: '0' , color: '#ab45fa'}}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <DialogConfirm
          isOpen={openConfirm}
          handleClose={handleCloseConfirm}
          handleRemove={handleRemove}
        />
      </div>
    </div>
  )
}

export default Task
