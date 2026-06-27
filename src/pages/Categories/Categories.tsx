import { useState, useEffect } from 'react';

import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Alert
} from '@mui/material';

import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    ArrowBack as BackIcon
} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

import api from '../../services/api';

interface Category {
    id_categoria: number;
    nombre: string;
    descripcion: string;
}

export default function Categories() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState<Category[]>([]);
    const [open, setOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: ''
    });

    useEffect(() => {

        loadCategories();

    }, []);

    const loadCategories = async () => {

        try {

            const response = await api.get('/categories');
            setCategories(response.data.data);

        } catch (err) {

            setError('Error al cargar categorías');

        }

    };

    const handleOpen = (category?: Category) => {

        if (category) {

            setEditingCategory(category);

            setFormData({
                nombre: category.nombre,
                descripcion: category.descripcion
            });

        } else {

            setEditingCategory(null);

            setFormData({
                nombre: '',
                descripcion: ''
            });

        }

        setOpen(true);
        setError('');

    };

    const handleClose = () => {

        setOpen(false);
        setEditingCategory(null);
        setError('');

    };

    const handleSubmit = async () => {

        try {

            setLoading(true);
            setError('');

            if (editingCategory) {

                await api.put(`/categories/${editingCategory.id_categoria}`, formData);

            } else {

                await api.post('/categories', formData);

            }

            handleClose();
            loadCategories();

        } catch (err: any) {

            setError(err.response?.data?.message || 'Error al guardar categoría');

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id: number) => {

        if (!window.confirm('¿Está seguro de eliminar esta categoría?')) {

            return;

        }

        try {

            await api.delete(`/categories/${id}`);
            loadCategories();

        } catch (err: any) {

            setError(err.response?.data?.message || 'Error al eliminar categoría');

        }

    };

    return (

        <Box sx={{ p: 3 }}>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
            }}>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

                    <IconButton onClick={() => navigate('/dashboard')}>

                        <BackIcon />

                    </IconButton>

                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Categorías
                    </Typography>

                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                    sx={{
                        backgroundColor: '#1976D2',
                        '&:hover': {
                            backgroundColor: '#1565C0'
                        }
                    }}
                >
                    Nueva Categoría
                </Button>

            </Box>

            {error && (

                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>

            )}

            <Card>

                <CardContent>

                    <TableContainer component={Paper}>

                        <Table>

                            <TableHead>

                                <TableRow>

                                    <TableCell><strong>Nombre</strong></TableCell>

                                    <TableCell><strong>Descripción</strong></TableCell>

                                    <TableCell align="center"><strong>Acciones</strong></TableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {categories.map((category) => (

                                    <TableRow key={category.id_categoria}>

                                        <TableCell>{category.nombre}</TableCell>

                                        <TableCell>{category.descripcion}</TableCell>

                                        <TableCell align="center">

                                            <IconButton
                                                color="primary"
                                                onClick={() => handleOpen(category)}
                                            >

                                                <EditIcon />

                                            </IconButton>

                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(category.id_categoria)}
                                            >

                                                <DeleteIcon />

                                            </IconButton>

                                        </TableCell>

                                    </TableRow>

                                ))}

                                {categories.length === 0 && (

                                    <TableRow>

                                        <TableCell colSpan={3} align="center">

                                            <Typography sx={{ py: 3, color: '#757575' }}>
                                                No hay categorías registradas
                                            </Typography>

                                        </TableCell>

                                    </TableRow>

                                )}

                            </TableBody>

                        </Table>

                    </TableContainer>

                </CardContent>

            </Card>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>

                <DialogTitle>

                    {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}

                </DialogTitle>

                <DialogContent>

                    {error && (

                        <Alert severity="error" sx={{ mb: 2, mt: 1 }}>
                            {error}
                        </Alert>

                    )}

                    <TextField
                        fullWidth
                        label="Nombre"
                        margin="normal"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    />

                    <TextField
                        fullWidth
                        label="Descripción"
                        margin="normal"
                        multiline
                        rows={3}
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    />

                </DialogContent>

                <DialogActions>

                    <Button onClick={handleClose}>
                        Cancelar
                    </Button>

                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={loading}
                        sx={{
                            backgroundColor: '#1976D2',
                            '&:hover': {
                                backgroundColor: '#1565C0'
                            }
                        }}
                    >

                        {loading ? 'Guardando...' : 'Guardar'}

                    </Button>

                </DialogActions>

            </Dialog>

        </Box>

    );

}