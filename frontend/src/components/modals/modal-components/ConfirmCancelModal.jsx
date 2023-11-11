import { Modal, Form, Button } from 'react-bootstrap'
import { CANCEL_ICON, Icon, TRASH_ICON, WARNING_ICON } from '../../icons'

import { confirmCancelForm } from '../../../forms/form-objects/confirmCancelForm'
import useForm from '../../../forms/form-hooks/useForm'

const ConfirmCancelModal = ({
  showModal,
  title,
  titleIcon,
  clickConfirm,
  clickCancel,
  confirmationButtonIcon,
  confirmationButtonText,
  confirmationButtonVariant,
  cancelButtonIcon,
  cancelButtonText,
  cancelButtonVariant,
  confirmationText,
  confirmationPrompt,
  form,
  validateForm,
  children
}) => {
  const { renderFormInputs, isFormValid } = useForm(
    confirmCancelForm,
    { confirmText: '' },
    { confirmationText }
  )

  return (
    <Modal centered show={showModal}>
      <Modal.Header>
        <Modal.Title>
          {titleIcon && <Icon icon={titleIcon} />} {title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
        <Form onSubmit={clickConfirm} className='mt-3'>
          <Form.Group controlId='formText'>
            <Form.Label>
              {confirmationPrompt} type{' '}
              <i>
                <b>{confirmationText}</b>
              </i>{' '}
              below.
            </Form.Label>
          </Form.Group>
          {renderFormInputs({ confirmText: { placeholder: confirmationText } })}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant={confirmationButtonVariant}
          disabled={!isFormValid()}
          onClick={clickConfirm}
        >
          <Icon icon={confirmationButtonIcon} /> {confirmationButtonText}
        </Button>{' '}
        <Button variant={cancelButtonVariant} onClick={clickCancel}>
          <Icon icon={cancelButtonIcon} /> {cancelButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

ConfirmCancelModal.defaultProps = {
  title: 'Delete Record',
  titleIcon: WARNING_ICON,
  confirmationPrompt: 'To confirm deletion',
  confirmationButtonText: 'Delete',
  confirmationButtonIcon: TRASH_ICON,
  confirmationButtonVariant: 'danger',
  cancelButtonText: 'Cancel',
  cancelButtonIcon: CANCEL_ICON,
  cancelButtonVariant: 'dark',
  confirmationText: 'permanently delete'
}

export default ConfirmCancelModal
