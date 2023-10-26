import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { Row, Col } from 'react-bootstrap'
import SeriesIcon from './SeriesIcon'
import AwaitDataLoad from '../AwaitDataLoad'
import { useGetLastRaceQuery } from '../../slices/racesApiSlice'

const LastRace = () => {
  const {
    data: race,
    error,
    isLoading
  } = useGetLastRaceQuery({ userId: '5bd91a027b59b61efe06ae3d' })

  const { race_date, series, race_name, rank, time, category } = race || {}

  return (
    <>
      <AwaitDataLoad isLoading={isLoading} error={error} />
      {!isLoading && !error && (
        <Card body className='mb-3'>
          <Row>
            <Col>
              <ListGroup variant='flush'>
                {' '}
                <ListGroup.Item>
                  <h6>Last Race: {new Date(race_date).toLocaleDateString()}</h6>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>
                    <SeriesIcon series={series} /> {race_name}
                  </h3>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <ListGroup variant='flush'>
                {' '}
                <ListGroup.Item>Rank: {rank}</ListGroup.Item>
                <ListGroup.Item>Time: {time}</ListGroup.Item>
                <ListGroup.Item>Category: {category}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Card>
      )}
    </>
  )
}

export default LastRace
