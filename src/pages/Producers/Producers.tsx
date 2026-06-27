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
    Alert,
    Chip
} from '@mui/material';

import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    ArrowBack as BackIcon,
    Person as PersonIcon
} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

import api from '../../services/api';

interface Producer {
    id_productor: number;
    nombre_completo: string;
    nombre_finca: string;
    correo: string;
    telefono: string;
    direccion: string;
    descripcion: string;
    fecha_registro: string;
}

export default function Producers() {

    const navigate = useNavigate();

    const [producers, setProducers] = useState<Producer[]>([]);
    const [open, setOpen] = useState(false);
    const [editingProducer, setEditingProducer] = useState<Producer | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        nombre_completo: '',
        nombre_finca: '',
        correo: '',
        telefono: '',
        direccion: '',
        descripcion: '',
        contrasena: ''
    });

    useEffect(() => {

        loadProducers();

    }, []);

    const loadProducers = async () => {

        try {

            const response = await api.get('/producers');
            setProducers(response.data.data);

        } catch (err) {

            setError('Error al cargar productores');

        }

    };

    const handleOpen = (producer?: Producer) => {

        if (producer) {

            setEditingProducer(producer);

            setFormData({
                nombre_completo: producer.nombre_completo,
                nombre_finca: producer.nombre_finca,
                correo: producer.correo,
                telefono: producer.telefono,
                direccion: producer.direccion,
                descripcion: producer.descripcion,
                contrasena: ''
            });

        } else {

            setEditingProducer(null);

            setFormData({
                nombre_completo: '',
                nombre_finca: '',
                correo: '',
                telefono: '',
                direccion: '',
                descripcion: '',
                contrasena: ''
            });

        }

        setOpen(true);
        setError('');

    };

    const handleClose = () => {

        setOpen(false);
        setEditingProducer(null);
        setError('');

    };

    const handleSubmit = async () => {

        try {

            setLoading(true);
            setError('');

            const data = {
                ...formData,
                contrasena: formData.contrasena || undefined
            };

            if (editingProducer) {

                await api.put(`/producers/${editingProducer.id_productor}`, data);

            } else {

                await api.post('/producers', data);

            }

            handleClose();
            loadProducers();

        } catch (err: any) {

            setError(err.response?.data?.message || 'Error al guardar productor');

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id: number) => {

        if (!window.confirm('¿Está seguro de eliminar este productor?')) {

            return;

        }

        try {

            await api.delete(`/producers/${id}`);
            loadProducers();

        } catch (err: any) {

            setError(err.response?.data?.message || 'Error al eliminar productor');

        }

    };

    const formatDate = (dateString: string) => {

        const date = new Date(dateString);

        return date.toLocaleDateString('es-ES', {

            year: 'numeric',
            month: 'long',
            day: 'numeric'

        });

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
                        Productores
                    </Typography>

                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                    sx={{
                        backgroundColor: '#ED6C02',
                        '&:hover': {
                            backgroundColor: '#D84315'
                        }
                    }}
                >
                    Nuevo Productor
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

                                    <TableCell><strong>Correo</strong></TableCell>

                                    <TableCell><strong>Teléfono</strong></TableCell>

                                    <TableCell><strong>Dirección</strong></TableCell>

                                    <TableCell><strong>Fecha Registro</strong></TableCell>

                                    <TableCell align="center"><strong>Acciones</strong></TableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {producers.map((producer) => (

                                    <TableRow key={producer.id_productor}>

                                        <TableCell>

                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                                                <PersonIcon sx={{ color: '#ED6C02' }} />

                                                {producer.nombre_completo}

                                            </Box>

                                        </TableCell>

                                        <TableCell>{producer.correo}</TableCell>

                                        <TableCell>{producer.telefono || 'N/A'}</TableCell>

                                        <TableCell>{producer.direccion || 'N/A'}</TableCell>

                                        <TableCell>

                                            <Chip
                                                label={formatDate(producer.fecha_registro)}
                                                size="small"
                                                variant="outlined"
                                            />

                                        </TableCell>

                                        <TableCell align="center">

                                            <IconButton
                                                color="primary"
                                                onClick={() => handleOpen(producer)}
                                            >

                                                <EditIcon />

                                            </IconButton>

                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(producer.id_productor)}
                                            >

                                                <DeleteIcon />

                                            </IconButton>

                                        </TableCell>

                                    </TableRow>

                                ))}

                                {producers.length === 0 && (

                                    <TableRow>

                                        <TableCell colSpan={6} align="center">

                                            <Typography sx={{ py: 3, color: '#757575' }}>
                                                No hay productores registrados
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

                    {editingProducer ? 'Editar Productor' : 'Nuevo Productor'}

                </DialogTitle>

                <DialogContent>

                    {error && (

                        <Alert severity="error" sx={{ mb: 2, mt: 1 }}>
                            {error}
                        </Alert>

                    )}

                    <TextField
                        fullWidth
                        label="Nombre Completo"
                        margin="normal"
                        value={formData.nombre_completo}
                        onChange={(e) => setFormData({ ...formData, nombre_completo: e.target.value })}
                    />

                    <TextField
                        fullWidth
                        label="Nombre de la Finca"
                        margin="normal"
                        value={formData.nombre_finca}
                        onChange={(e) => setFormData({ ...formData, nombre_finca: e.target.value })}
                    />

                    <TextField
                        fullWidth
                        label="Correo Electrónico"
                        type="email"
                        margin="normal"
                        value={formData.correo}
                        onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    />

                    <TextField
                        fullWidth
                        label="Teléfono"
                        margin="normal"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    />

                    <TextField
                        fullWidth
                        label="Dirección"
                        margin="normal"
                        value={formData.direccion}
                        onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
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
                        label={editingProducer ? 'Nueva Contraseña (dejar vacío para mantener)' : 'Contraseña'}
                        type="password"
                        margin="normal"
                        value={formData.contrasena}
                        onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
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
                            backgroundColor: '#ED6C02',
                            '&:hover': {
                                backgroundColor: '#D84315'
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