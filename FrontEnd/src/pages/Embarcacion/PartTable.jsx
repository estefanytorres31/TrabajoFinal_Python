import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const parts = [
  { id: '0096', name: 'Programación y configuración de adaptador' },
  { id: '0095', name: 'Instalación de adaptador de comunicación' },
  { id: '0094', name: 'Instalación de equipos y sensores' },
  // ... puedes reemplazar esto por props o datos de backend
];

function PartTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-50 rounded-md shadow">
        <thead className="bg-[#0d1e4c] text-white">
          <tr>
            <th className="px-4 py-3 text-left">🔒 ID</th>
            <th className="px-4 py-3 text-left">🔧 Nombre</th>
            <th className="px-4 py-3 text-center">⚙️ Acciones</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part.id} className="    hover:bg-gray-100">
              <td className="px-4 py-3">{part.id}</td>
              <td className="px-4 py-3">{part.name}</td>
              <td className="px-4 py-3 flex justify-center gap-3">
                <button className="bg-white  p-2 rounded shadow hover:bg-blue-100 text-blue-900">
                  <FiEdit2 />
                </button>
                <button className="bg-white  p-2 rounded shadow hover:bg-red-100 text-red-600">
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

export default PartTable;
