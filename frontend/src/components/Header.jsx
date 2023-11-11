import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import {
  Icon,
  USER_ICON,
  GEAR_ICON,
  CYCLIST_ICON,
  MEDAL_ICON,
  CHART_ICON,
  STRAVA_ICON
} from './icons'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const AppLinks = () => (
    <>
      <LinkContainer to='/races'>
        <Nav.Link>
          <Icon icon={CYCLIST_ICON} /> Races
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='/titles'>
        <Nav.Link>
          <Icon icon={MEDAL_ICON} /> Titles
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='/stats'>
        <Nav.Link>
          <Icon icon={CHART_ICON} /> Stats
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='/strava'>
        <Nav.Link>
          <Icon icon={STRAVA_ICON} /> Strava
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='/login'>
        <Nav.Link>
          <Icon icon={USER_ICON} /> Sign In
        </Nav.Link>
      </LinkContainer>
    </>
  )

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' fixed='top' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <Icon icon={GEAR_ICON} /> Topham Racing
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  <AppLinks />
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <AppLinks />
                </>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>User List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/add-race'>
                    <NavDropdown.Item>Add Race</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/edit-races'>
                    <NavDropdown.Item>Edit or Delete Races</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/manage-images'>
                    <NavDropdown.Item>Manage Images</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
export default Header
