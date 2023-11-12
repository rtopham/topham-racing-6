import { Button, Container, Form } from 'react-bootstrap'
import { Icon, MEDAL_ICON } from '../../components/icons'
import useForm from '../../forms/form-hooks/useForm'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { titleForm } from '../../forms/form-objects/titleForm'
import { useAddTitleMutation } from '../../slices/titlesApiSlice'

const AddTitle = () => {
  const initialState = {
    title: '',
    title_date: '',
    category: ''
  }

  const { renderFormInputs, isFormValid, values } = useForm(
    titleForm,
    initialState
  )

  const [addTitle, { isLoading, error }] = useAddTitleMutation()

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      await addTitle(values).unwrap()
      toast.success('Title Added Successfully')
      navigate('/titles')
    } catch (err) {
      toast.error(err?.data?.message || error?.error)
    }
  }
  return (
    <>
      <Container style={{ width: '500px' }}>
        <section>
          <h1>
            <Icon icon={MEDAL_ICON} /> Add Title
          </h1>
        </section>
        <Form onSubmit={submitHandler}>
          {renderFormInputs()}
          <div className='d-grid gap-2'>
            <Button
              disabled={isLoading || !isFormValid()}
              type='submit'
              size='sm'
              variant='primary'
            >
              Add Title
            </Button>
          </div>
        </Form>
      </Container>
    </>
  )
}

export default AddTitle
