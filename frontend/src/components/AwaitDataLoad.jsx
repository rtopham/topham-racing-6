import Loader from './Loader'
import Message from './Message'

const AwaitDataLoad = ({ isLoading, error }) => {
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : null
}

export default AwaitDataLoad
