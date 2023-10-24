import {
  requiredRule,
  minLengthRule,
  validEmailRule,
  validPasswordRule,
  passwordMatchRule,
  minMaxRule
} from '../form-utils/inputValidationRules'

import {
  name,
  email,
  password,
  confirmPassword,
  age,
  role,
  inlineRole,
  inlineSexy,
  party,
  inlineParty,
  gender,
  inlineGender,
  lights,
  color,
  file,
  height
} from '../fields/formTestFields'

export const formTestForm = [
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
    required: true,
    validationRules: [
      requiredRule('Password', 'Please provide a password'),
      validPasswordRule('Password')
    ]
  },
  {
    ...confirmPassword,
    required: true,
    validationRules: [
      requiredRule('Confirm Password', 'Please confirm your password'),
      passwordMatchRule('Confirm Password', 'Passwords do not match')
    ]
  },
  {
    ...age,
    validationRules: [minMaxRule('Age', 0, 110)]
  },
  {
    ...role,
    validationRules: []
  },
  {
    ...inlineRole,
    validationRules: []
  },
  {
    ...inlineSexy,
    validationRules: []
  },
  {
    ...party,
    validationRules: []
  },
  {
    ...inlineParty,
    validationRules: []
  },
  {
    ...gender,
    validationRules: []
  },
  {
    ...inlineGender,
    validationRules: []
  },
  {
    ...lights,
    validationRules: []
  },
  {
    ...color,
    validationRules: []
  },
  {
    ...file,
    validationRules: []
  },
  {
    ...height,
    validationRules: []
  }
]
