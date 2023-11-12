import { useState, useCallback } from 'react'

import InputField from '../form-components/InputField'

const useForm = (inputArray, initialState, customProps) => {
  const [values, setValues] = useState(initialState)

  const initialValidity = useCallback(() => {
    const validity = {}
    const errors = {}
    const touched = {}
    inputArray.forEach((input) => {
      validity[input.name] = true
      for (const rule of input.validationRules) {
        touched[input.name] = false
        if (!rule.validate(initialState[input.name], values, customProps)) {
          validity[input.name] = false
          if (initialState[input.name]) errors[input.name] = rule.message
        }
      }
    })

    return { validity, errors, touched }
  }, [initialState, inputArray, customProps, values])

  const validity = initialValidity()

  const [valid, setValid] = useState(validity.validity)
  const [errors, setErrors] = useState(validity.errors)
  const [touched, setTouched] = useState(validity.touched)

  const isInputFieldValid = useCallback(
    (inputName, inputValue) => {
      const inputObject = inputArray.find((input) => {
        return input.name === inputName
      })

      for (const rule of inputObject.validationRules) {
        if (!rule.validate(inputValue, values, customProps)) {
          setErrors((prevState) => ({
            ...prevState,
            [inputName]: rule.message
          }))
          return false
        }
      }

      return true
    },
    [inputArray, values, customProps]
  )

  const onChange = useCallback(
    (e) => {
      switch (e.target.type) {
        case 'checkbox':
        case 'switch':
          setValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.checked
          }))
          break
        case 'blockpicker':
          setValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.hex
          }))
          break
        case 'file':
          setValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
            images: e.target.files
          }))
          break
        default:
          setValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
          }))
      }

      // update input field's validity
      const isValidInput = isInputFieldValid(e.target.name, e.target.value)

      // if input is valid and it was previously set to invalid
      // set its valid status to true
      if (isValidInput && !valid[e.target.name]) {
        setValid((prevState) => ({
          ...prevState,
          [e.target.name]: true
        }))
      } else if (!isValidInput && valid[e.target.name]) {
        // if input is not valid and it was previously valid
        // set its valid status to false
        setValid((prevState) => ({
          ...prevState,
          [e.target.name]: false
        }))
      }
      // mark input field as touched
      setTouched((prevState) => ({
        ...prevState,
        [e.target.name]: true
      }))
    },
    [setValues, valid, isInputFieldValid]
  )

  const renderFormInputs = useCallback(
    (customProps = {}) => {
      const renderInput = (
        field,
        handleChange,
        value,
        isValid,
        error,
        key,
        customProps = {}
      ) => {
        const { validationRules, ...rest } = field
        return (
          <InputField
            {...rest}
            key={key}
            isValid={isValid}
            value={value}
            handleChange={handleChange}
            errorMessage={error}
            {...customProps}
          />
        )
      }
      return inputArray.map((field) => {
        return renderInput(
          field,
          onChange,
          values[field.name],
          valid[field.name],
          errors[field.name],
          field.name,
          customProps[field.name]
        )
      })
    },
    [errors, values, valid, inputArray, onChange]
  )

  const isFormValid = useCallback(() => {
    let isValid = true
    const arr = Object.values(valid)

    for (let i = 0; i < arr.length; i++) {
      if (!arr[i] && inputArray[i].required) {
        isValid = false
        break
      }
    }

    return isValid
  }, [valid, inputArray])

  const reset = () => {
    setValues(initialState)
  }

  const changesMade = (oldValues, newValues) => {
    //returns a boolean value indicating whether overall form has changed
    return JSON.stringify(oldValues) !== JSON.stringify(newValues)
  }

  return {
    renderFormInputs,
    isFormValid,
    changesMade,
    values,
    touched,
    valid,
    errors,
    reset
  }
}

export default useForm
