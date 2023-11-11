import { useEffect } from 'react'
import {
  useGetStravaProfileQuery,
  useUpdateStravaTokensMutation
} from '../../../slices/stravaApiSlice'

const useStrava = () => {
  const {
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
  }, [refetch, updateTokens, isLoading, stravaProfile])

  return { isLoading, error, tokenError, stravaProfile }
}

export default useStrava
