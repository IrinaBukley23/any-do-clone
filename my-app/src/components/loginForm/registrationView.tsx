import { Alert, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
// import theme from '../../defaultTheme'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { register } from '../../store/reducers/authorization'
import styles from './form.module.scss'
import { useTranslation } from 'react-i18next';

interface ViewProps {
  formId: string
}

export const RegistrationView = ({ formId }: ViewProps) => {
  const dispatch = useAppDispatch()
  const { t, } = useTranslation();
  const error = useAppSelector(state => state.authorization.serverError);
  
  const validationSchem = yup.object({
    name: yup
      .string()
      .min(3, `${t('regFormNameErrorLen')}`) // Name should be of minimum 3 characters length
      .required(`${t('regFormNameErrorReq')}`), // Name is required
    email: yup
      .string()
      .email(`${t('regFormEmailError')}`)
      .required(`${t('regFormEmailErrorReq')}`), // Enter a valid email
  
    password: yup
      .string()
      .matches(/[0-9]/, `${t('regFormPasswordErrorNum')}`) // Password must contain at least one number
      .matches(/[A-ZА-Я]/, `${t('regFormPasswordErrorLetter')}`) // Password must contain at least one uppercase letter
      .min(8, `${t('regFormPasswordErrorLength')}`) // Password should be of minimum 8 characters length
      .matches(
        /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)(?=.*[^\da-zA-Zа-яА-Я\s])(?!.*\s).{8,}$/,
        `${t('regFormPasswordErrorSymbol')}`,
      ) // Password must contain at least one special symbol
      .required(`${t('regFormPasswordErrorReq')}`), // Password is required
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], `${t('regFormPasswordConfirmError')}`) // Password must much
      .required(`${t('regFormPasswordConfirmErrorReq')}`), // Confirm password is required
  })
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: validationSchem,
    onSubmit: (values) => {
      console.log({ name: values.name, email: values.email, password: values.password })
      dispatch(register({
        name: values.name,
        email: values.email,
        password: values.password
      }))
    },
  })
  return (
    <form id={formId} onSubmit={formik.handleSubmit} className={styles.form__content}>
      <Grid container spacing={2}>
        {error !== null && (
          <Grid item xs={12}>
            <Alert color='error' severity="error">{error}</Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            id='name'
            name='name'
            label={t('regFormName')}
            placeholder=''
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
            label={t('regFormEmail')}
            placeholder=''
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
            label={t('regFormPassword')}
            placeholder=''
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
            label={t('regFormPasswordConfirm')}
            placeholder=''
            fullWidth
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
            type='password'
            helperText={formik.errors.passwordConfirm}
          />
        </Grid>
      </Grid>
    </form>
  )
}
