import RaceListTable from '../../components/races/RaceListTable'
import {
  useGetAllRacesQuery,
  useDeleteRaceMutation
} from '../../slices/racesApiSlice'
import { Icon, CYCLIST_ICON } from '../../components/icons'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { toast } from 'react-toastify'

const EditRacesScreen = () => {
  const {
    data: races,
    isLoading,
    error,
    refetch
  } = useGetAllRacesQuery({
    userId: '5bd91a027b59b61efe06ae3d'
  })

  const [deleteRace] = useDeleteRaceMutation()

  const deleteRaceHandler = async (raceId) => {
    try {
      const res = await deleteRace(raceId).unwrap()
      refetch()
      toast.success(res.message)
    } catch (err) {
      toast.error(err?.data?.message || error?.error)
    }
  }

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
          <h2>
            <Icon icon={CYCLIST_ICON} /> Edit Races
          </h2>

          <RaceListTable
            races={races}
            adminMode={true}
            deleteRaceHandler={deleteRaceHandler}
          />
        </>
      )}
    </>
  )
}
export default EditRacesScreen
