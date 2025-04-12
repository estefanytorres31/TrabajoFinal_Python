import React, { useState } from 'react';
import EmpresaTable from './EmpresaTable';
import CreateEmpresaModal from './CreateEmpresaModal';

function EmpresaHome() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">EMPRESAS REGISTRADAS</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#0d1e4c] text-white px-5 py-2 rounded shadow hover:bg-blue-800 transition"
        >
          + Crear Empresa
        </button>
      </div>

      <EmpresaTable />

      {showModal && <CreateEmpresaModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default EmpresaHome;
