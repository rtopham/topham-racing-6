import { Container, Row, Col, Navbar } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      {/* <Row>
          <Col className='text-center py-3'>
            <p>Race a bike. Improve your life.</p>
          </Col>
        </Row> */}
      <Navbar
        bg='dark'
        variant='dark'
        collapseOnSelect
        expand='lg'
        fixed='bottom'
      >
        <Container className='justify-content-center'>
          <Navbar.Text>Race a bike. Improve your life.</Navbar.Text>
        </Container>
      </Navbar>
    </footer>
  )
}

export default Footer
