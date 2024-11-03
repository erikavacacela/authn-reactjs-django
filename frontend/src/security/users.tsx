import axios from "axios";

export function getUser(email: string, password: string): Promise<any> {
  return axios.post("/api/login/", { email, password });
}

export function login(data: any): Promise<any> {
  return axios.post("/api/token/", data);
}

export function refreshToken(refresh: string): Promise<any> {
  return axios.post("/api/token/refresh/", { refresh: refresh }, {});
}

export function logout(access_token: string | null, refresh_token: string | null): Promise<any> {
  return axios.post("/api/logout/", { refresh_token: refresh_token },
    {
      headers: {
        Authorization: access_token,
      },
    }
  );
}
