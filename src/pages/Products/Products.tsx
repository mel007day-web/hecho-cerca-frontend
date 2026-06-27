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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Alert,
    Chip
} from '@mui/material';

import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    ArrowBack as BackIcon
} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

import api from '../../services/api';

interface Product {
    id_producto: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    id_categoria: number;
    id_productor: number;
    categoria_nombre?: string;
    productor_nombre?: string;
}

interface Category {
    id_categoria: number;
    nombre: string;
}

interface Producer {
    id_productor: number;
    nombre_usuario: string;
}

export default function Products() {

    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [producers, setProducers] = useState<Producer[]>([]);
    const [open, setOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        id_categoria: '',
        id_productor: ''
    });

    useEffect(() => {

        loadProducts();
        loadCategories();
        loadProducers();

    }, []);

    const loadProducts = async () => {

        try {

            const response = await api.get('/products');
            setProducts(response.data.data);

        } catch (err) {

            setError('Error al cargar productos');

        }

    };

    const loadCategories = async () => {

        try {

            const response = await api.get('/categories');
            setCategories(response.data.data);

        } catch (err) {

            console.error('Error al cargar categorías');

        }

    };

    const loadProducers = async () => {

        try {

            const response = await api.get('/producers');
            setProducers(response.data.data);

        } catch (err) {

            console.error('Error al cargar productores');

        }

    };

    const handleOpen = (product?: Product) => {

        if (product) {

            setEditingProduct(product);

            setFormData({
                nombre: product.nombre,
                descripcion: product.descripcion,
                precio: product.precio.toString(),
                stock: product.stock.toString(),
                id_categoria: product.id_categoria.toString(),
                id_productor: product.id_productor.toString()
            });

        } else {

            setEditingProduct(null);

            setFormData({
                nombre: '',
                descripcion: '',
                precio: '',
                stock: '',
                id_categoria: '',
                id_productor: ''
            });

        }

        setOpen(true);
        setError('');

    };

    const handleClose = () => {

        setOpen(false);
        setEditingProduct(null);
        setError('');

    };

    const handleSubmit = async () => {

        try {

            setLoading(true);
            setError('');

            const data = {
                ...formData,
                precio: Number(formData.precio),
                stock: Number(formData.stock),
                id_categoria: Number(formData.id_categoria),
                id_productor: Number(formData.id_productor)
            };

            if (editingProduct) {

                await api.put(`/products/${editingProduct.id_producto}`, data);

            } else {

                await api.post('/products', data);

            }

            handleClose();
            loadProducts();

        } catch (err: any) {

            setError(err.response?.data?.message || 'Error al guardar producto');

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id: number) => {

        if (!window.confirm('¿Está seguro de eliminar este producto?')) {

            return;

        }

        try {

            await api.delete(`/products/${id}`);
            loadProducts();

        } catch (err: any) {

            setError(err.response?.data?.message || 'Error al eliminar producto');

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
                        Productos
                    </Typography>

                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                    sx={{
                        backgroundColor: '#2E7D32',
                        '&:hover': {
                            backgroundColor: '#1B5E20'
                        }
                    }}
                >
                    Nuevo Producto
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

                                    <TableCell><strong>Categoría</strong></TableCell>

                                    <TableCell><strong>Productor</strong></TableCell>

                                    <TableCell><strong>Precio</strong></TableCell>

                                    <TableCell><strong>Stock</strong></TableCell>

                                    <TableCell align="center"><strong>Acciones</strong></TableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {products.map((product) => (

                                    <TableRow key={product.id_producto}>

                                        <TableCell>{product.nombre}</TableCell>

                                        <TableCell>

                                            <Chip
                                                label={product.categoria_nombre || 'Sin categoría'}
                                                size="small"
                                                color="primary"
                                                variant="outlined"
                                            />

                                        </TableCell>

                                        <TableCell>{product.productor_nombre || 'N/A'}</TableCell>

                                        <TableCell>${product.precio.toFixed(2)}</TableCell>

                                        <TableCell>

                                            <Chip
                                                label={product.stock}
                                                size="small"
                                                color={product.stock > 0 ? 'success' : 'error'}
                                            />

                                        </TableCell>

                                        <TableCell align="center">

                                            <IconButton
                                                color="primary"
                                                onClick={() => handleOpen(product)}
                                            >

                                                <EditIcon />

                                            </IconButton>

                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(product.id_producto)}
                                            >

                                                <DeleteIcon />

                                            </IconButton>

                                        </TableCell>

                                    </TableRow>

                                ))}

                                {products.length === 0 && (

                                    <TableRow>

                                        <TableCell colSpan={6} align="center">

                                            <Typography sx={{ py: 3, color: '#757575' }}>
                                                No hay productos registrados
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

                    {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}

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

                    <TextField
                        fullWidth
                        label="Precio"
                        type="number"
                        margin="normal"
                        value={formData.precio}
                        onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                    />

                    <TextField
                        fullWidth
                        label="Stock"
                        type="number"
                        margin="normal"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    />

                    <FormControl fullWidth margin="normal">

                        <InputLabel>Categoría</InputLabel>

                        <Select
                            value={formData.id_categoria}
                            label="Categoría"
                            onChange={(e) => setFormData({ ...formData, id_categoria: e.target.value })}
                        >

                            {categories.map((category) => (

                                <MenuItem key={category.id_categoria} value={category.id_categoria}>

                                    {category.nombre}

                                </MenuItem>

                            ))}

                        </Select>

                    </FormControl>

                    <FormControl fullWidth margin="normal">

                        <InputLabel>Productor</InputLabel>

                        <Select
                            value={formData.id_productor}
                            label="Productor"
                            onChange={(e) => setFormData({ ...formData, id_productor: e.target.value })}
                        >

                            {producers.map((producer) => (

                                <MenuItem key={producer.id_productor} value={producer.id_productor}>

                                    {producer.nombre_usuario}

                                </MenuItem>

                            ))}

                        </Select>

                    </FormControl>

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
                            backgroundColor: '#2E7D32',
                            '&:hover': {
                                backgroundColor: '#1B5E20'
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