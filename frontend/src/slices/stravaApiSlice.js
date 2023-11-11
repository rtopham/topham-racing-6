import { STRAVA_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const stravaApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStravaProfile: builder.query({
      query: ({ userId }) => ({
        url: STRAVA_URL + '/',
        params: { userId }
      }),
      providesTags: ['Strava'],
      keepUnusedDataFor: 5
    }),
    getStravaData: builder.query({
      query: ({ strava_athlete_id, strava_token }) => ({
        url: `https://www.strava.com/api/v3/athletes/${strava_athlete_id}/stats`,
        headers: { Authorization: `Bearer ${strava_token}` }
      }),
      providesTags: ['StravaData'],
      keepUnusedDataFor: 5
    }),
    getStravaActivity: builder.query({
      query: ({ theEpoch, strava_token }) => ({
        url: STRAVA_URL + '/activity',
        params: { theEpoch, strava_token }
      }),
      providesTags: ['StravaActivity'],
      keepUnusedDataFor: 5
    }),
    updateStravaTokens: builder.mutation({
      query: (data) => ({
        url: STRAVA_URL + '/',
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Strava']
    })
  })
})

export const {
  useGetStravaProfileQuery,
  useGetStravaDataQuery,
  useGetStravaActivityQuery,
  useUpdateStravaTokensMutation
} = stravaApiSlice
