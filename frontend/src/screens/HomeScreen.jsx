import { useEffect } from 'react'
import ImageCarousel from '../components/ImageCarousel'
import RaceListTable from '../components/races/RaceListTable'
import image1 from '../assets/images/Snowbird1.jpg'
import image2 from '../assets/images/sh1.jpg'
import image3 from '../assets/images/HeberAlt.jpg'
import image4 from '../assets/images/RoundValley2.jpeg'
import image5 from '../assets/images/nordicvalley1.jpg'
import LastRace from '../components/races/LastRace'
import Filters from '../components/races/Filters'
import { useGetAllRacesQuery } from '../slices/racesApiSlice'
import { filterRaces } from '../slices/racesSlice'
import { useDispatch, useSelector } from 'react-redux'

const HomeScreen = () => {
  const images = [image1, image2, image3, image4, image5]

  const dispatch = useDispatch()

  const { data, isLoading, error } = useGetAllRacesQuery({
    userId: '5bd91a027b59b61efe06ae3d'
  })

  useEffect(() => {
    if (!isLoading && !error) {
      dispatch(filterRaces({ races: data, filter: 'all' }))
    }
  }, [data, isLoading, error, dispatch])

  const filteredRaces = useSelector((state) => state.races.filtered)

  // console.log(filteredRaces)

  return (
    <>
      <ImageCarousel images={images} />
      <LastRace />
      {!isLoading && <Filters races={data} />}
      {filteredRaces && <RaceListTable races={filteredRaces} />}
    </>
  )
}
export default HomeScreen
