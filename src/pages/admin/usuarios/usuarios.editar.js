import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

import MenuAdmin from '../../../components/menu-admin.js';
import Copyright from '../../../components/footerCopyright.js';
import api from '../../../services/api.js';

import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';

const defaultTheme = createTheme();

export default function UsuarioEditar() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('');
  const [senha, setSenha] = useState('');

  const { idUsuario } = useParams();

  useEffect(() => {
    async function getusuario() {
      var response = await api.get('/api/usuarios.details/' + idUsuario);
      setNome(response.data.nome_usuario);
      setEmail(response.data.email_usuario);
      setTipo(response.data.tipo_usuario);
      setSenha(response.data.senha_usuario);
    }
    getusuario();
  }, []);

  async function handleSubmit() {
    const data = {
      nome_usuario: nome,
      email_usuario: email,
      tipo_usuario: tipo,
      senha_usuario: senha,
      _id: idUsuario,
    };
    const response = await api.put('/api/usuarios', data);

    if (response.status === 200) {
      window.location.href = '/admin/usuarios';
    } else {
      alert('Erro ao cadastrar');
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <MenuAdmin title={'USUÁRIOS'} />
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
                <Paper style={{ padding: '20px' }}>
                  <h2>Formulário de cadastro</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        id='nome'
                        name='nome'
                        label='Nome Completo'
                        fullWidth
                        autoComplete='nome'
                        variant='standard'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id='email'
                        name='email'
                        label='e-mail'
                        fullWidth
                        autoComplete='e-mail'
                        variant='standard'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl variant='standard' fullWidth>
                        <InputLabel id='labelTipo'>Tipo</InputLabel>
                        <Select
                          labelId='labelTipo'
                          id='tipo'
                          label='Tipo'
                          value={tipo}
                          onChange={(e) => setTipo(e.target.value)}
                        >
                          <MenuItem value={1}>Administrador</MenuItem>
                          <MenuItem value={2}>Funcionário</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        type='password'
                        required
                        id='senha'
                        name='senha'
                        label='senha'
                        fullWidth
                        autoComplete='senha'
                        variant='standard'
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Button variant='contained' onClick={handleSubmit}>
                        <UpdateIcon style={{ marginRight: 5 }} />
                        Atualizar
                      </Button>
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
