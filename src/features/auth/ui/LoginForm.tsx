import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import * as Yup from 'yup';
import { Button, TextInput, T } from '@admiral-ds/react-ui';
import { useAppDispatch } from '@shared/lib/hooks/redux';
import { loginThunk } from '../model/thunks/login';
import { fetchCurrentUserThunk } from '../model/thunks/fetchCurrentUser';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';

interface LoginFormValues {
  email: string;
  password: string;
  global?: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email('Некорректный email').required('Обязательное поле'),
  password: Yup.string().min(3, 'Слишком короткий пароль').required('Обязательное поле'),
});

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [submitAttempted, setSubmitAttempted] = React.useState(false);

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
    global: '',
  };

  return (
    <Formik<LoginFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
      validateOnMount
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        setSubmitAttempted(true);
        try {
          await dispatch(loginThunk(values)).unwrap();
          await dispatch(fetchCurrentUserThunk()).unwrap();
          navigate('/');
        } catch {
          setErrors({ global: 'Неверный логин или пароль' });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched, isValid }) => {
        const hasTouchedInvalidFields = Object.keys(touched).some(
          (key) => touched[key as keyof typeof touched] && errors[key as keyof typeof errors],
        );

        const shouldDisableSubmit =
          isSubmitting || (submitAttempted ? !isValid : hasTouchedInvalidFields);

        return (
          <Form className={styles.form}>
            <div className={styles.field}>
              <Field name="email">
                {({ field, meta }: FieldProps) => (
                  <TextInput
                    {...field}
                    autoFocus
                    placeholder="Email"
                    status={meta.touched && meta.error ? 'error' : undefined}
                  />
                )}
              </Field>
              <Error name="email" message={errors.email} />
            </div>

            <div className={styles.field}>
              <Field name="password">
                {({ field, meta }: FieldProps) => (
                  <TextInput
                    {...field}
                    type="password"
                    placeholder="Пароль"
                    status={meta.touched && meta.error ? 'error' : undefined}
                  />
                )}
              </Field>
              <Error name="password" message={errors.password} />
            </div>

            {errors.global && (
              <T
                font="Body/Body 2 Long"
                color="Error/Error 60 Main"
                className={styles.errorMessage}
              >
                {errors.global}
              </T>
            )}

            <Button type="submit" dimension="m" disabled={shouldDisableSubmit}>
              Войти
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

const Error = ({ name, message }: { name: string; message?: string }) => (
  <ErrorMessage name={name}>
    {(msg) => (
      <T
        as="div"
        font="Body/Body 2 Long"
        color="Error/Error 60 Main"
        className={styles.errorMessage}
      >
        {message ?? msg}
      </T>
    )}
  </ErrorMessage>
);
