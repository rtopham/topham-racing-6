import { useGetAllTitlesQuery } from '../slices/titlesApiSlice'
import { Icon, MEDAL_ICON } from '../components/icons'
import TitleListTable from '../components/titles/TitleListTable'
import Loader from '../components/Loader'
import Message from '../components/Message'

const TitleListScreen = () => {
  const {
    data: titles,
    isLoading,
    error
  } = useGetAllTitlesQuery({
    userId: '5bd91a027b59b61efe06ae3d'
  })

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
          <h2>
            <Icon icon={MEDAL_ICON} /> Titles
          </h2>

          {!isLoading && !error && <TitleListTable titles={titles} />}
        </>
      )}
    </>
  )
}
export default TitleListScreen
