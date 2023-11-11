import { requiredRule } from '../form-utils/inputValidationRules'

import {
  race_name,
  series,
  race_date,
  category,
  time,
  location,
  rank
} from '../fields/raceFields'

export const raceForm = [
  {
    ...race_name,
    required: true,
    size: 'sm',
    validationRules: [requiredRule('Email', 'Please provide race name')]
  },
  {
    ...series,
    required: true,
    size: 'sm',
    validationRules: [requiredRule('Password', 'Please provide series name')]
  },
  {
    ...race_date,
    required: true,
    size: 'sm',
    validationRules: [requiredRule('Password', 'Please provide race date')]
  },
  {
    ...category,
    required: true,
    size: 'sm',
    validationRules: [requiredRule('Password', 'Please provide category')]
  },
  {
    ...time,
    required: true,
    size: 'sm',
    validationRules: [requiredRule('Password', 'Please provide race time')]
  },
  {
    ...location,
    size: 'sm',
    validationRules: []
  },
  {
    ...rank,
    required: true,
    size: 'sm',
    validationRules: [requiredRule('Password', 'Please provide race rank')]
  }
]
