import { Button, Container, Form } from 'react-bootstrap'
import { Icon, BIKE_ICON } from '../../components/icons'
import useForm from '../../forms/form-hooks/useForm'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { raceForm } from '../../forms/form-objects/raceForm'
import { useAddRaceMutation } from '../../slices/racesApiSlice'

const AddRace = () => {
  const initialState = {
    race_date: '',
    race_name: '',
    time: '',
    category: '',
    location: '',
    series: '',
    rank: 0
  }

  const { renderFormInputs, isFormValid, values } = useForm(
    raceForm,
    initialState
  )

  const [addRace, { isLoading, error }] = useAddRaceMutation()

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      await addRace(values).unwrap()
      toast.success('Race Added Successfully')
      navigate('/races')
    } catch (err) {
      toast.error(err?.data?.message || error?.error)
    }
  }
  return (
    <>
      <Container style={{ width: '500px' }}>
        <section>
          <h1>
            <Icon icon={BIKE_ICON} /> Add Race
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
              Add Race
            </Button>
          </div>
        </Form>
      </Container>
    </>
  )
}

export default AddRace
