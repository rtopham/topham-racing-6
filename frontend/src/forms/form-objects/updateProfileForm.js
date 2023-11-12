import {
  requiredRule,
  minLengthRule,
  validEmailRule,
  validPasswordRule,
  passwordMatchRule
} from '../form-utils/inputValidationRules'

import { name, email, password, confirmPassword } from '../fields/authFields'

export const updateProfileForm = [
  {
    ...name,
    required: true,
    autoFocus: true,
    validationRules: [
      requiredRule('Name', 'Please provide your name.'),
      minLengthRule('Name', 2, 'Name should be at least 2 characters long')
    ]
  },
  {
    ...email,
    required: true,
    validationRules: [
      requiredRule('Email', 'Please provide your email'),
      validEmailRule('Email', 'Please provide a valid email.')
    ]
  },
  {
    ...password,

    validationRules: [
      requiredRule('Password', 'Please provide a password'),
      validPasswordRule('Password')
    ]
  },
  {
    ...confirmPassword,
    validationRules: [
      requiredRule('Confirm Password', 'Please confirm your password'),
      passwordMatchRule('Confirm Password', 'Passwords do not match')
    ]
  }
]
