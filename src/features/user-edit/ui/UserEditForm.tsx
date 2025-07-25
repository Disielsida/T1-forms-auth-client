import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldProps, FormikErrors, FormikTouched } from 'formik';
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
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks/redux';
import { editUserThunk } from '@entities/user/model/thunks/editUser';
import { selectSelectedUser } from '@entities/user/model/userSlice';
import styles from '@features/user-create/ui/UserCreateForm.module.css';
import { formatDateToInput, parseInputToDate } from '@shared/utils/date';
import omit from 'lodash/omit';

interface UserEditFormValues {
  name: string;
  surName: string;
  fullName: string;
  email: string;
  password: string;
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
  fullName: Yup.string().max(130, 'Макс. длина — 130').required('Обязательное поле'),
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

export const UserEditForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const user = useAppSelector(selectSelectedUser);
  const [submitAttempted, setSubmitAttempted] = React.useState(false);

  if (!user || !id) return null;

  const initialValues: UserEditFormValues = {
    name: user.name || '',
    surName: user.surName || '',
    fullName: user.fullName || '',
    email: user.email || '',
    password: '********',
    birthDate: user.birthDate ? new Date(user.birthDate) : null,
    telephone: user.telephone || '',
    employment: user.employment || '',
    userAgreement: user.userAgreement ?? false,
    global: '',
  };

  return (
    <Formik<UserEditFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      validateOnBlur
      validateOnChange
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        setSubmitAttempted(true);
        try {
          const rawDto = {
            ...values,
            telephone:
              values.telephone && values.telephone !== '+7'
                ? `+${values.telephone.replace(/\D/g, '')}`
                : undefined,
            birthDate: values.birthDate?.toISOString(),
          };

          const dto = omit(rawDto, ['email', 'password', 'global']);

          await dispatch(editUserThunk({ id, dto })).unwrap();
          navigate(ROUTES.root);
        } catch (e) {
          console.error(e);
          setErrors({ global: 'Ошибка при редактировании пользователя' });
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
            <FieldGroup name="name" placeholder="Имя" errors={errors} touched={touched} />

            <FieldGroup name="surName" placeholder="Фамилия" errors={errors} touched={touched} />

            <FieldGroup
              name="email"
              placeholder="Email"
              disabled
              errors={errors}
              touched={touched}
            />

            <FieldGroup
              name="password"
              placeholder="Пароль"
              type="password"
              disabled
              errors={errors}
              touched={touched}
            />

            <FieldGroup
              name="fullName"
              placeholder="Полное имя"
              errors={errors}
              touched={touched}
            />

            <div className={styles.fieldGroup}>
              <Field name="birthDate">
                {({ field, form, meta }: FieldProps<Date | null, UserEditFormValues>) => (
                  <DateInput
                    placeholder="ДД.ММ.ГГГГ"
                    value={field.value ? formatDateToInput(field.value) : ''}
                    status={meta.touched && meta.error ? 'error' : undefined}
                    onChange={(e) => {
                      const parsed = parseInputToDate(e.currentTarget.value);
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
                      onChange={(e) => form.setFieldValue(field.name, e.currentTarget.value)}
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
              Сохранить изменения
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

// --- Вспомогательный компонент ---

interface FieldGroupProps {
  name: keyof UserEditFormValues;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
  autoFocus?: boolean;
  disabled?: boolean;
  errors: FormikErrors<UserEditFormValues>;
  touched: FormikTouched<UserEditFormValues>;
}

const FieldGroup = ({
  name,
  placeholder,
  type = 'text',
  autoFocus = false,
  disabled = false,
  errors,
}: FieldGroupProps) => (
  <div className={styles.fieldGroup}>
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <TextInput
          {...field}
          type={type}
          placeholder={placeholder}
          autoFocus={autoFocus}
          disabled={disabled}
          status={meta.touched && meta.error ? 'error' : undefined}
          className={styles.field}
        />
      )}
    </Field>
    <Error name={name} message={errors[name]} />
  </div>
);

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
