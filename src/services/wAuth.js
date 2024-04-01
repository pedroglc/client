import React, { Component, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import api from './api';
import { login, logout, getToken } from './auth';
import UsuariosListagem from '../pages/admin/usuarios';

const WAuth = ({ element: Element, ...rest }) => {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verificar() {
      try {
        const res = await api.get('/api/usuarios/checktoken', {
          params: { token: getToken() },
        });

        if (res.data.status === 200) {
          setLoading(false);
          setRedirect(false);
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
    verificar();
  }, []);

  return loading ? (
    'Carregando...'
  ) : redirect ? (
    <Navigate to='/admin/login' />
  ) : (
    <Routes {...rest}>
      <Route {...rest} render={(props) => <Element {...props} />} />
      {console.log('entrou no routes do wauth.js')}
    </Routes>
  );

  // loading ? (
  //   'Carregando...'
  // ) : (
  //   <Routes>
  //     <Route
  //       {...rest}
  //       render={(props) =>
  //         !redirect ? <Element {...props} /> : <Navigate to='/admin/login' />
  //       }
  //     />
  //   </Routes>
  // );
};

export default WAuth;
