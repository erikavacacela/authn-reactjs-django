import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Container, Navbar } from 'react-bootstrap'
import AppNavLogout from './nav-logout';
import { IUserData } from '../authentication/models';


export default function AppNavBar() {
  const auth = useAuthUser<IUserData>();
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Autenticación con JWT</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Inició sesión como: 
            <b>{auth?.username} - {auth?.id}</b>
          </Navbar.Text>
        </Navbar.Collapse>
        <AppNavLogout />
      </Container>
  </Navbar>
  )
}
