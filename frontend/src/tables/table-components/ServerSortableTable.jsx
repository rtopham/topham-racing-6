import DataTable from './DataTable'
import {
  Icon,
  SORT_UNSORTED_ICON,
  SORT_ASC_ICON,
  SORT_DESC_ICON
} from '../../components/icons'

import './table.css'
const ServerSortableTable = (props) => {
  const { data, config, sortBy, sortOrder, setSortColumn, keyFn, ...rest } =
    props

  //const { sortOrder, sortBy, sortedData, setSortColumn } = useSort(data, config)

  const updatedConfig = config.map((column) => {
    if (!column.sortValue) return column
    return {
      ...column,
      header: () => (
        <th role='button' onClick={() => setSortColumn(column.field)}>
          <div className='d-flex flex-column align-items-center'>
            <div className='d-flex flex-row align-items-center'>
              {getIcons(column.field, sortBy, sortOrder)}
              <span className='sort-heading'>{column.label}</span>
            </div>
          </div>
        </th>
      )
    }
  })

  const getIcons = (field, sortBy, sortOrder) => {
    if (field !== sortBy || sortOrder === null) {
      return (
        <div>
          <Icon className='text-primary me-2' icon={SORT_UNSORTED_ICON} />
        </div>
      )
    }
    if (sortOrder === 1) {
      return (
        <div>
          <Icon className='text-primary me-2' icon={SORT_ASC_ICON} />
        </div>
      )
    } else if (sortOrder === -1) {
      return (
        <div>
          <Icon className='text-primary me-2' icon={SORT_DESC_ICON} />
        </div>
      )
    }
  }

  return (
    <DataTable {...rest} data={data} config={updatedConfig} keyFn={keyFn} />
  )
}
export default ServerSortableTable
