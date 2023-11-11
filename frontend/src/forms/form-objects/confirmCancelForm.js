import {
  requiredRule,
  confirmTextRule
} from '../form-utils/inputValidationRules'

import { confirmText } from '../fields/confirmCancelFields'

export const confirmCancelForm = [
  {
    ...confirmText,
    required: true,
    size: 'sm',
    validationRules: [
      requiredRule('Email', 'Please type confirmation text'),
      confirmTextRule('confirmText', 'Input must match confirmation text.')
    ]
  }
]
