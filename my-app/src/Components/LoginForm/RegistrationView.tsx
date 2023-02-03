import { Button, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import styles from './form.module.scss'

const validationSchem = yup.object({
  name: yup
    .string()
    .typeError('Name is string')
    .min(3, 'Name should be of minimum 3 characters length')
    .required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),

  password: yup
    .string()
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[A-ZА-Я]/, 'Password must contain at least one uppercase letter')
    .min(8, 'Password should be of minimum 8 characters length')
    .matches(
      /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)(?=.*[^\da-zA-Zа-яА-Я\s])(?!.*\s).{8,}$/,
      'Password must contain at least one special symbol',
    )
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must much')
    .required('Confirm password is required'),
})

export const RegistrationView = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: validationSchem,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  return (
    <form onSubmit={formik.handleSubmit} className={styles.form__content}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id='name'
            name='name'
            label='Имя'
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='email'
            name='email'
            label='Email'
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='password'
            name='password'
            label='Пароль'
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            type='password'
            helperText={formik.errors.password}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='passwordConfirm'
            name='passwordConfirm'
            label='Подтвердите пароль'
            fullWidth
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
            type='password'
            helperText={formik.errors.passwordConfirm}
          />
        </Grid>
        <Grid item>
          <Button color='primary' variant='contained' fullWidth type='submit'>
            Register
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
