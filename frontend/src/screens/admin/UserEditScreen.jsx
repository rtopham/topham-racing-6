import { Link, useParams } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import UserEditForm from '../../forms/app-forms/UserEditForm'
import { useGetUserDetailsQuery } from '../../slices/usersApiSlice'

const UserEditScreen = () => {
  const { id: userId } = useParams()

  const {
    data: user,
    isLoading,
    refetch,
    error
  } = useGetUserDetailsQuery(userId)

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {' '}
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
              Go Back
            </Link>
            <UserEditForm user={user} refetch={refetch} />
          </>
        </>
      )}
    </>
  )
}
export default UserEditScreen
