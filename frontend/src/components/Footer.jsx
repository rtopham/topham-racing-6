import { Container, Navbar } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
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
