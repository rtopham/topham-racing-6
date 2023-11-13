import { Container, Form, Button } from 'react-bootstrap'
import { CYCLIST_ICON, Icon } from '../../components/icons'
import { raceForm } from '../../forms/form-objects/raceForm'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import useForm from '../form-hooks/useForm'
import { yearMonthDay } from '../../utils/dateFormats'
import { useUpdateRaceMutation } from '../../slices/racesApiSlice'

const EditRaceForm = ({ race }) => {
  const navigate = useNavigate()

  const initialState = { ...race, race_date: yearMonthDay(race.race_date) }
  const { renderFormInputs, isFormValid, values, changesMade } = useForm(
    raceForm,
    initialState
  )

  const [updateRace, { error }] = useUpdateRaceMutation(race._id)

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      await updateRace(values).unwrap()
      toast.success('Race Updated Successfully')
      navigate('/admin/edit-races')
    } catch (err) {
      toast.error(err?.data?.message || error?.error)
    }
  }
  return (
    <>
      <Container style={{ width: '500px' }}>
        <section>
          <h2>
            <Icon icon={CYCLIST_ICON} /> Edit Race
          </h2>
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
              Save Race
            </Button>
          </div>
        </Form>
      </Container>
    </>
  )
}
export default EditRaceForm
