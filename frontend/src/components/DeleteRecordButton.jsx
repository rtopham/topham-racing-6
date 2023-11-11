import { useState } from 'react'
import IconButton from './IconButton'
import ConfirmCancelModal from './modals/modal-components/ConfirmCancelModal'

const DeleteRecordButton = (props) => {
  //const deleteRecordForm = useConfirmCancel(props)

  //console.log(deleteRecordForm)

  //const { className, icon, setShowModal, tip } = deleteRecordForm
  const { icon, recordId, confirmationAction, className, ...rest } = props

  const [showModal, setShowModal] = useState(false)

  const handleDelete = () => {
    setShowModal(true)
  }

  const clickCancel = () => {
    setShowModal(false)
  }

  const clickConfirm = () => {
    confirmationAction(recordId)
    setShowModal(false)
  }

  return (
    <>
      <IconButton className={className} icon={icon} onClick={handleDelete} />
      {showModal && (
        <ConfirmCancelModal
          {...rest}
          recordId={recordId}
          showModal={showModal}
          clickCancel={clickCancel}
          clickConfirm={clickConfirm}
        />
      )}
    </>
  )

  /*   return (
    <>
      <IconButton
        className={className}
        icon={icon}
        onClick={setShowModal}
        tip={tip}
      />

      <ConfirmCancelModal {...deleteRecordForm} />
    </>
  ) */
}

export default DeleteRecordButton
