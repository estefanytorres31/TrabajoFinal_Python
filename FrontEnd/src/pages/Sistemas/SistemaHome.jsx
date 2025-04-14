import React, { useState } from 'react';
import SistemaTable from './SistemaTable';
import CreateSistemaModal from './CreateSistemaModal';

function SistemaHome() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Sistemas Registrados</h1>
        <button onClick={() => setShowModal(true)} className="bg-blue-900 text-white px-5 py-2 rounded shadow hover:bg-blue-800">
          + Crear Sistema
        </button>
      </div>

      <SistemaTable />

      {showModal && <CreateSistemaModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default SistemaHome;
