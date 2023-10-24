import DataTable from './DataTable'
import {
  Icon,
  SORT_UNSORTED_ICON,
  SORT_ASC_ICON,
  SORT_DESC_ICON
} from '../../components/icons'

import useSort from '../table-hooks/useSort'
import './table.css'
const SortableTable = (props) => {
  const { data, config } = props

  const { sortOrder, sortBy, sortedData, setSortColumn } = useSort(data, config)

  const updatedConfig = config.map((column) => {
    if (!column.sortValue) return column
    return {
      ...column,
      header: () => (
        <th role='button' onClick={() => setSortColumn(column.label)}>
          <div className='d-flex flex-column align-items-center'>
            <div className='d-flex flex-row align-items-center'>
              {getIcons(column.label, sortBy, sortOrder)}
              <span className='sort-heading'>{column.label}</span>
            </div>
          </div>
        </th>
      )
    }
  })

  const getIcons = (label, sortBy, sortOrder) => {
    if (label !== sortBy || sortOrder === null) {
      return (
        <div>
          <Icon className='text-primary me-2' icon={SORT_UNSORTED_ICON} />
        </div>
      )
    }
    if (sortOrder === 'asc') {
      return (
        <div>
          <Icon className='text-primary me-2' icon={SORT_ASC_ICON} />
        </div>
      )
    } else if (sortOrder === 'desc') {
      return (
        <div>
          <Icon className='text-primary me-2' icon={SORT_DESC_ICON} />
        </div>
      )
    }
  }

  return <DataTable {...props} data={sortedData} config={updatedConfig} />
}
export default SortableTable
