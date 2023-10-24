import {
  requiredRule,
  validEmailRule,
  validPasswordRule
} from '../form-utils/inputValidationRules'

import { email, password } from '../fields/authFields'

export const loginForm = [
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
    required: true,
    validationRules: [
      requiredRule('Password', 'Please provide a password'),
      validPasswordRule('Password')
    ]
  }
]
