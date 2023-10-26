import { RACES_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const racesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRaces: builder.query({
      query: ({ pageSize, pageNumber, sortBy, sortOrder, userId }) => ({
        url: RACES_URL,
        params: { pageSize, pageNumber, sortBy, sortOrder, userId }
      }),
      providesTags: ['Races'],
      keepUnusedDataFor: 5
    }),
    getAllRaces: builder.query({
      query: ({ userId }) => ({
        url: RACES_URL + '/all',
        params: { userId }
      }),
      providesTags: ['Races'],
      keepUnusedDataFor: 5
    }),
    getLastRace: builder.query({
      query: ({ userId }) => ({
        url: RACES_URL + '/last-race',
        params: { userId }
      }),
      providesTags: ['Last Race'],
      keepUnusedDataFor: 5
    })
  })
})

export const { useGetRacesQuery, useGetAllRacesQuery, useGetLastRaceQuery } =
  racesApiSlice
