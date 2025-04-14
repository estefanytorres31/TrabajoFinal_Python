import React, { useEffect, useState } from 'react';
import { createParte, updateParte } from '../../api/parte';

function CreateParteModal({ onClose, parteToEdit }) {
  const isEdit = !!parteToEdit;

  const [nombre, setNombre] = useState('');

  useEffect(() => {
    if (isEdit) {
      setNombre(parteToEdit.nombre_parte);
    } else {
      setNombre('');
    }
  }, [parteToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nombre_parte: nombre,
      estado: true,
    };

    try {
      if (isEdit) {
        await updateParte(parteToEdit.id_parte, data);
      } else {
        await createParte(data);
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar parte:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-bold mb-4">{isEdit ? 'Editar Parte' : 'Crear Parte'}</h2>
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
            <button onClick={onClose} type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800">
              {isEdit ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateParteModal;
