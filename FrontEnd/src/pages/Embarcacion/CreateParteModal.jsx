import React, { useState } from 'react';

function CreateParteModal({ onClose }) {
  const [nombre, setNombre] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // lógica para guardar
    console.log('Parte guardada:', nombre);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-bold mb-4">Crear Parte</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Nombre de la Parte</label>
          <textarea
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border rounded p-2 mb-4 resize-none"
            placeholder="Nombre de la Parte"
            required
          ></textarea>
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

export default CreateParteModal;
