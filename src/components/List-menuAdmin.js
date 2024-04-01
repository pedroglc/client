import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { getToken, logout } from '../services/auth';
import api from '../services/api';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component='a' href='/admin'>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary='Dashboard' />
    </ListItemButton>

    <ListItemButton component='a' href='/admin/usuarios'>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary='Usuários' />
    </ListItemButton>

    <ListItemButton component='a' href='/admin/produtos'>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary='Produtos' />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component='div' inset>
      Opções
    </ListSubheader>
    <ListItemButton onClick={confirmSair}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary='Sair' />
    </ListItemButton>
  </React.Fragment>
);

async function confirmSair() {
  if (window.confirm('Deseja realmente sair do sistema?')) {
    const response = await api.get('/api/usuarios/destroytoken', {
      headers: { token: getToken() },
    });
    if (response.status === 200) {
      logout();
      window.location.href = '/admin/login';
    } else {
      alert('não foi possivel fazer o logout');
    }
  }
}
