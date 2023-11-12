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
    }),
    getTitleById: builder.query({
      query: (titleId) => ({
        url: `${TITLES_URL}/${titleId}`
      }),
      providesTags: ['Edit Title'],
      keepUnusedDataFor: 5
    }),
    addTitle: builder.mutation({
      query: (data) => ({
        url: TITLES_URL + '/',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Titles']
    }),
    updateTitle: builder.mutation({
      query: (data) => ({
        url: `${TITLES_URL}/${data._id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Titles']
    }),
    deleteTitle: builder.mutation({
      query: (titleId) => ({
        url: `${TITLES_URL}/${titleId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Titles']
    })
  })
})

export const {
  useGetAllTitlesQuery,
  useAddTitleMutation,
  useDeleteTitleMutation,
  useGetTitleByIdQuery,
  useUpdateTitleMutation
} = titlesApiSlice
