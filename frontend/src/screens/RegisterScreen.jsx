import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import useForm from '../forms/form-hooks/useForm'
import { registerForm } from '../forms/form-objects/registerForm'

const RegisterScreen = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const { renderFormInputs, isFormValid, values } = useForm(
    registerForm,
    initialState
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, { isLoading }] = useRegisterMutation()

  const { userInfo } = useSelector((state) => state.auth)

  const redirect = '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = async (e) => {
    e.preventDefault()
    const { name, email, password, confirmPassword } = values
    //The following will never result in a toast error if submit button is disabled until passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    } else {
      try {
        const res = await register({ name, email, password }).unwrap()
        dispatch(setCredentials({ ...res }))
        navigate(redirect)
      } catch (error) {
        toast.error(error?.data?.message || error?.error)
      }
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      <Form onSubmit={submitHandler}>
        {renderFormInputs()}

        <Button
          disabled={isLoading || !isFormValid()}
          type='submit'
          variant='primary'
        >
          Register
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row className='py-3'>
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
export default RegisterScreen
