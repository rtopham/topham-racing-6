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
    }),
    uploadImage: builder.mutation({
      query: (data) => {
        const formData = new FormData()
        formData.append('image', data.images[0])
        return {
          url: IMAGES_URL,
          method: 'POST',
          /* headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
          }, */
          body: formData
        }
      },
      invalidatesTags: ['Gallery']
    }),
    deleteImage: builder.mutation({
      query: (imageId) => ({
        url: `${IMAGES_URL}/${imageId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Gallery']
    })
  })
})

export const {
  useGetAllImagesQuery,
  useUploadImageMutation,
  useDeleteImageMutation
} = imageApiSlice
