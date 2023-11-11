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
    }),
    getRaceById: builder.query({
      query: (raceId) => ({
        url: `${RACES_URL}/${raceId}`
      }),
      providesTags: ['Edit Race'],
      keepUnusedDataFor: 5
    }),
    addRace: builder.mutation({
      query: (data) => ({
        url: RACES_URL + '/',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Races']
    }),
    updateRace: builder.mutation({
      query: (data) => ({
        url: `${RACES_URL}/${data._id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Races']
    }),
    deleteRace: builder.mutation({
      query: (raceId) => ({
        url: `${RACES_URL}/${raceId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Races']
    })
  })
})

export const {
  useGetRacesQuery,
  useGetAllRacesQuery,
  useGetLastRaceQuery,
  useGetRaceByIdQuery,
  useAddRaceMutation,
  useUpdateRaceMutation,
  useDeleteRaceMutation
} = racesApiSlice
