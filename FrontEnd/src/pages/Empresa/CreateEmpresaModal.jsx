import React, { useState } from 'react';

function CreateEmpresaModal({ onClose }) {
  const [nombre, setNombre] = useState('');
  const [ruc, setRuc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar empresa
    console.log('Empresa creada:', { nombre, ruc });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-bold mb-4">Crear Empresa</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Nombre de la Empresa</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full      rounded p-2"
              placeholder="Ej: Peru Controls"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">RUC</label>
            <input
              type="text"
              value={ruc}
              onChange={(e) => setRuc(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Ej: 12345678901"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEmpresaModal;
