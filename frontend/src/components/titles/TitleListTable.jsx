import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
import { Icon, TRASH_ICON, EDIT_ICON, MEDAL_ICON } from '../icons'
import useServerSort from '../../tables/table-hooks/useServerSort'
import SortableTable from '../../tables/table-components/SortableTable'
import DeleteRecordButton from '../DeleteRecordButton'
import { usNormal } from '../../utils/dateFormats'

const TitleListTable = ({ titles, adminMode, deleteTitleHandler }) => {
  const config = [
    {
      label: 'TITLE',
      field: 'title',
      render: (title) => (
        <>
          <span className='float-start'>
            {' '}
            <Icon icon={MEDAL_ICON} /> {title.title}
          </span>
        </>
      ),
      sortValue: (title) => title.title
    },
    {
      label: 'YEAR',
      field: 'title_date',
      render: (title) => title.title_date.substring(0, 4),
      sortValue: (title) => title.title_date
    },
    {
      label: 'CATEGORY',
      field: 'category',
      render: (title) => title.category,
      sortValue: (title) => title.category
    },

    {
      label: '',
      render: (title) => {
        return adminMode ? (
          <>
            <LinkContainer to={`/admin/edit-titles/${title._id}`}>
              <Button variant='link' className='btn-sm'>
                <Icon className='text-info' icon={EDIT_ICON} />
              </Button>
            </LinkContainer>
            <DeleteRecordButton
              className='text-danger'
              title='Permanently Delete Title?'
              confirmationText='permanently delete title'
              confirmationAction={deleteTitleHandler}
              icon={TRASH_ICON}
              recordId={title._id}
              tip='Delete this title'
            >
              Delete{' '}
              <strong>
                {' '}
                {title.title} (date: {usNormal(title.title_date)})?
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

  const keyFn = (title) => {
    return title._id
  }

  const { sortOrder, sortBy, setSortColumn } = useServerSort(
    'title_date',
    -1,
    1000
  )

  return (
    <>
      <SortableTable
        striped
        hover
        size='sm'
        data={titles || []}
        config={config}
        sortBy={sortBy}
        sortOrder={sortOrder}
        keyFn={keyFn}
        setSortColumn={setSortColumn}
      />
    </>
  )
}
export default TitleListTable
