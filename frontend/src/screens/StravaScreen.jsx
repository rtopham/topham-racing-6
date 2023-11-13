import { useEffect } from 'react'
import { useUpdateStravaTokensMutation } from '../slices/stravaApiSlice'
import { useGetStravaProfileQuery } from '../slices/stravaApiSlice'
import { Icon, STRAVA_ICON } from '../components/icons'
import Loader from '../components/Loader'
import Message from '../components/Message'
import StravaWidgets from '../components/strava/StravaWidgets'
import StravaStats from '../components/strava/StravaStats'
import useStrava from '../components/strava/strava-hooks/useStrava'

const StravaScreen = () => {
  /*   const {
    data: stravaProfile,
    isLoading,
    error,
    refetch
  } = useGetStravaProfileQuery({
    userId: '5bd91a027b59b61efe06ae3d'
  })

  const [updateTokens, { error: tokenError }] = useUpdateStravaTokensMutation()

  useEffect(() => {
    const checkTokens = async () => {
      const now = new Date()
      const secondsSinceEpoch = Math.round(now.getTime() / 1000)

      const { strava_token_expires_at } = stravaProfile

      if (strava_token_expires_at < secondsSinceEpoch) {
        await updateTokens(stravaProfile)
        refetch()
      }
    }
    if (!isLoading) checkTokens()
  }, [refetch, updateTokens, isLoading, stravaProfile]) */

  const { isLoading, error, tokenError, stravaProfile } = useStrava()

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {' '}
          {error?.data?.message || error.error}
        </Message>
      ) : tokenError ? (
        <Message variant='danger'>
          {' '}
          {tokenError?.data?.message || tokenError.error}
        </Message>
      ) : (
        <>
          <h2>
            <Icon icon={STRAVA_ICON} /> Strava
          </h2>
          <StravaWidgets stravaProfile={stravaProfile} />
          <StravaStats stravaProfile={stravaProfile} />
        </>
      )}
    </>
  )
}
export default StravaScreen
