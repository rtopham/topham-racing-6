import TitleListTable from '../../components/titles/TitleListTable'
import {
  useGetAllTitlesQuery,
  useDeleteTitleMutation
} from '../../slices/titlesApiSlice'
import { Icon, MEDAL_ICON } from '../../components/icons'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { toast } from 'react-toastify'

const EditTitlesScreen = () => {
  const {
    data: titles,
    isLoading,
    error,
    refetch
  } = useGetAllTitlesQuery({
    userId: '5bd91a027b59b61efe06ae3d'
  })

  const [deleteTitle] = useDeleteTitleMutation()

  const deleteTitleHandler = async (titleId) => {
    try {
      const res = await deleteTitle(titleId).unwrap()
      refetch()
      toast.success(res.message)
    } catch (err) {
      toast.error(err?.data?.message || error?.error)
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
          <h2>
            <Icon icon={MEDAL_ICON} /> Edit Titles
          </h2>

          <TitleListTable
            titles={titles}
            adminMode={true}
            deleteTitleHandler={deleteTitleHandler}
          />
        </>
      )}
    </>
  )
}
export default EditTitlesScreen
