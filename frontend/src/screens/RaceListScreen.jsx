import { useEffect } from 'react'
import RaceListTable from '../components/races/RaceListTable'
import Filters from '../components/races/Filters'
import { useGetAllRacesQuery } from '../slices/racesApiSlice'
import { filterRaces } from '../slices/racesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Icon, CYCLIST_ICON } from '../components/icons'
import Loader from '../components/Loader'
import Message from '../components/Message'

const RaceListScreen = () => {
  const dispatch = useDispatch()

  const { data, isLoading, error } = useGetAllRacesQuery({
    userId: '5bd91a027b59b61efe06ae3d'
  })

  useEffect(() => {
    if (!isLoading && !error) {
      dispatch(filterRaces({ races: data, filter: 'all' }))
    }
  }, [data, isLoading, error, dispatch])

  const filteredRaces = useSelector((state) => state.races.filtered)
  const activeFilter = useSelector((state) => state.races.activeFilter)

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
            <Icon icon={CYCLIST_ICON} /> Race Results
          </h2>
          <Filters races={data} activeFilter={activeFilter} />
          <RaceListTable races={filteredRaces} />
        </>
      )}
    </>
  )
}
export default RaceListScreen
