import { Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import styles from '../LoginForm/form.module.scss';
import nextId from 'react-id-generator';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { setTaskList } from '../../store/actions/actionCreators';
import { State } from '../../types/types';

const validationSchem = yup.object({
  title: yup
    .string()
    .min(3, 'Длина заголовка должна быть минимум 3 символа ')
    .required('Поле обязательно для заполнения'),
  descr: yup
    .string()
    .min(8, 'Длина описания должна быть минимум 5 символов ') 
    .required('Поле обязательно для заполнения'), 
})

interface ViewProps {
  formId: string
  onClose: () => void
}

const TaskForm = ({ formId, onClose }: ViewProps) => {
  const formik = useFormik({
    initialValues: { title: '', descr: '' },
    validationSchema: validationSchem,
    onSubmit: (values) => {
      onClose();
    },
  })
  // const { taskList, taskTitle, taskDescr } = useSelector((state: State) => state.task);
  const dispatch = useDispatch();
  const myId = nextId();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (value: string) => AnyAction
  ) => {
    dispatch(callback(e.target.value));
  };

  const handleTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      setTaskList([
        // ...taskList,
        // {
        //   taskId: myId,
        //   taskTitle: taskTitle,
        //   taskDescr: taskDescr,
        // //   taskUser: taskUser,
        // },
      ])
    );
  };


  return (
    <form id={formId} onSubmit={formik.handleSubmit} className={styles.form__content}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id='title'
            name='title'
            label='Title'
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.errors.title}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='descr'
            name='descr'
            label='Description'
            fullWidth
            value={formik.values.descr}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.descr && Boolean(formik.errors.descr)}
            helperText={formik.errors.descr}
          />
        </Grid>
      </Grid>
    </form>
  )
}

export default TaskForm;
