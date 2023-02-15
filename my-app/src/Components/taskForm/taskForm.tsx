import { Button, Grid, TextField, Typography } from '@mui/material'
import styles from '../loginForm/form.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { setTaskDescr, setTaskList, setTaskTitle } from '../../store/actions/actionCreators';
import { State } from '../../types/types';
import { useState } from 'react';
import nextId from 'react-id-generator';

interface IProps {
  handleClose: () => void;
}

const TaskForm = ({ handleClose }: IProps) => {
  const { taskList, taskTitle, taskDescr } = useSelector((state: State) => state.task);
  const { currentId } = useSelector((state: State) => state.currentId);
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [isErrorDescr, setIsErrorDescr] = useState(false);
  const [isValidate, setIsValidate] = useState(true);
  const myId = nextId();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (value: string) => AnyAction,
    foo: (value: boolean) => void
  ) => {
    (e.target.value.length < 3) ? foo(true) : foo(false);
    (e.target.value.length >= 3 && e) ? setIsValidate(false) : setIsValidate(true);
    dispatch(callback(e.target.value));
  };

  const handleTaskSubmit = () => {
    dispatch(
      setTaskList([
        ...taskList,
        {
          taskId: myId,
          taskTitle: taskTitle,
          taskDescr: taskDescr,
          currentColumnId: currentId,
        },
      ])
    );
    handleClose();
  };

  return (
    <form id='task' className={styles.form__content}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id='title'
            name='title'
            label='Title'
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, setTaskTitle, setIsError)}
            required
          />
          {isError && <Typography variant="h5" component="p" sx={{fontSize: '12px', textAlign: 'left', color: 'red'}}>Необходимо минимум три символа</Typography>}
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='descr'
            name='descr'
            label='Description'
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, setTaskDescr, setIsErrorDescr)}
            required
          />
          {isErrorDescr && <Typography variant="h5" component="p" sx={{fontSize: '12px', textAlign: 'left', color: 'red'}}>Необходимо минимум три символа</Typography>}
        </Grid>
      </Grid>
      <Button autoFocus onClick={handleClose}>Отмена</Button>
      <Button onClick={handleTaskSubmit} disabled={isValidate}>Создать</Button>
    </form>
  )
}

export default TaskForm;
