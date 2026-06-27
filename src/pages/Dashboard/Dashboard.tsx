import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Button,
    Card,
    CardContent,
    Typography
} from '@mui/material';

import {
    Inventory as ProductsIcon,
    Category as CategoriesIcon,
    Store as ProducersIcon
} from '@mui/icons-material';

export default function Dashboard() {

    const navigate = useNavigate();

    const { usuario, logout } = useAuth();

    const handleLogout = () => {

        logout();

        navigate('/login');

    };

    return (

        <Box sx={{ p: 3 }}>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4
            }}>

                <Box>

                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Dashboard
                    </Typography>

                    <Typography sx={{ color: '#757575', mt: 1 }}>
                        Bienvenido, {usuario?.nombre}
                    </Typography>

                    <Typography sx={{
                        color: '#2E7D32',
                        fontWeight: 500,
                        mt: 0.5
                    }}>
                        Rol: {usuario?.rol}
                    </Typography>

                </Box>

                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleLogout}
                >
                    Cerrar Sesión
                </Button>

            </Box>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)'
                },
                gap: 3
            }}>

                <Box>

                    <Card
                        sx={{
                            cursor: 'pointer',
                            '&:hover': {
                                boxShadow: 6
                            }
                        }}
                        onClick={() => navigate('/dashboard/products')}
                    >

                        <CardContent>

                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 2
                            }}>

                                <ProductsIcon sx={{
                                    fontSize: 40,
                                    color: '#2E7D32',
                                    mr: 2
                                }} />

                                <Typography variant="h6">
                                    Productos
                                </Typography>

                            </Box>

                            <Typography sx={{ color: '#757575' }}>
                                Gestionar productos del mercado
                            </Typography>

                        </CardContent>

                    </Card>

                </Box>

                <Box>

                    <Card
                        sx={{
                            cursor: 'pointer',
                            '&:hover': {
                                boxShadow: 6
                            }
                        }}
                        onClick={() => navigate('/dashboard/categories')}
                    >

                        <CardContent>

                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 2
                            }}>

                                <CategoriesIcon sx={{
                                    fontSize: 40,
                                    color: '#1976D2',
                                    mr: 2
                                }} />

                                <Typography variant="h6">
                                    Categorías
                                </Typography>

                            </Box>

                            <Typography sx={{ color: '#757575' }}>
                                Gestionar categorías de productos
                            </Typography>

                        </CardContent>

                    </Card>

                </Box>

                <Box>

                    <Card
                        sx={{
                            cursor: 'pointer',
                            '&:hover': {
                                boxShadow: 6
                            }
                        }}
                        onClick={() => navigate('/dashboard/producers')}
                    >

                        <CardContent>

                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 2
                            }}>

                                <ProducersIcon sx={{
                                    fontSize: 40,
                                    color: '#ED6C02',
                                    mr: 2
                                }} />

                                <Typography variant="h6">
                                    Productores
                                </Typography>

                            </Box>

                            <Typography sx={{ color: '#757575' }}>
                                Gestionar productores campesinos
                            </Typography>

                        </CardContent>

                    </Card>

                </Box>

            </Box>

        </Box>

    );

}