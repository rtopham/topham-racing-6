import { useState } from 'react'
import IconButton from './IconButton'
import ConfirmCancelModal from './modals/modal-components/ConfirmCancelModal'

const DeleteRecordButton = (props) => {
  const { icon, recordId, confirmationAction, tip, className, ...rest } = props

  const [showModal, setShowModal] = useState(false)

  const clickConfirm = () => {
    confirmationAction(recordId)
    setShowModal(false)
  }

  return (
    <>
      <IconButton
        className={className}
        icon={icon}
        onClick={() => setShowModal(true)}
        tip={tip}
      />
      {showModal && (
        <ConfirmCancelModal
          {...rest}
          recordId={recordId}
          showModal={showModal}
          clickCancel={() => setShowModal(false)}
          clickConfirm={clickConfirm}
        />
      )}
    </>
  )
}

export default DeleteRecordButton
