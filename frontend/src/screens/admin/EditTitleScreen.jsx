import { useGetTitleByIdQuery } from '../../slices/titlesApiSlice'
import { useParams } from 'react-router-dom'
import EditTitleForm from '../../forms/app-forms/EditTitleForm'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import GoBackButton from '../../components/GoBackButton'

const EditTitleScreen = () => {
  const { id: titleId } = useParams()

  const { data: title, isLoading, error } = useGetTitleByIdQuery(titleId)

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
          <GoBackButton arrow />
          <EditTitleForm title={title} />
        </>
      )}
    </>
  )
}

export default EditTitleScreen
