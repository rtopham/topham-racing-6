import icup from '../../assets/images/icup.jpg'
import midweek from '../../assets/images/midweek.jpg'
import usac from '../../assets/images/USAC.png'
import uscs from '../../assets/images/uscs.jpg'
import chainring from '../../assets/images/chainringSM.gif'

const SeriesIcon = ({ series, className }) => {
  let logo = ''
  switch (series) {
    case 'Intermountain Cup':
      logo = icup
      break
    case 'Mid-Week':
      logo = midweek
      break
    case 'USAC':
      logo = usac
      break
    case 'Utah State Championship Series':
      logo = uscs
      break
    default: {
      logo = chainring
    }
  }
  return (
    <>
      <img
        className={className}
        src={logo}
        alt={series}
        height='25px'
        width='25px'
      />
    </>
  )
}
export default SeriesIcon
