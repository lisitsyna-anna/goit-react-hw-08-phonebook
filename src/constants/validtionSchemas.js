import * as yup from 'yup';
import 'yup-phone';

export const validationSchemaAddContact = yup.object().shape({
  name: yup
    .string('Enter name')
    .max(20, 'Name may contain only 20 letters')
    .required(
      'Name is required field. Name may contain only letters, apostrophe, dash and spaces.'
    ),

  number: yup
    .string('Enter number')
    .phone(
      null,
      true,
      'Invalid phone number.Phone number must start with "+" and have at least 10 digits'
    )
    .required('Number is required field'),
});

export const validationSchemaLogIn = yup.object().shape({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required field.'),
  password: yup
    .string('Enter your password')
    .min(7, 'Password should be of minimum 7 characters length')
    .required('Password is required field'),
});

export const validationSvhemaRegister = yup.object().shape({
  name: yup
    .string(' Name may contain only letters, apostrophe, dash and spaces.')
    .required('Name is required field.'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required field.'),
  password: yup
    .string('Enter your password')
    .min(7, 'Password should be of minimum 7 characters length')
    .required('Password is required field'),
});
