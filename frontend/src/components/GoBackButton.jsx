import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Icon, ARROW_LEFT_ICON } from './icons'

const GoBackButton = (props) => {
  const navigate = useNavigate()
  const { buttonText, arrow, ...rest } = props
  return (
    <Button
      {...rest}
      onClick={() => {
        navigate(-1)
      }}
    >
      {arrow && <Icon icon={ARROW_LEFT_ICON} />} {buttonText}
    </Button>
  )
}
export default GoBackButton

GoBackButton.defaultProps = {
  buttonText: 'Go Back'
}
