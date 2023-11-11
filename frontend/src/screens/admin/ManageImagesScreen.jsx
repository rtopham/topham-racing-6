import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {
  useGetAllImagesQuery,
  useDeleteImageMutation
} from '../../slices/imageApiSlice'
import { Icon, IMAGE_ICON } from '../../components/icons'
import ImageList from '../../components/images/ImageList'
import UploadImage from '../../components/images/UploadImage'
import { toast } from 'react-toastify'

const ManageImagesScreen = () => {
  const {
    data: images,
    error,
    refetch,
    isLoading
  } = useGetAllImagesQuery({ userId: '5bd91a027b59b61efe06ae3d' })

  const [deleteImage, { error: deleteError }] = useDeleteImageMutation()

  const deleteImageHandler = async (imageId) => {
    try {
      const res = await deleteImage(imageId).unwrap()
      refetch()
      toast.success(res.message)
    } catch (err) {
      toast.error(err?.data?.message || deleteError?.error)
    }
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {' '}
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>
            <Icon icon={IMAGE_ICON} /> Manage Images
          </h1>

          <ImageList images={images} deleteImageHandler={deleteImageHandler} />

          <UploadImage />
        </>
      )}
    </>
  )
}
export default ManageImagesScreen
