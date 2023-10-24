import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import { loginForm } from '../forms/form-objects/loginForm'
import useForm from '../forms/form-hooks/useForm'

const LoginScreen = () => {
  const { renderFormInputs, isFormValid, values } = useForm(loginForm, {
    email: '',
    password: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth)

  const redirect = '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = async (e) => {
    e.preventDefault()
    const { email, password } = values
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
    } catch (error) {
      toast.error(error?.data?.message || error?.error)
    }
  }
  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        {renderFormInputs()}
        <Button
          disabled={isLoading || !isFormValid()}
          type='submit'
          variant='primary'
        >
          Sign In
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
export default LoginScreen
