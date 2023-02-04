import { Button, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import styles from './form.module.scss'

const validationSchem = yup.object({
  name: yup
    .string()
    .min(3, 'Имя должно быть минимум 3 символа') // Name should be of minimum 3 characters length
    .required('Имя обязательно для заполнения'), // Name is required
  email: yup
    .string()
    .email('Введите корректный e-mail')
    .required('Email обязателен для заполнения'), // Enter a valid email

  password: yup
    .string()
    .matches(/[0-9]/, 'Пароль должен содержать минимум одну цифру') // Password must contain at least one number
    .matches(/[A-ZА-Я]/, 'Пароль должен содержать хотя бы одну заглавную букву') // Password must contain at least one uppercase letter
    .min(8, 'Минимальная длина пароля 8 символов') // Password should be of minimum 8 characters length
    .matches(
      /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)(?=.*[^\da-zA-Zа-яА-Я\s])(?!.*\s).{8,}$/,
      'Пароль должен содержать хотя бы один спец символ',
    ) // Password must contain at least one special symbol
    .required('Поле обязательно для заполнения'), // Password is required
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать') // Password must much
    .required('Требуется подтверждение пароля'), // Confirm password is required
})
interface ViewProps {
  formId: string
  onClose: () => void
}

export const RegistrationView = ({ formId, onClose }: ViewProps) => {
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
      onClose()
    },
  })
  return (
    <form id={formId} onSubmit={formik.handleSubmit} className={styles.form__content}>
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
      </Grid>
    </form>
  )
}
