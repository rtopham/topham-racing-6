import { Container, Card, Form, Button } from 'react-bootstrap'
//import UploadForm from '../../forms/app-forms/UploadForm'
import { uploadForm } from '../../forms/form-objects/uploadForm'
import useForm from '../../forms/form-hooks/useForm'
import { useUploadImageMutation } from '../../slices/imageApiSlice'
import { toast } from 'react-toastify'

const UploadImage = () => {
  const initialState = { file: '' }
  const { renderFormInputs, isFormValid, values, reset, changesMade } = useForm(
    uploadForm,
    initialState
  )

  const [uploadImage, { error }] = useUploadImageMutation()

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const res = await uploadImage(values)
      toast.success(res.data.message)
      reset()
    } catch (err) {
      toast.error(err?.data?.message || error?.error)
    }
  }
  return (
    <>
      <div style={{ clear: 'left' }}></div>
      <Card className='mt-3'>
        <Container>
          <Form onSubmit={submitHandler}>
            <Card.Body>{renderFormInputs()}</Card.Body>

            <Card.Footer>
              <div className='float-end mb-3'>
                <Button
                  disabled={
                    !isFormValid() || !changesMade(initialState, values)
                  }
                  type='submit'
                  size='sm'
                  variant='primary'
                >
                  Upload Image
                </Button>
              </div>
            </Card.Footer>
          </Form>
        </Container>
      </Card>
    </>
  )
}
export default UploadImage
