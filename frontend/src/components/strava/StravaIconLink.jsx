import { useState, useEffect } from 'react'
import { Icon, STRAVA_ICON } from '../icons'
import { useGetStravaActivityQuery } from '../../slices/stravaApiSlice'
import { toast } from 'react-toastify'

const StravaIconLink = ({ race, stravaProfile }) => {
  const { race_date } = race

  const theDate = new Date(race_date)
  const theEpoch = theDate.getTime() / 1000.0

  const [skip, setSkip] = useState(true)

  const { strava_token } = stravaProfile

  const { data: activity, error } = useGetStravaActivityQuery(
    { theEpoch, strava_token },
    { skip }
  )

  useEffect(() => {
    if (activity) {
      window.open(`https://www.strava.com/activities/${activity}`)
    }
  }, [activity])

  useEffect(() => {
    if (error) {
      toast('Unable to Download Strava Activity')
    }
  }, [error])

  const onClick = (e) => {
    e.preventDefault()
    setSkip(false)
  }

  if (new Date(race_date) > new Date('06-08-2010'))
    return (
      <a href={'#' + race_date} onClick={onClick}>
        <Icon
          style={{ color: '#FC4C02' }}
          className='float-end'
          icon={STRAVA_ICON}
        />
      </a>
    )
}

export default StravaIconLink
