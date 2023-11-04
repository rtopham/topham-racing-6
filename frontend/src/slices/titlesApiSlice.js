import { TITLES_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const titlesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTitles: builder.query({
      query: ({ userId }) => ({
        url: TITLES_URL,
        params: { userId }
      }),
      providesTags: ['Titles'],
      keepUnusedDataFor: 5
    })
  })
})

export const { useGetAllTitlesQuery } = titlesApiSlice
