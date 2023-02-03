import { Button, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import styles from './form.module.scss'

const validationSchem = yup.object({
  email: yup
    .string()
    .email('В качестве логина используется email. Введите корректый email')
    .required('Поле обязательно для заполнения'), // Enter a valid email Email is required
  password: yup
    .string()
    .min(8, 'Длина пароля должна быть минимум 8 символов ') // Password should be of minimum 8 characters length
    .required('Пароль обязателен для заполнения'), // Password is required
})

interface ViewProps {
  onClose: () => void
}

export const LoginView = ({ onClose }: ViewProps) => {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationSchem,
    onSubmit: (values) => {
      console.log({ email: values.email, password: values.password })
      onClose()
    },
  })
  return (
    <form onSubmit={formik.handleSubmit} className={styles.form__content}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id='email'
            name='email'
            label='Логин'
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='password'
            name='password'
            label='Пароль'
            type='password'
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.errors.password}
          />
        </Grid>
        <Grid item>
          <Button color='primary' variant='contained' fullWidth type='submit'>
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
