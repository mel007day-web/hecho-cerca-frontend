import api from './api';

export interface LoginDTO {
    email: string;
    password: string;
}

export interface LoginResponse {
    usuario: {
        id: number;
        nombre: string;
        correo: string;
        rol: string;
    };
    token: string;
}

export const login = async (
    data: LoginDTO
): Promise<LoginResponse> => {

    const response = await api.post<LoginResponse>(
        '/auth/login',
        data
    );

    return response.data;

};

export const logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

};