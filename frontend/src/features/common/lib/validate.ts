import { object, string } from 'yup';

export const loginValidate = object().shape({
  email: string().email('Некорректный E-mail').required('Введите E-mail'),
  password: string().required('Введите пароль'),
});

export const registerValidate = object().shape({
  company: string()
    .min(3, 'Слишком короткое предприятие')
    .max(50, 'Слишком длинное предприятие')
    .required('Введите предприятие'),
  name: string()
    .min(3, 'Слишком короткое название инициативы')
    .max(50, 'Слишком длинное название инициативы')
    .required('Введите название'),
  first_name: string()
    .min(3, 'Слишком короткое имя')
    .max(50, 'Слишком длинное имя')
    .required('Введите имя'),
  last_name: string()
    .min(3, 'Слишком короткая фамилиия')
    .max(50, 'Слишком длинное фамилия')
    .required('Введите фамилию'),
  email: string().email('Некорректный E-mail').required('Введите E-mail'),
  phone_number: string()
    .min(11, 'Слишком короткий номер')
    .max(11, 'Слишком длинный номер')
    .required('Введите номер телефона'),
  password: string()
    .matches(
      // @ts-ignore: Unreachable code error
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
      'Слишком легкий пароль'
    )
    .required('Введите пароль'),
});