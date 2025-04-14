import React, { useState } from 'react';
import SistemaParteTable from './SistemaParteTable';
import CreateSistemaParteModal from './CreateSistemaParteModal';

function SistemaParteHome() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">RELACIONES SISTEMA PARTE</h1>
        <button onClick={() => setShowModal(true)} className="bg-blue-900 text-white px-5 py-2 rounded shadow hover:bg-blue-800">
          + Relacionar
        </button>
      </div>

      <SistemaParteTable />

      {showModal && <CreateSistemaParteModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default SistemaParteHome;
