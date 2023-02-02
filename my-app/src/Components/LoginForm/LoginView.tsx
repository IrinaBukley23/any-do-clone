import { Button, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'

const validationSchem = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
})

export const LoginView = () => {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationSchem,
    onSubmit: (values) => {
      console.log({ email: values.email, password: values.password })
      // loginstore.login({ email: values.email, password: values.password })
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField id='email' name='email' label='Логин' fullWidth value={formik.values.email} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='password'
            name='password'
            label='Пароль'
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            type='password'
            helperText={formik.touched.password && formik.errors.password}
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
