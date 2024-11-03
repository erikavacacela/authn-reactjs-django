import { jwtDecode } from 'jwt-decode';


export function getUserIdFromDecodeToken(access_token: string){
  const decoded = jwtDecode(access_token) as { [key: string]: string };
  return decoded.user_id;
}
