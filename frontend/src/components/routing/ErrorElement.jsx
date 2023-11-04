import { Icon, WARNING_ICON } from '../icons'

const ErrorElement = ({ error }) => {
  return (
    <>
      <h1 className='text-center text-warning'>
        <Icon icon={WARNING_ICON} /> Error
      </h1>
      <h4 className='text-center'>{error.status}</h4>
      <h4 className='text-center'>{error.statusText}</h4>
    </>
  )
}
export default ErrorElement
