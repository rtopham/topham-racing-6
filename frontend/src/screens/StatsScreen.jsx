import { useGetAllRacesQuery } from '../slices/racesApiSlice'
import { Icon, CHART_ICON } from '../components/icons'
import Loader from '../components/Loader'
import Message from '../components/Message'
import AllTime from '../components/stats/AllTime'
import YearToDate from '../components/stats/YearToDate'

const StatsScreen = () => {
  const {
    data: races,
    isLoading,
    error
  } = useGetAllRacesQuery({
    userId: '5bd91a027b59b61efe06ae3d'
  })

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
          <h1>
            <Icon icon={CHART_ICON} /> Stats
          </h1>
          <YearToDate races={races} />
          <AllTime races={races} />
        </>
      )}
    </>
  )
}
export default StatsScreen
