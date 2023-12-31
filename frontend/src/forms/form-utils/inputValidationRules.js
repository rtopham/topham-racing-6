export const requiredRule = (inputName, message) => {
  return {
    name: 'required',
    message: message || `${inputName} required`,
    validate: (inputValue, values) => {
      if (inputValue === '') return false
      return inputValue.length !== 0
    }
  }
}

export const minLengthRule = (inputName, minCharacters, message) => {
  return {
    name: 'minLength',
    message:
      message ||
      `${inputName} should contain at least ${minCharacters} characters`,
    validate: (inputValue, values) => inputValue.length >= minCharacters
  }
}

export const validEmailRule = (inputName, message) => {
  return {
    name: 'validEmail',
    message: message || `${inputName} must be a valid email address`,
    validate: (inputValue, values) => {
      const regex =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

      return regex.test(inputValue)
    }
  }
}

export const validPasswordRule = (inputName, message) => {
  return {
    name: 'validPassword',
    message:
      message ||
      `${inputName} must contain at least eight characters, one uppercase letter, one lowercase letter and one number. Special characters are allowed.`,
    validate: (inputValue, values) => {
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
      return regex.test(inputValue)
    }
  }
}

export const passwordMatchRule = (inputName, message) => {
  return {
    name: 'passwordMatch',
    message: message || `${inputName} must match password.`,
    validate: (inputValue, values) => {
      return inputValue === values.password
    }
  }
}

export const confirmTextRule = (inputName, message) => {
  return {
    name: 'confirmText',
    message: message || `${inputName} must match confirmation text.`,
    validate: (inputValue, values, customProps) => {
      return inputValue === customProps.confirmationText
    }
  }
}

export const minMaxRule = (inputName, min, max, message) => {
  return {
    name: 'minMaxRule',
    message:
      message ||
      `${inputName} must be greater than or equal to ${min} and less than or equal to ${max}.`,
    validate: (inputValue, values) => {
      return inputValue >= min && inputValue <= max
    }
  }
}

export const imagesOnlyRule = (inputName, message) => {
  return {
    name: 'imagesOnly',
    message: message || `${inputName} must be a valid image.`,
    validate: (inputValue, values) => {
      const validExtension = new RegExp(
        '(' +
          ['.jpg', '.jpeg', '.gif', '.png', 'webp']
            .join('|')
            .replace(/\./g, '\\.') +
          ')$'
      ).test(inputValue)
      return validExtension
    }
  }
}
