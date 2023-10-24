import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import useForm from '../../forms/form-hooks/useForm'
import { formTestForm } from '../../forms/form-objects/formTestForm'

const FormTestScreen = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    role: true,
    inlineRole: true,
    inlineSexy: false,
    party: 'Independent',
    inlineParty: 'Democrat',
    gender: 'Nonbinary',
    inlineGender: 'Female',
    lights: true,
    color: '#f55696',
    file: '',
    height: 30
  }

  const { renderFormInputs, values, isFormValid, changesMade } = useForm(
    formTestForm,
    initialState
  )

  const submitHandler = async (e) => {
    e.preventDefault()

    console.log(values)
  }

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Form Test 2 (Custom)</h1>

        <Form onSubmit={submitHandler}>
          {renderFormInputs()}
          <Button
            type='submit'
            variant='primary'
            disabled={!isFormValid() || !changesMade(initialState, values)}
          >
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}
export default FormTestScreen
