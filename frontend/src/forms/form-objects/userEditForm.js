import { name, email } from '../fields/authFields'
import { role } from '../fields/adminFields'
import {
  requiredRule,
  minLengthRule,
  validEmailRule
} from '../form-utils/inputValidationRules'

export const userEditForm = [
  {
    ...name,
    validationRules: [
      requiredRule('Name', 'Please provide your name.'),
      minLengthRule('Name', 2, 'Name should be at least 2 characters long')
    ]
  },
  {
    ...email,
    validationRules: [
      requiredRule('Email'),
      validEmailRule('Email', 'Please enter a valid email address.')
    ]
  },
  {
    ...role,
    validationRules: []
  }
]
