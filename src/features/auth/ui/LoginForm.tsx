import { Formik, Form, Field, ErrorMessage } from 'formik';
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
      onSubmit={async (values, { setSubmitting, setErrors }) => {
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
        const isFormTouched = Object.keys(touched).length > 0;

        return (
          <Form className={styles.form}>
            <div className={styles.field}>
              <Field
                name="email"
                as={TextInput}
                placeholder="Email"
                status={(touched.email && errors.email) || errors.global ? 'error' : undefined}
              />
              <ErrorMessage name="email">
                {(msg) => (
                  <T
                    as="div"
                    font="Body/Body 2 Long"
                    color="Error/Error 60 Main"
                    className={styles.errorMessage}
                  >
                    {msg}
                  </T>
                )}
              </ErrorMessage>
            </div>

            <div className={styles.field}>
              <Field
                name="password"
                as={TextInput}
                type="password"
                placeholder="Пароль"
                status={
                  (touched.password && errors.password) || errors.global ? 'error' : undefined
                }
              />
              <ErrorMessage name="password">
                {(msg) => (
                  <T
                    as="div"
                    font="Body/Body 2 Long"
                    color="Error/Error 60 Main"
                    className={styles.errorMessage}
                  >
                    {msg}
                  </T>
                )}
              </ErrorMessage>

              {errors.global && (
                <T
                  as="div"
                  font="Body/Body 2 Long"
                  color="Error/Error 60 Main"
                  className={styles.errorMessage}
                >
                  {errors.global}
                </T>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || (isFormTouched && !isValid)}
              dimension="m"
            >
              Войти
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
