import ImageCarousel from '../components/images/ImageCarousel'
import LastRace from '../components/races/LastRace'
import { useGetLastRaceQuery } from '../slices/racesApiSlice'
import { useGetAllImagesQuery } from '../slices/imageApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = () => {
  const {
    data: race,
    error,
    isLoading
  } = useGetLastRaceQuery({ userId: '5bd91a027b59b61efe06ae3d' })

  const {
    data: images,
    error: imageError,
    isLoading: isImagesLoading
  } = useGetAllImagesQuery({ userId: '5bd91a027b59b61efe06ae3d' })

  return (
    <>
      {isLoading || isImagesLoading ? (
        <Loader />
      ) : error || imageError ? (
        <Message variant='danger'>
          {' '}
          {error?.data?.message ||
            error?.error ||
            imageError?.data.message ||
            imageError?.error}
        </Message>
      ) : (
        <>
          <ImageCarousel images={images} />
          <LastRace race={race} />
        </>
      )}
    </>
  )
}
export default HomeScreen
