import { Container, Form, Button } from 'react-bootstrap'
import { Icon, MEDAL_ICON } from '../../components/icons'
import { titleForm } from '../form-objects/titleForm'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import useForm from '../form-hooks/useForm'
import { yearMonthDay } from '../../utils/dateFormats'
import { useUpdateTitleMutation } from '../../slices/titlesApiSlice'

const EditTitleForm = ({ title }) => {
  const navigate = useNavigate()

  const initialState = { ...title, title_date: yearMonthDay(title.title_date) }
  const { renderFormInputs, isFormValid, values, changesMade } = useForm(
    titleForm,
    initialState
  )

  const [updateTitle, { error }] = useUpdateTitleMutation(title._id)

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      await updateTitle(values).unwrap()
      toast.success('Title Updated Successfully')
      navigate('/admin/edit-titles')
    } catch (err) {
      toast.error(err?.data?.message || error?.error)
    }
  }
  return (
    <>
      <Container style={{ width: '500px' }}>
        <section>
          <h1>
            <Icon icon={MEDAL_ICON} /> Edit Title
          </h1>
        </section>
        <Form onSubmit={submitHandler}>
          {renderFormInputs()}
          <div className='d-grid gap-2'>
            <Button
              disabled={!isFormValid() || !changesMade(initialState, values)}
              type='submit'
              size='sm'
              variant='primary'
            >
              Save Title
            </Button>
          </div>
        </Form>
      </Container>
    </>
  )
}
export default EditTitleForm
