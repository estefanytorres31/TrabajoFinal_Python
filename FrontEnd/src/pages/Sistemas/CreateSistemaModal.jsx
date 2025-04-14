import React, { useState } from 'react';

function CreateSistemaModal({ onClose }) {
  const [nombre, setNombre] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Crear sistema:', nombre);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-bold mb-4">Crear Sistema</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-1 text-sm font-medium">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border rounded p-2 mb-4"
            required
          />
          <div className="flex justify-end gap-3">
            <button onClick={onClose} type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSistemaModal;
