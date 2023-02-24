import './task.scss'
import React, { useState } from 'react';
import { FormControl, IconButton, Chip, MenuItem, TextField, Tooltip, Typography } from '@mui/material';
import { ITask, State, TypeUserMenu } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { editTaskDescr, editTaskTitle, setRemoveTask, setTaskUser } from '../../store/actions/actionCreators';
import CancelIcon from '@mui/icons-material/Cancel';
import { DialogConfirm } from '../ui/dialogConfirm';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone'
import { useTranslation } from 'react-i18next';
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import Menu from '@mui/material/Menu';


interface IProps {
    taskItem: ITask;
}

const users: TypeUserMenu[] = [
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



const ITEM_HEIGHT = 48;

const Task = (props: IProps) => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const { taskTitle, taskId, taskDescr } = props.taskItem;
    const { taskList } = useSelector((state: State) => state.task)
    const dispatch = useDispatch();
    const { t, } = useTranslation();
    const [isEditTitle, setIsEditTitle] = useState(false);
    const [isEditDescr, setIsEditDescr] = useState(false);
    const [isEditUser, ] = useState(false);
    const [correctedTitle, setCorrectedTitle] = useState(taskTitle);
    const [correctedDescr, setCorrectedDescr] = useState(taskDescr);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
   
    const handleClickUser = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleSelectUser = (e: React.SyntheticEvent) => {
      const selectedUser = (e.target as HTMLElement).id.split('-')[0];
      dispatch(setTaskUser(selectedUser, taskId));
      setAnchorEl(null);
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
    const resUsers: TypeUserMenu[] =  [{
      name: '',
      email: ''
    }, ...users]
    const user = taskList.filter((item) => item.taskId === taskId)[0].taskUser
    return (
        <div id={taskId} key={taskId} className="task">
            {!isEditTitle && <Typography variant="h5" className="task__title" onDoubleClick={handleEditTitle}>{taskTitle}</Typography>}
            {isEditTitle && (
                <div className="task__edit">
                    <TextField 
                      id="outlined-basic" 
                      label="" 
                      variant="outlined"
                      placeholder='' 
                      value={correctedTitle} 
                      onChange={handleCorrectTitle} 
                      sx={{width: '160px'}} />
                    <IconButton color='success' onClick={handleSaveTitle}>
                        <DownloadDoneIcon />
                    </IconButton>
                    <CancelIcon onClick={handleCancelTitle} sx={{color: '#d3586c', ml: '10px'}}></CancelIcon>
                </div>
            )}
            {!isEditDescr && <Typography variant="h5" onDoubleClick={handleEditDescr}  sx={{fontSize: '14px', textAlign: 'left', minHeight: '30px', pl: '10px', mb: '15px', mt: '15px'}}>{taskDescr}</Typography>}
            {isEditDescr && (
                <div className="task__edit">
                    <TextField 
                      id="outlined-basic" 
                      label="" 
                      variant="outlined" 
                      placeholder=''
                      value={correctedDescr} 
                      onChange={handleCorrectDescr} 
                      sx={{width: '160px', fontSize: '14px', textAlign: 'left',}} />
                    <IconButton color='success' onClick={handleSaveDescr}>
                        <DownloadDoneIcon />
                    </IconButton>
                    <CancelIcon onClick={handleCancelDescr} sx={{color: '#d3586c', ml: '10px'}}></CancelIcon>
                </div>
            )}
            <FormControl fullWidth sx={{position: 'relative'}}>
              {!isEditUser && (
                <Chip
                  variant='outlined'
                  label={(user !== '') ? (user): (`${t('taskUser')}`)}
                  sx={{width: '55%', mt: '10px', justifyContent: 'flex-start'}}
                  onClick={handleClickUser}
                  icon={<ControlPointIcon />}
                />
              ) }
              <div>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleSelectUser}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: 'auto',
                    },
                  }}
                >
                  {resUsers.map((user) => (
                    <MenuItem id={`${user.name}-${user.email}`} key={user.name} onClick={handleSelectUser}>
                      {user.name} - {user.email} 
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </FormControl>
            <div>
                <Tooltip title={t('taskDel')}>
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