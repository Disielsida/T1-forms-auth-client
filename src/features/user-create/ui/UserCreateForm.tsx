import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import * as Yup from 'yup';
import {
  TextInput,
  Button,
  T,
  DateInput,
  PhoneNumberInput,
  Checkbox,
  Select,
  Option,
} from '@admiral-ds/react-ui';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';
import { useAppDispatch } from '@shared/lib/hooks/redux';
import { createUserThunk } from '@entities/user/model/thunks/createUser';
import styles from './UserCreateForm.module.css';
import { formatDateToInput, parseInputToDate } from '@shared/utils/date';

interface UserCreateFormValues {
  name: string;
  surName: string;
  password: string;
  fullName: string;
  email: string;
  birthDate?: Date | null;
  telephone?: string;
  employment?: string;
  userAgreement?: boolean;
  global?: string;
}

const employmentOptions = ['Full-time', 'Part-time', 'Contract'];

const validationSchema = Yup.object({
  name: Yup.string().max(64, 'Макс. длина — 64').required('Обязательное поле'),
  surName: Yup.string().max(64, 'Макс. длина — 64').required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
  fullName: Yup.string().max(130, 'Макс. длина — 130').required('Обязательное поле'),
  email: Yup.string().email('Некорректный email').required('Обязательное поле'),
  birthDate: Yup.date().nullable(),
  telephone: Yup.string()
    .optional()
    .test('is-valid-phone', 'Формат: +79991234567', (value) => {
      const cleaned = value?.replace(/\D/g, '') ?? '';
      if (!cleaned || cleaned === '7') return true;
      return /^7\d{10}$/.test(cleaned);
    }),
  employment: Yup.string().optional(),
  userAgreement: Yup.boolean().optional(),
});

export const UserCreateForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [submitAttempted, setSubmitAttempted] = React.useState(false);

  const initialValues: UserCreateFormValues = {
    name: '',
    surName: '',
    password: '',
    fullName: '',
    email: '',
    birthDate: null,
    telephone: '',
    employment: '',
    userAgreement: false,
    global: '',
  };

  return (
    <Formik<UserCreateFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      validateOnBlur
      validateOnChange
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        setSubmitAttempted(true);
        try {
          const dto = {
            ...values,
            telephone:
              values.telephone && values.telephone !== '+7'
                ? `+${values.telephone.replace(/\D/g, '')}`
                : undefined,
            birthDate: values.birthDate?.toISOString(),
          };
          delete dto.global;

          await dispatch(createUserThunk(dto)).unwrap();
          navigate(ROUTES.root);
        } catch (e) {
          console.error(e);
          setErrors({ global: 'Ошибка при создании пользователя' });
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
            <div className={styles.fieldGroup}>
              <Field name="name">
                {({ field, meta }: FieldProps) => (
                  <TextInput
                    {...field}
                    placeholder="Имя"
                    autoFocus
                    status={meta.touched && meta.error ? 'error' : undefined}
                    className={styles.field}
                  />
                )}
              </Field>
              <Error name="name" message={errors.name} />
            </div>

            <div className={styles.fieldGroup}>
              <Field
                name="surName"
                as={TextInput}
                placeholder="Фамилия"
                status={touched.surName && errors.surName ? 'error' : undefined}
                className={styles.field}
              />
              <Error name="surName" message={errors.surName} />
            </div>

            <div className={styles.fieldGroup}>
              <Field
                name="email"
                as={TextInput}
                placeholder="Email"
                status={touched.email && errors.email ? 'error' : undefined}
                className={styles.field}
              />
              <Error name="email" message={errors.email} />
            </div>

            <div className={styles.fieldGroup}>
              <Field
                name="password"
                as={TextInput}
                type="password"
                placeholder="Пароль"
                status={touched.password && errors.password ? 'error' : undefined}
                className={styles.field}
              />
              <Error name="password" message={errors.password} />
            </div>

            <div className={styles.fieldGroup}>
              <Field
                name="fullName"
                as={TextInput}
                placeholder="Полное имя"
                status={touched.fullName && errors.fullName ? 'error' : undefined}
                className={styles.field}
              />
              <Error name="fullName" message={errors.fullName} />
            </div>

            <div className={styles.fieldGroup}>
              <Field name="birthDate">
                {({ field, form, meta }: FieldProps<Date | null, UserCreateFormValues>) => (
                  <DateInput
                    placeholder="ДД.ММ.ГГГГ"
                    value={field.value ? formatDateToInput(field.value) : ''}
                    status={meta.touched && meta.error ? 'error' : undefined}
                    onChange={(e) => {
                      const input = e.currentTarget.value;
                      const parsed = parseInputToDate(input);
                      form.setFieldValue(field.name, parsed);
                    }}
                    onBlur={() => form.setFieldTouched(field.name, true)}
                    className={styles.field}
                  />
                )}
              </Field>
            </div>

            <div className={styles.fieldGroup}>
              <Field name="telephone">
                {({ field, form, meta }: FieldProps) => (
                  <>
                    <PhoneNumberInput
                      value={field.value || ''}
                      defaultCountry="RUS"
                      dimension="m"
                      status={meta.touched && meta.error ? 'error' : undefined}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        form.setFieldValue(field.name, e.currentTarget.value)
                      }
                      onBlur={() => form.setFieldTouched(field.name, true)}
                      className={styles.field}
                    />
                    {meta.touched && meta.error && (
                      <T
                        font="Body/Body 2 Long"
                        color="Error/Error 60 Main"
                        className={styles.errorMessage}
                      >
                        {meta.error}
                      </T>
                    )}
                  </>
                )}
              </Field>
            </div>

            <div className={styles.fieldGroup}>
              <Field name="employment">
                {({ field, meta, form }: FieldProps) => (
                  <Select
                    value={field.value ?? ''}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      form.setFieldValue(field.name, e.currentTarget.value)
                    }
                    onBlur={() => form.setFieldTouched(field.name, true)}
                    dimension="m"
                    className={styles.field}
                    status={meta.touched && meta.error ? 'error' : undefined}
                    openButtonPropsConfig={() => ({})}
                  >
                    <Option disabled value="">
                      Тип занятости
                    </Option>
                    {employmentOptions.map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                )}
              </Field>
            </div>

            <div className={styles.userAgreementRow}>
              <Field name="userAgreement">
                {({ field, form }: FieldProps<boolean>) => (
                  <>
                    <T
                      as="label"
                      htmlFor="userAgreement"
                      font="Caption/Caption 1"
                      color="Neutral/Neutral 60"
                    >
                      Согласие на обработку персональных данных
                    </T>
                    <Checkbox
                      checked={field.value ?? false}
                      onChange={(e) => form.setFieldValue(field.name, e.target.checked)}
                      dimension="m"
                      id="userAgreement"
                    />
                  </>
                )}
              </Field>
            </div>

            {errors.global && (
              <T font="Body/Body 2 Long" color="Error/Error 60 Main" className={styles.globalError}>
                {errors.global}
              </T>
            )}

            <Button type="submit" dimension="m" disabled={shouldDisableSubmit}>
              Создать пользователя
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
