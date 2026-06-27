import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';

import type { ReactNode } from 'react';

import {
    login as loginService
} from '../services/auth.service';

import type { LoginDTO } from '../services/auth.service';

interface Usuario {
    id: number;
    nombre: string;
    correo: string;
    rol: string;
}

interface AuthContextType {
    usuario: Usuario | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (data: LoginDTO) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

interface Props {
    children: ReactNode;
}

export function AuthProvider({ children }: Props) {

    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {

        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('usuario');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUsuario(JSON.parse(storedUser));
        }

    }, []);

    const login = async (data: LoginDTO) => {

        const response = await loginService(data);

        setUsuario(response.usuario);
        setToken(response.token);

        localStorage.setItem('token', response.token);

        localStorage.setItem(
            'usuario',
            JSON.stringify(response.usuario)
        );

    };

    const logout = () => {

        setUsuario(null);
        setToken(null);

        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

    };

    return (

        <AuthContext.Provider
            value={{
                usuario,
                token,
                isAuthenticated: !!token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>

    );

}

export const useAuth = () => useContext(AuthContext);