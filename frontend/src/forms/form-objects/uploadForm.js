import { file } from '../fields/imageFields'
import { imagesOnlyRule } from '../form-utils/inputValidationRules'

export const uploadForm = [
  {
    ...file,
    required: true,
    validationRules: [imagesOnlyRule('file', 'Please select a valid image.')]
  }
]
