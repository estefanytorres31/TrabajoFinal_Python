import React, { useState } from 'react';
import ParteTable from './ParteTable';
import CreateParteModal from './CreateParteModal';

function ParteHome() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Partes Registradas</h1>
        <button onClick={() => setShowModal(true)} className="bg-blue-900 text-white px-5 py-2 rounded shadow hover:bg-blue-800">
          + Crear Parte
        </button>
      </div>

      <ParteTable />

      {showModal && <CreateParteModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default ParteHome;
