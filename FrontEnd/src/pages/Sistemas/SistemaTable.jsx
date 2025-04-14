import React, { useEffect, useState } from 'react';
import { getSistemas } from '../../api/sistema';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

function SistemaTable() {
  const [sistemas, setSistemas] = useState([]);

  useEffect(() => {
    getSistemas()
      .then((res) => {
        setSistemas(res.data); // <-- res.data es el array de sistemas
      })
      .catch((err) => {
        console.error('Error al listar sistemas:', err);
      });
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-md shadow">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-3 border">ID</th>
            <th className="px-4 py-3 border">Nombre</th>
            <th className="px-4 py-3 border">Descripción</th>
            <th className="px-4 py-3 border">Estado</th>
            <th className="px-4 py-3 border text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sistemas.map((s) => (
            <tr key={s.id_sistema} className="border-b hover:bg-gray-100">
              <td className="px-4 py-3 border">{s.id_sistema}</td>
              <td className="px-4 py-3 border">{s.nombre_sistema}</td>
              <td className="px-4 py-3 border">{s.descripcion}</td>
              <td className="px-4 py-3 border">
                {s.estado ? 'Activo' : 'Inactivo'}
              </td>
              <td className="px-4 py-3 border flex justify-center gap-3">
                <button className="p-2 rounded border hover:bg-blue-100 text-blue-900">
                  <FiEdit2 />
                </button>
                <button className="p-2 rounded border hover:bg-red-100 text-red-600">
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SistemaTable;
