import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuAdmin from '../../../components/menu-admin.js';
import imgAdmin from '../../../assets/imgAdmin.jpg';
import Copyright from '../../../components/footerCopyright.js';

const defaultTheme = createTheme();

export default function Dashboard() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <MenuAdmin title={'DASHBOARD'} />
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
              <img
                src={imgAdmin}
                alt='Descrição da imagem'
                style={{
                  width: '70%', // A imagem ocupará 100% da largura do contêiner pai
                  height: '70vh', // A imagem ocupará 100% da altura da tela
                  objectFit: 'cover', // A imagem manterá sua proporção, cobrindo toda a área disponível
                  margin: '0 auto',
                }}
              />
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
