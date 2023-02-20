import { Button, Grid, TextField, Typography } from '@mui/material'
import styles from '../loginForm/form.module.scss';
import { AnyAction } from 'redux';
import { setTaskDescr, setTaskTitle } from '../../store/actions/actionCreators';
import { useState } from 'react';
import { minNumberOfLetters } from '../../types/constants';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createCard } from '../../store/reducers/cards';
import { IColumn } from '../../api/ColumnApi';

interface IProps {
  column: IColumn
  handleClose: () => void;
}

const TaskForm = ({column, handleClose }: IProps) => {
  const { taskTitle, taskDescr } = useAppSelector(state => state.task);
  const dispatch = useAppDispatch();

  const [isError, setIsError] = useState(false);
  const [isErrorDescr, setIsErrorDescr] = useState(false);
  const [isValidate, setIsValidate] = useState(true);

  const { t, } = useTranslation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (value: string) => AnyAction,
    showError: (value: boolean) => void
  ) => {
    (e.target.value.length < minNumberOfLetters) ? showError(true) : showError(false);
    (e && e.target.value.length >= minNumberOfLetters) ? setIsValidate(false) : setIsValidate(true);
    dispatch(callback(e.target.value));
  };

  const handleTaskSubmit = () => {
    dispatch(createCard({
      columnId: column.id,
      title: taskTitle,
      description: taskDescr,
      order: 0
    }))
    handleClose();
  };

  return (
    <form id='task' className={styles.form__content}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id='title'
            name='title'
            label={t('taskTitle')}
            placeholder=''
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, setTaskTitle, setIsError)}
            required
          />
          {isError && <Typography variant="h5" component="p" sx={{fontSize: '12px', textAlign: 'left', color: 'red'}}>{t('taskTitleError')}</Typography>}
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='descr'
            name='descr'
            label={t('taskDescr')}
            placeholder=''
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, setTaskDescr, setIsErrorDescr)}
            required
          />
          {isErrorDescr && <Typography variant="h5" component="p" sx={{fontSize: '12px', textAlign: 'left', color: 'red'}}>{t('taskTitleError')}</Typography>}
        </Grid>
      </Grid>
      <Button autoFocus onClick={handleClose}>{t('taskCancel')}</Button>
      <Button onClick={handleTaskSubmit} disabled={isValidate}>{t('taskCreate')}</Button>
    </form>
  )
}

export default TaskForm;
