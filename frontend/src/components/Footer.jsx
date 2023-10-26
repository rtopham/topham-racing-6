import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>Race a bike. Improve your life.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
