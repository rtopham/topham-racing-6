import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
import { Icon, TRASH_ICON, EDIT_ICON } from '../icons'
import useServerSort from '../../tables/table-hooks/useServerSort'
import SortableTable from '../../tables/table-components/SortableTable'
import { usNormal } from '../../utils/dateFormats'
import StravaIconLink from '../strava/StravaIconLink'
import SeriesIcon from './SeriesIcon'
import useStrava from '../strava/strava-hooks/useStrava'
import Loader from '../Loader'
import Message from '../Message'
import DeleteRecordButton from '../DeleteRecordButton'

const RaceListTable = ({ races, adminMode, deleteRaceHandler }) => {
  const { isLoading, error, tokenError, stravaProfile } = useStrava({})

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
          <StravaIconLink race={race} stravaProfile={stravaProfile} />
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
            <LinkContainer to={`/admin/edit-races/${race._id}`}>
              <Button variant='link' className='text-info btn-sm'>
                <Icon icon={EDIT_ICON} />
              </Button>
            </LinkContainer>
            <DeleteRecordButton
              className='text-danger'
              title='Permanently Delete Race?'
              confirmationText='permanently delete race'
              confirmationAction={deleteRaceHandler}
              icon={TRASH_ICON}
              recordId={race._id}
            >
              Delete{' '}
              <strong>
                {' '}
                {race.race_name} (date: {usNormal(race.race_date)})?
              </strong>{' '}
              <p>This action cannot be undone.</p>
            </DeleteRecordButton>
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
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {' '}
          {error?.data?.message || error.error}
        </Message>
      ) : tokenError ? (
        <Message variant='danger'>
          {' '}
          {tokenError?.data?.message || tokenError.error}
        </Message>
      ) : (
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
      )}
    </>
  )
}
export default RaceListTable
