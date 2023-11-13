import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useProfileMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import FormContainer from '../components/FormContainer'
import useForm from '../forms/form-hooks/useForm'
import { updateProfileForm } from '../forms/form-objects/updateProfileForm'
import { USER_ICON, Icon } from '../components/icons'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const initialState = {
    name: userInfo.name,
    email: userInfo.email,
    password: '',
    confirmPassword: ''
  }

  const { renderFormInputs, isFormValid, values, changesMade } = useForm(
    updateProfileForm,
    initialState
  )

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation()

  const submitHandler = async (e) => {
    e.preventDefault()
    const { name, email, password, confirmPassword } = values
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password
        }).unwrap()
        dispatch(setCredentials({ ...res }))
        toast.success('Profile updated successfully')
      } catch (err) {
        toast.error(err?.data?.message || err?.error)
      }
    }
  }

  return (
    <FormContainer>
      <h2>
        <Icon icon={USER_ICON} /> User Profile
      </h2>

      <Form onSubmit={submitHandler}>
        {renderFormInputs()}

        <Button
          type='submit'
          disabled={
            loadingUpdateProfile ||
            !isFormValid() ||
            !changesMade(initialState, values) ||
            values.password !== values.confirmPassword
          }
          variant='primary'
        >
          Update
        </Button>
        {loadingUpdateProfile && <Loader />}
      </Form>
    </FormContainer>
  )
}
export default ProfileScreen
