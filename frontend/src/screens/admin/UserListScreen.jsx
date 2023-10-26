import {
  useGetUsersQuery,
  useDeleteUserMutation
} from '../../slices/usersApiSlice'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col } from 'react-bootstrap'

import {
  Icon,
  TRASH_ICON,
  EDIT_ICON,
  CHECK_ICON,
  TIMES_ICON
} from '../../components/icons'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import useServerSort from '../../tables/table-hooks/useServerSort'
import ServerSortableTable from '../../tables/table-components/ServerSortableTable'
import { usNormal } from '../../utils/dateFormats'
import Paginate from '../../components/Paginate'

const UserListScreen = () => {
  const config = [
    {
      label: 'ID',
      field: '_id',
      render: (user) => user._id,
      sortValue: (user) => user._id
    },
    {
      label: 'NAME',
      field: 'name',
      render: (user) => user.name,
      sortValue: (user) => user.name
    },
    {
      label: 'EMAIL',
      field: 'email',
      render: (user) => <a href={`mailto:${user.email}`}>{user.email}</a>,
      sortValue: (user) => user.email
    },
    {
      label: 'Joined',
      field: 'createdAt',
      render: (user) => usNormal(user.createdAt),
      sortValue: (user) => user.createdAt
    },
    {
      label: 'ADMIN',
      field: 'isAdmin',
      render: (user) =>
        user.isAdmin ? (
          <Icon icon={CHECK_ICON} style={{ color: 'green' }} />
        ) : (
          <Icon icon={TIMES_ICON} style={{ color: 'red' }} />
        )
    },
    {
      label: '',
      render: (user) => (
        <>
          <LinkContainer to={`/admin/user/${user._id}/edit`}>
            <Button variant='link' className='btn-sm'>
              <Icon icon={EDIT_ICON} />
            </Button>
          </LinkContainer>
          <Button
            variant='link'
            className='btn-sm'
            onClick={() => deleteHandler(user._id)}
          >
            <Icon icon={TRASH_ICON} style={{ color: 'red' }} />
          </Button>{' '}
        </>
      )
    }
  ]

  const keyFn = (user) => {
    return user._id
  }

  const {
    sortOrder,
    sortBy,
    setSortColumn,
    pageSize,
    setPageSize,
    pageNumber,
    setPageNumber
  } = useServerSort('name', 1, 4)

  const { data, refetch, isLoading, error } = useGetUsersQuery({
    pageSize,
    pageNumber,
    sortBy,
    sortOrder
  })

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation()

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id)
        refetch()
        toast.success('User deleted')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <>
      <h1>Users</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {' '}
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {/* <SortableTable
            striped
            size='sm'
            data={data.users}
            config={config}
            keyFn={keyFn}
          /> */}
          <ServerSortableTable
            striped
            size='sm'
            data={data.users}
            config={config}
            sortBy={sortBy}
            sortOrder={sortOrder}
            keyFn={keyFn}
            setSortColumn={setSortColumn}
          />
          <Row>
            <Col md='2'>
              <Form.Group controlId='pageSize'>
                <Form.Label>Page Size</Form.Label>
                <Form.Control
                  size='sm'
                  type='number'
                  name='page-size'
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col className='d-flex align-items-end justify-content-end'>
              <Paginate
                pages={data.pages}
                page={data.page}
                isAdmin={true}
                setPageNumber={setPageNumber}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  )
}
export default UserListScreen
