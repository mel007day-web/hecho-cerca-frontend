import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css';

import logo from '../../assets/images/logo.png';

import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Alert
} from '@mui/material';

import { useAuth } from '../../Context/AuthContext';

export default function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const handleLogin = async () => {

    try {

      setLoading(true);

      setError('');

      await login({
        email,
        password
      });

      navigate('/dashboard');

    } catch (err: any) {

      setError(
        err.response?.data?.message ??
        'Correo o contraseña incorrectos'
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <Box className="login">

      <Box className="login__left">

        <Paper
          className="login__card"
          elevation={8}
        >

          <img
            src={logo}
            alt="Hecho Cerca"
            className="login__logo"
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1
            }}
          >
            Bienvenido
          </Typography>

          <Typography
            sx={{
              color: '#757575',
              mb: 4
            }}
          >
            Inicia sesión para continuar
          </Typography>

          {error && (

            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>

          )}

          <TextField
            fullWidth
            label="Correo electrónico"
            margin="normal"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <Button
            fullWidth
            variant="contained"
            disabled={loading}
            onClick={handleLogin}
            sx={{
              mt: 3,
              py: 1.5,
              backgroundColor: '#2E7D32',
              '&:hover': {
                backgroundColor: '#1B5E20'
              }
            }}
          >
            {loading
              ? 'Ingresando...'
              : 'Iniciar sesión'}
          </Button>

        </Paper>

      </Box>

      <Box className="login__right">

        <Typography
          variant="h2"
          sx={{
            color: '#fff',
            fontWeight: 700
          }}
        >
          Hecho Cerca
        </Typography>

        <Typography
          sx={{
            color: '#fff',
            fontSize: 22
          }}
        >
          Mercado Campesino
        </Typography>

      </Box>

    </Box>

  );

}