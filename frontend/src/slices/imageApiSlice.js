import { IMAGES_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const imageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllImages: builder.query({
      query: ({ userId }) => ({
        url: IMAGES_URL,
        params: { userId }
      }),
      providesTags: ['Gallery'],
      keepUnusedDataFor: 5
    })
  })
})

export const { useGetAllImagesQuery } = imageApiSlice
