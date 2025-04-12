import React, { useState } from 'react';
import UsuarioTable from './UsuarioTable';
import CreateUsuarioModal from './CreateUsuarioModal';

function UsuarioHome() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">USUARIOS REGISTRADOS</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#0d1e4c] text-white px-5 py-2 rounded shadow hover:bg-blue-800 transition"
        >
          + Crear Usuario
        </button>
      </div>

      <UsuarioTable />

      {showModal && <CreateUsuarioModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default UsuarioHome;
