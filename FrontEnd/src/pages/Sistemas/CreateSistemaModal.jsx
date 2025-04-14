import React, { useEffect, useState } from 'react';
import { createSistema, updateSistema } from '../../api/sistema';

function CreateSistemaModal({ onClose, sistemaToEdit }) {
  const isEdit = !!sistemaToEdit;

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (isEdit) {
      setNombre(sistemaToEdit.nombre_sistema);
      setDescripcion(sistemaToEdit.descripcion);
    } else {
      setNombre('');
      setDescripcion('');
    }
  }, [sistemaToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nombre_sistema: nombre,
      descripcion,
      estado: true, // 🔥 siempre true
    };

    try {
      if (isEdit) {
        await updateSistema(sistemaToEdit.id_sistema, data);
      } else {
        await createSistema(data);
      }

      onClose();
    } catch (error) {
      console.error('Error al guardar sistema:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-bold mb-4">
          {isEdit ? 'Editar Sistema' : 'Crear Sistema'}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-1 text-sm font-medium">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border rounded p-2 mb-4"
            required
          />

          <label className="block mb-1 text-sm font-medium">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full border rounded p-2 mb-4"
            rows={3}
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

export default CreateSistemaModal;
