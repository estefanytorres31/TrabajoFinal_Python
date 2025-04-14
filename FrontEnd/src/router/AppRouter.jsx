import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import EmbarcacionHome from '../pages/Embarcacion/EmbarcacionHome';
import EmpresaHome from '../pages/Empresa/EmpresaHome';
import UsuarioHome from '../pages/Usuarios/UsuarioHome';
import SistemaParteHome from '../pages/SistemaPartes/SistemaParteHome';
import ParteHome from '../pages/Partes/ParteHome';
import SistemaHome from '../pages/Sistemas/SistemaHome';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        {/* <Route index element={<EmpresaHome />} />
        <Route path="embarcacion" element={<EmbarcacionHome />} />
        <Route path='usuarios' element={<UsuarioHome />} /> */}
        <Route index element={<SistemaHome />} />
        <Route path='partes' element={<ParteHome />} />
        <Route path='sistema-partes' element={<SistemaParteHome />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
