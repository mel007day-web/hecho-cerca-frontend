import api from './api';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    usuario: Usuario;
    token: string;
  };
}

export const login = async (
  data: LoginDTO
): Promise<LoginResponse["data"]> => {

  const response = await api.post<LoginResponse>(
    '/auth/login',
    data
  );

  return response.data.data;
};

export const logout = (): void => {

  localStorage.removeItem('token');
  localStorage.removeItem('usuario');

};