import { useGetRaceByIdQuery } from '../../slices/racesApiSlice'
import { useParams } from 'react-router-dom'
import EditRaceForm from '../../forms/app-forms/EditRaceForm'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import GoBackButton from '../../components/GoBackButton'

const EditRaceScreen = () => {
  const { id: raceId } = useParams()

  const { data: race, isLoading, error } = useGetRaceByIdQuery(raceId)

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
          <EditRaceForm race={race} />
        </>
      )}
    </>
  )
}

export default EditRaceScreen
