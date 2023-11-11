import useForm from '../form-hooks/useForm'
import { useNavigate } from 'react-router-dom'
import { userEditForm } from '../form-objects/userEditForm'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import { toast } from 'react-toastify'
import { useUpdateUserMutation } from '../../slices/usersApiSlice'

const UserEditForm = ({ user, refetch }) => {
  const initialState = {
    name: user.name,
    email: user.email,
    role: user.isAdmin
  }

  const { renderFormInputs, isFormValid, values, changesMade } = useForm(
    userEditForm,
    initialState
  )

  const [updateUser] = useUpdateUserMutation()

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    const { name, email, role } = values
    e.preventDefault()
    try {
      await updateUser({
        userId: user._id,
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
    <FormContainer>
      <h1>Edit User</h1>

      <Form onSubmit={submitHandler}>
        {renderFormInputs()}
        <Button
          type='submit'
          variant='primary'
          disabled={!isFormValid || !changesMade(initialState, values)}
        >
          Update
        </Button>
      </Form>
    </FormContainer>
  )
}
export default UserEditForm
