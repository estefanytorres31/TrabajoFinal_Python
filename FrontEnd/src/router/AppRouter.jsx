import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import EmbarcacionHome from '../pages/Embarcacion/EmbarcacionHome';
import EmpresaHome from '../pages/Empresa/EmpresaHome';
import UsuarioHome from '../pages/Usuarios/UsuarioHome';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<EmpresaHome />} />
        <Route path="embarcacion" element={<EmbarcacionHome />} />
        <Route path='usuarios' element={<UsuarioHome />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
