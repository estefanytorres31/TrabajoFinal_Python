import React, { useState } from 'react';
import PartTable from './PartTable';
import CreateParteModal from './CreateParteModal';

function EmbarcacionHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">PARTES REGISTRADAS</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0d1e4c] text-white px-5 py-2 rounded shadow hover:bg-blue-800 transition"
        >
          + Crear Parte
        </button>
      </div>
      

      <PartTable />

      {isModalOpen && <CreateParteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default EmbarcacionHome;
