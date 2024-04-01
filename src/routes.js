import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/admin/dashboard';
import Produtos from './pages/admin/produtos';
import ProdutosEditar from './pages/admin/produtos/produtos.editar';
import ProdutosCadastrar from './pages/admin/produtos/produtos.cadastrar';
import UsuariosListagem from './pages/admin/usuarios';
import UsuarioEditar from './pages/admin/usuarios/usuarios.editar';
import UsuarioCadastrar from './pages/admin/usuarios/usuarios.cadastrar';
import Home from './pages/client/home';
import ProdutoDetails from './pages/client/produtos/produtos.details';
import SignIn from './pages/admin/login';
import PrivateRoute from './services/wAuth';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/produtos/:idProduto' element={<ProdutoDetails />} />
        <Route path='/admin' element={<Dashboard />} />
        <Route path='/admin/login' element={<SignIn />} />
        <Route path='/admin/produtos' element={<Produtos />} />
        <Route
          path='/admin/produtos/cadastrar'
          element={<ProdutosCadastrar />}
        />
        <Route
          path='/admin/produtos/editar/:idProduto'
          element={<ProdutosEditar />}
        />
        <Route path='/admin/usuarios' element={<UsuariosListagem />} />
        {/* <Route
          path='/admin/usuarios/*'
          element={
            <PrivateRoute>
              <Route element={<UsuariosListagem />} />
            </PrivateRoute>
          } 
        /> */}
        <Route
          path='/admin/usuarios/cadastrar'
          element={<UsuarioCadastrar />}
        />
        <Route
          path='/admin/usuarios/editar/:idUsuario'
          element={<UsuarioEditar />}
        />
      </Routes>
    </BrowserRouter>
  );
}
