import { Button, Grid, TextField, Typography } from '@mui/material'
import styles from '../loginForm/form.module.scss';
import { useState } from 'react';
import { minNumberOfLetters } from '../../types/constants';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store/hooks';
import { createCard } from '../../store/reducers/cards';
import { IColumn } from '../../types/types';

interface IProps {
  column: IColumn;
  handleClose: () => void;
}

const TaskForm = ({column, handleClose }: IProps) => {
  const dispatch = useAppDispatch();

  const [isError, setIsError] = useState(false);
  const [isErrorDescr, setIsErrorDescr] = useState(false);
  const [isValidate, setIsValidate] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { t, } = useTranslation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (value: string) => void,
    showError: (value: boolean) => void
  ) => {
    (e.target.value.length < minNumberOfLetters) ? showError(true) : showError(false);
    (e && e.target.value.length >= minNumberOfLetters) ? setIsValidate(false) : setIsValidate(true);
    callback(e.target.value);
  };

  const handleTaskSubmit = () => {
    dispatch(createCard({
      columnId: column.id,
      title,
      description,
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, setTitle, setIsError)}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, setDescription, setIsErrorDescr)}
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
