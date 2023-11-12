import { requiredRule } from '../form-utils/inputValidationRules'

import { title, title_date, category } from '../fields/titleFields'

export const titleForm = [
  {
    ...title,
    required: true,
    size: 'sm',
    validationRules: [requiredRule('Title', 'Please provide title.')]
  },
  {
    ...title_date,
    required: true,
    size: 'sm',
    validationRules: [requiredRule('Date', 'Please provide title date')]
  },
  {
    ...category,
    required: true,
    size: 'sm',
    validationRules: [requiredRule('Category', 'Please provide category')]
  }
]
