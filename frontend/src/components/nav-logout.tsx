import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Nav } from 'react-bootstrap'
import { IUserData } from '../authentication/models';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { logout } from '../security/users';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

export default function AppNavLogout() {

  const auth = useAuthUser<IUserData>();
  const authHeader = useAuthHeader()

  const signOut = useSignOut()
  const handleSignOut = async () => {
    if(auth){
      await logout(authHeader, auth.refreshToken)
    }
    signOut()
    window.location.href = '/login'
  }

  return (
    <Nav className="me-auto">
        <Nav.Link onClick={handleSignOut} className='primary'>| Cerrar sesión</Nav.Link>
    </Nav>

  )
}
