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

import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';

const defaultTheme = createTheme();
export default function ProdutosEditar() {
  const [nome, setNome_produto] = useState('');
  const [descricao, setDescricao_produto] = useState('');
  const [preco, setPreco_produto] = useState('');
  const [quantidade, setQtd_produto] = useState('');

  const { idProduto } = useParams();
  useEffect(() => {
    async function getusuario() {
      var response = await api.get('/api/produtos/' + idProduto);
      setNome_produto(response.data.nome_produto);
      setDescricao_produto(response.data.descricao_produto);
      setPreco_produto(response.data.preco_produto);
      setQtd_produto(response.data.qtd_produto);
    }
    getusuario();
  }, []);

  async function handleSubmit() {
    const data = {
      nome_produto: nome,
      descricao_produto: descricao,
      preco_produto: preco,
      qtd_produto: quantidade,
      _id: idProduto,
    };
    const response = await api.put('/api/produtos', data);

    if (response.status === 200) {
      window.location.href = '/admin/produtos';
    } else {
      alert('Erro ao cadastrar');
    }
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <MenuAdmin title={'PRODUTOS EDITAR'} />
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
                  <h2>Formulário de edição de produtos</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        id='nome'
                        name='nome'
                        label='Nome do produto'
                        fullWidth
                        autoComplete='nome'
                        variant='standard'
                        value={nome}
                        onChange={(e) => setNome_produto(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id='descricao'
                        name='descricao'
                        label='Descrição'
                        fullWidth
                        variant='standard'
                        value={descricao}
                        onChange={(e) => setDescricao_produto(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id='preco'
                        name='preco'
                        label='Preço do produto'
                        fullWidth
                        autoComplete='preco'
                        variant='standard'
                        value={preco}
                        onChange={(e) => setPreco_produto(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id='quantidade'
                        name='quantidade'
                        label='quantidade'
                        fullWidth
                        autoComplete='quantidade'
                        variant='standard'
                        value={quantidade}
                        onChange={(e) => setQtd_produto(e.target.value)}
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
