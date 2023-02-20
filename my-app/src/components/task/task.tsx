import styles from './task.module.scss';
import React, { useState } from 'react';
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
import { ICard } from '../../api/CardApi';
import { deleteCard, updateCardDescription, updateCardTitle } from '../../store/reducers/cards';
import { useAppDispatch } from '../../store/hooks';

interface IProps {
  card: ICard;
}

const users = [
  {
    name: 'Ирина',
    email: 'irina@mail.ru',
  },
  {
    name: 'Полина',
    email: 'polina@mail.ru',
  },
  {
    name: 'Владислава',
    email: 'vlada@mail.ru',
  },
]

const Task = (props: IProps) => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const { t, } = useTranslation();
    const card = props.card;
    const { title: taskTitle, id: taskId, description: taskDescr } = card;
    const dispatch = useAppDispatch();
  
    const [isEditTitle, setIsEditTitle] = useState(false);
    const [isEditDescr, setIsEditDescr] = useState(false);
    const [correctedTitle, setCorrectedTitle] = useState(taskTitle);
    const [correctedDescr, setCorrectedDescr] = useState(taskDescr);

  const [user, setUser] = React.useState('')

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setUser(event.target.value as string)
  }

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
    setOpenConfirm(false)
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true)
  };

  const handleEditTitle = () => {
    setIsEditTitle(true)
  };

  const handleCorrectTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectedTitle(e.target.value)
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false)
  };

  const handleEditDescr = () => {
    setIsEditDescr(true)
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
          <IconButton color='success' onClick={handleSaveTitle}>
            <DownloadDoneIcon />
          </IconButton>
          <IconButton color='error' onClick={handleCancelTitle}>
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
