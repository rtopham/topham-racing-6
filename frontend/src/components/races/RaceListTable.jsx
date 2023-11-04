import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
import { Icon, TRASH_ICON, EDIT_ICON, MEDAL_ICON } from '../icons'
import useServerSort from '../../tables/table-hooks/useServerSort'
import SortableTable from '../../tables/table-components/SortableTable'
import { usNormal } from '../../utils/dateFormats'
import StravaIconLink from '../strava/StravaIconLink'
import SeriesIcon from './SeriesIcon'

const RaceListTable = ({ races, adminMode }) => {
  const config = [
    {
      label: 'SERIES',
      field: 'series',
      render: (race) => (
        <>
          <span className='float-start'>{race.series}</span>
          <SeriesIcon series={race.series} className='float-end' />{' '}
        </>
      ),
      sortValue: (race) => race.series
    },
    {
      label: 'NAME',
      field: 'race_name',
      render: (race) => (
        <>
          <span className='float-start'>{race.race_name}</span>
          <StravaIconLink race={race} stravaProfile={{}} />
        </>
      ),
      sortValue: (race) => race.race_name
    },
    {
      label: 'DATE',
      field: 'race_date',
      render: (race) => usNormal(race.race_date),
      sortValue: (race) => race.race_date
    },
    {
      label: 'CATEGORY',
      field: 'category',
      render: (race) => race.category,
      sortValue: (race) => race.category
    },
    {
      label: 'TIME',
      field: 'time',
      render: (race) => race.time,
      sortValue: (race) => race.time
    },
    {
      label: 'RANK  ',
      field: 'rank',
      render: (race) => race.rank,
      sortValue: (race) => race.rank
    },

    {
      label: '',
      render: (race) => {
        return adminMode ? (
          <>
            <LinkContainer to={`/admin/race/${race._id}/edit`}>
              <Button variant='link' className='btn-sm'>
                <Icon icon={EDIT_ICON} />
              </Button>
            </LinkContainer>
            <Button
              variant='link'
              className='btn-sm'
              onClick={() => console.log('Delete')}
            >
              <Icon icon={TRASH_ICON} style={{ color: 'red' }} />
            </Button>{' '}
          </>
        ) : (
          <></>
        )
      }
    }
  ]

  const keyFn = (race) => {
    return race._id
  }

  const { sortOrder, sortBy, setSortColumn } = useServerSort(
    'race_date',
    -1,
    1000
  )

  return (
    <>
      <SortableTable
        striped
        hover
        size='sm'
        data={races || []}
        config={config}
        sortBy={sortBy}
        sortOrder={sortOrder}
        keyFn={keyFn}
        setSortColumn={setSortColumn}
      />
    </>
  )
}
export default RaceListTable
