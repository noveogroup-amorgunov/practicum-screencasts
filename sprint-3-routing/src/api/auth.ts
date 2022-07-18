import { request } from 'core/apiRequest';
import { APIError, UserDTO } from './types';

type LoginRequestData = {
  login: string;
  password: string;
};

type LoginResponseData = {} | APIError;

export const authAPI = {
  login: (data: LoginRequestData) =>
    request.post<LoginResponseData>('auth/signin', data),

  me: () => request.get<UserDTO | APIError>('auth/user'),

  logout: () => request.post('auth/logout'),
};
