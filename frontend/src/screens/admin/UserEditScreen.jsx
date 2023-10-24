import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { toast } from 'react-toastify'

import {
  useUpdateUserMutation,
  useGetUserDetailsQuery
} from '../../slices/usersApiSlice'

import { userEditForm } from '../../forms/form-objects/userEditForm'
import useForm from '../../forms/form-hooks/useForm'

const UserEditScreen = () => {
  const { id: userId } = useParams()

  const {
    data: user,
    isLoading,
    refetch,
    error
  } = useGetUserDetailsQuery(userId)

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()

  const navigate = useNavigate()

  const {
    renderFormInputs,
    isFormValid,
    initialStateValues,
    values,
    setInitialState,
    changesMade
  } = useForm(userEditForm, { name: '', email: '', isAdmin: false })

  useEffect(() => {
    if (user) {
      setInitialState({
        name: user.name,
        email: user.email,
        role: user.isAdmin
      })
    }
  }, [setInitialState, user])

  const submitHandler = async (e) => {
    const { name, email, role } = values

    e.preventDefault()
    try {
      await updateUser({
        userId,
        name,
        email,
        isAdmin: role
      }).unwrap() // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('User updated')
      refetch()
      navigate('/admin/userlist')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            {renderFormInputs()}
            <Button
              type='submit'
              variant='primary'
              disabled={
                !isFormValid || !changesMade(initialStateValues, values)
              }
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}
export default UserEditScreen
