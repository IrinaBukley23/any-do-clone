import { Button, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import styles from '../LoginForm/form.module.scss';
import nextId from 'react-id-generator';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { setTaskDescr, setTaskList, setTaskTitle } from '../../store/actions/actionCreators';
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
  onClose?: () => void
}

const TaskForm = ({ formId, onClose }: ViewProps) => {
  const formik = useFormik({
    initialValues: { taskTitle: '', taskDescr: '' },
    validationSchema: validationSchem,
    onSubmit: (values) => {
     // onClose();
      console.log(values)
      dispatch(
        setTaskList([
          ...taskList,
          {
            taskId: taskTitle,
            taskTitle: taskTitle,
            taskDescr: taskDescr,
          //   taskUser: taskUser,
          },
        ])
      );
    }
  })
  const { taskList, taskTitle, taskDescr } = useSelector((state: State) => state.task);
  const dispatch = useDispatch();

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   callback: (value: string) => AnyAction
  // ) => {
  //   console.log(e.target.value)
  //   dispatch(callback(e.target.value));
  // };

  // const handleTaskSubmit = (e: Event) => {
  //   e.preventDefault();
  //   dispatch(
  //     setTaskList([
  //       ...taskList,
  //       {
  //         taskId: taskTitle,
  //         taskTitle: taskTitle,
  //         taskDescr: taskDescr,
  //       //   taskUser: taskUser,
  //       },
  //     ])
  //   );
  // };

  return (
    <form id={formId} onSubmit={formik.handleSubmit} className={styles.form__content}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id='title'
            name='title'
            label='Title'
            fullWidth
            value={formik.values.taskTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.taskTitle && Boolean(formik.errors.taskTitle)}
            helperText={formik.errors.taskTitle}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='descr'
            name='descr'
            label='Description'
            fullWidth
            value={formik.values.taskDescr}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.taskDescr && Boolean(formik.errors.taskDescr)}
            helperText={formik.errors.taskDescr}
          />
        </Grid>
      </Grid>
    </form>
  )
}

export default TaskForm;
