import createRefresh from 'react-auth-kit/createRefresh';
import { refreshToken } from '../security/users';
import { getUserIdFromDecodeToken } from '../utils/decode-token';
import { IUserData } from './models';

export const refresh = createRefresh({
  interval: 10,
  refreshApiCallback: refreshApiCallback
})

async function refreshApiCallback(param: {authToken?: string; refreshToken?: string; authUserState: IUserData}): Promise<any> {
  try {
    console.log('refreshing token', param)
    if (!param.refreshToken) {
      throw new Error('Refresh token is missing');
    }
    const response = await refreshToken(param.refreshToken)
    const user_id = getUserIdFromDecodeToken(response.data.access);
    return {
      isSuccess: true,
      newAuthToken: response.data.access,
      newAuthTokenType: "Bearer",
      newRefreshToken: response.data.refresh,
      newAuthUserState: {
        username: param.authUserState.username,
        id: user_id,
        refreshToken: response.data.refresh
      }
    }
  }catch(error){
    console.error(error)
    return {
      isSuccess: false
    }
  }
}