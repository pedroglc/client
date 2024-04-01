import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import MenuAdmin from '../../../components/menu-admin.js';
import Copyright from '../../../components/footerCopyright.js';
import api from '../../../services/api.js';
import { login, logout, getToken } from '../../../services/auth.js';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { LinearProgress } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';

const defaultTheme = createTheme();

export default function UsuariosListagem() {
  const [usuarios, setUsuarios] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsuarios() {
      const response = await api.get('/api/usuarios');
      setUsuarios(response.data);
    }
    loadUsuarios();
  }, []);

  useEffect(() => {
    async function verificar() {
      try {
        const res = await api.get('/api/usuarios/checktoken', {
          params: { token: getToken() },
        });

        if (res.data.status === 200) {
          setLoading(false);
          setRedirect(false);
          console.log('Usuário autorizado');
        } else {
          logout();
          setLoading(false);
          setRedirect(true);
        }
      } catch (error) {
        console.error('Erro ao verificar token:', error);
        // Trate o erro conforme necessário
      }
    }
    setTimeout(() => verificar(), 1000);
    //verificar();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir?')) {
      var result = await api.delete('/api/usuarios/' + id);
      if (result.status === 200) {
        window.location.href = '/admin/usuarios';
      } else {
        alert('ocorreu um erro');
      }
    }
  }
  function formatDate(dateString) {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', options);
  }

  return loading ? (
    <LinearProgress />
  ) : redirect ? (
    <Navigate to='/admin/login' />
  ) : (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <MenuAdmin title={'USUARIOS'} />
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <Button
                  variant='contained'
                  color='success'
                  href={'/admin/usuarios/cadastrar'}
                  style={{ marginBottom: 20 }}
                >
                  <AddBoxIcon style={{ marginRight: 5 }} />
                  Cadastrar Novo
                </Button>
                <Paper style={{ padding: '20px' }}>
                  <h2>Listagem de Usuários</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                          <TableHead>
                            <TableRow>
                              <TableCell>Nome</TableCell>
                              <TableCell align='center'>Email</TableCell>
                              <TableCell align='center'>Tipo</TableCell>
                              <TableCell align='center'>Data criação</TableCell>
                              <TableCell align='center'>Opções</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {usuarios.map((row) => (
                              <TableRow
                                key={row._id}
                                sx={{
                                  '&:last-child td, &:last-child th': {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component='th' scope='row'>
                                  {row.nome_usuario}
                                </TableCell>
                                <TableCell align='center'>
                                  {row.email_usuario}
                                </TableCell>
                                <TableCell align='center'>
                                  {row.tipo_usuario === 1 ? (
                                    <Chip
                                      label='Administrador'
                                      color='success'
                                      size='small'
                                      variant='filled'
                                    />
                                  ) : row.tipo_usuario === 2 ? (
                                    <Chip
                                      label='Funcionário'
                                      color='error'
                                      size='small'
                                      variant='filled'
                                    />
                                  ) : row.tipo_usuario === 3 ? (
                                    <Chip
                                      label='Gerente'
                                      color='primary'
                                      size='small'
                                      variant='filled'
                                    />
                                  ) : null}
                                </TableCell>
                                <TableCell align='center'>
                                  {formatDate(row.createdAt)}
                                </TableCell>
                                <TableCell align='center'>
                                  <ButtonGroup
                                    variant='contained'
                                    aria-label='Basic button group'
                                  >
                                    <Button
                                      color='primary'
                                      href={'/admin/usuarios/editar/' + row._id}
                                    >
                                      <ModeEditOutlineIcon
                                        style={{ marginRight: 3 }}
                                      />
                                      Editar
                                    </Button>
                                    <Button
                                      color='secondary'
                                      onClick={() => handleDelete(row._id)}
                                    >
                                      <DeleteForeverIcon
                                        style={{ marginRight: 3 }}
                                      />
                                      Excluir
                                    </Button>
                                  </ButtonGroup>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
