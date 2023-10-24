import { Pagination } from 'react-bootstrap'

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  setPageNumber
}) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            key={x + 1}
            active={x + 1 === page}
            onClick={() => {
              setPageNumber(x + 1)
            }}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
