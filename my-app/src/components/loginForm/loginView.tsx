import { Grid, TextField, Alert } from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { login } from '../../store/reducers/authorization'
import styles from './form.module.scss'
import { useTranslation } from 'react-i18next';

interface ViewProps {
  formId: string
}

export const LoginView = ({ formId }: ViewProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t, } = useTranslation();
  const error = useAppSelector((state) => state.authorization.serverError)

  const validationSchem = yup.object({
    email: yup
      .string()
      .email(`${t('loginFormEmailError')}`)
      .required(`${t('loginFormEmailErrorReq')}`), // Enter a valid email Email is required
    password: yup
      .string()
      .min(8, `${t('loginFormPasswordError')}`) // Password should be of minimum 8 characters length
      .required(`${t('loginFormPasswordErrorReq')}`), // Password is required
  })

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationSchem,
    onSubmit: (values) => {
      console.log({ email: values.email, password: values.password })
      dispatch(login({ email: values.email, password: values.password }))
        .unwrap()
        .then(() => {
          navigate('/main')
        })
    },
  })

  return (
    <form id={formId} onSubmit={formik.handleSubmit} className={styles.form__content}>
      <Grid container spacing={2}>
        {error !== null && (
          <Grid item xs={12}>
            <Alert color='error' severity='error'>
              {error}
            </Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            id='email'
            name='email'
            label={t('loginFormEmail')}
            fullWidth
            placeholder=''
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
            label={t('loginFormPassword')}
            type='password'
            fullWidth
            placeholder=''
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.errors.password}
          />
        </Grid>
      </Grid>
    </form>
  )
}
