import { useState, useEffect } from 'react'
import { useGetStravaDataQuery } from '../../slices/stravaApiSlice'
import Loader from '../Loader'
import Message from '../Message'
import StravaStatsCard from './StravaStatsCard'
import { calculateStravaStats } from './strava-utils/calculateStravaStats'

const StravaStats = ({ stravaProfile }) => {
  const {
    data: stravaData,
    isLoading,
    error
  } = useGetStravaDataQuery(stravaProfile)

  const [stravaStats, setStravaStats] = useState()

  useEffect(() => {
    if (!isLoading) {
      setStravaStats(calculateStravaStats(stravaData))
    }
  }, [isLoading, stravaData])

  return (
    <>
      {isLoading || !stravaStats ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {' '}
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <StravaStatsCard
            title='Recent Stats (last 28 days)'
            stats={stravaStats.recentStats}
          />
          <StravaStatsCard
            title='Year-To-Date-Stats'
            stats={stravaStats.ytdStats}
          />
          <StravaStatsCard
            title='All-Time Stats (since 2012)'
            stats={stravaStats.allTimeStats}
          />
        </>
      )}
    </>
  )
}
export default StravaStats
