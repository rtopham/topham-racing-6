import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { filterRaces } from '../../slices/racesSlice'

const Filters = ({ races, activeFilter }) => {
  const dispatch = useDispatch()

  const clickFilter = (e) => {
    e.preventDefault()

    dispatch(filterRaces({ races, filter: e.target.name }))
  }

  const allTimeICUP = races.filter((race) =>
    race.series.match('Intermountain Cup')
  ).length

  const allTimeMidWeek = races.filter((race) =>
    race.series.match('Mid-Week')
  ).length
  const allTimeUSAC = races.filter((race) => race.series.match('USAC')).length

  const allTimeOther = races.length - allTimeICUP - allTimeUSAC - allTimeMidWeek

  const allTimePodiums = races.filter(
    (race) => race.rank <= 3 && race.rank !== 0
  ).length

  const allTimeWins = races.filter((race) => race.rank === 1).length

  return (
    <div className='d-flex justify-content-between mb-3'>
      <Button
        name='all'
        value={'all'}
        variant='light'
        size='sm'
        active={activeFilter === 'all'}
        onClick={clickFilter}
      >
        All Races ({races.length})
      </Button>{' '}
      <Button
        name='current'
        value={'current'}
        variant='light'
        size='sm'
        active={activeFilter === 'current'}
        onClick={clickFilter}
      >
        Current Season (
        {
          races.filter((race) => {
            return (
              new Date(race.race_date).getFullYear() ===
              new Date().getFullYear()
            )
          }).length
        }
        )
      </Button>{' '}
      <Button
        name='lastYear'
        value={'lastYear'}
        variant='light'
        size='sm'
        active={activeFilter === 'lastYear'}
        onClick={clickFilter}
      >
        Last Season (
        {
          races.filter((race) => {
            return (
              new Date(race.race_date).getFullYear() ===
              new Date().getFullYear() - 1
            )
          }).length
        }
        )
      </Button>{' '}
      <Button
        name='ICUP'
        value={'ICUP'}
        variant='light'
        size='sm'
        active={activeFilter === 'ICUP'}
        onClick={clickFilter}
      >
        ICUP ({allTimeICUP})
      </Button>{' '}
      <Button
        name='Mid-Week'
        value={'Mid-Week'}
        variant='light'
        size='sm'
        active={activeFilter === 'Mid-Week'}
        onClick={clickFilter}
      >
        Mid-Week ({allTimeMidWeek})
      </Button>{' '}
      <Button
        name='USAC'
        value={'USAC'}
        variant='light'
        size='sm'
        active={activeFilter === 'USAC'}
        onClick={clickFilter}
      >
        USAC ({allTimeUSAC})
      </Button>{' '}
      <Button
        name='Other'
        value={'Other'}
        variant='light'
        size='sm'
        active={activeFilter === 'Other'}
        onClick={clickFilter}
      >
        Other ({allTimeOther})
      </Button>{' '}
      <Button
        name='Podiums'
        value={'Podiums'}
        variant='light'
        size='sm'
        active={activeFilter === 'Podiums'}
        onClick={clickFilter}
      >
        Podiums ({allTimePodiums})
      </Button>{' '}
      <Button
        name='Wins'
        value={'Wins'}
        variant='light'
        size='sm'
        active={activeFilter === 'Wins'}
        onClick={clickFilter}
      >
        Wins ({allTimeWins})
      </Button>
    </div>
  )
}

export default Filters
