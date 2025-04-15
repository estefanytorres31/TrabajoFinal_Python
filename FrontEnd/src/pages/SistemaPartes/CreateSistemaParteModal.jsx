import React, { useEffect, useState } from 'react';
import {
  createRelacionSistemaParte,
  updateRelacionSistemaParte,
} from '../../api/sistemaParte';
import { getSistemas } from '../../api/sistema';
import { getPartes } from '../../api/parte';

function CreateSistemaParteModal({ onClose, sistemaParteToEdit, onSuccess, onError }) {
  const isEdit = !!sistemaParteToEdit;

  const [idSistema, setIdSistema] = useState('');
  const [idParte, setIdParte] = useState('');
  const [sistemas, setSistemas] = useState([]);
  const [partes, setPartes] = useState([]);

  useEffect(() => {
    if (isEdit) {
      setIdSistema(sistemaParteToEdit.id_sistema);
      setIdParte(sistemaParteToEdit.id_parte);
    } else {
      setIdSistema('');
      setIdParte('');
    }
  }, [sistemaParteToEdit]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resSistemas = await getSistemas();
        const resPartes = await getPartes();
        setSistemas(resSistemas.data.filter((s) => s.estado));
        setPartes(resPartes.data.filter((p) => p.estado));
      } catch (error) {
        onError('Error al cargar sistemas o partes.');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id_sistema: parseInt(idSistema),
      id_parte: parseInt(idParte),
      estado: true,
    };

    try {
      if (isEdit) {
        await updateRelacionSistemaParte(sistemaParteToEdit.id_sistema_parte, data);
        onSuccess('Relación actualizada correctamente.');
      } else {
        await createRelacionSistemaParte(data);
        onSuccess('Relación creada correctamente.');
      }
      onClose();
    } catch (error) {
      if (error.response?.status === 400) {
        onError('Esta relación ya existe.');
      } else {
        onError('Error al guardar relación.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-bold mb-4">
          {isEdit ? 'Editar Relación' : 'Crear Relación'}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-1 text-sm font-medium">Sistema</label>
          <select
            value={idSistema}
            onChange={(e) => setIdSistema(e.target.value)}
            className="w-full border rounded p-2 mb-4"
            required
          >
            <option value="">Seleccione un sistema</option>
            {sistemas.map((s) => (
              <option key={s.id_sistema} value={s.id_sistema}>
                {s.nombre_sistema}
              </option>
            ))}
          </select>

          <label className="block mb-1 text-sm font-medium">Parte</label>
          <select
            value={idParte}
            onChange={(e) => setIdParte(e.target.value)}
            className="w-full border rounded p-2 mb-4"
            required
          >
            <option value="">Seleccione una parte</option>
            {partes.map((p) => (
              <option key={p.id_parte} value={p.id_parte}>
                {p.nombre_parte}
              </option>
            ))}
          </select>

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
              {isEdit ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSistemaParteModal;
