import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

function SistemaParteTable({ sistemaPartes, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-md shadow">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-3 border">ID</th>
            <th className="px-4 py-3 border">ID Sistema</th>
            <th className="px-4 py-3 border">ID Parte</th>
            <th className="px-4 py-3 border text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sistemaPartes.map((item) => (
            <tr key={item.id_sistema_parte} className="border-b hover:bg-gray-100">
              <td className="px-4 py-3 border">{item.id_sistema_parte}</td>
              <td className="px-4 py-3 border">{item.id_sistema}</td>
              <td className="px-4 py-3 border">{item.id_parte}</td>
              <td className="px-4 py-3 border flex justify-center gap-3">
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 rounded border hover:bg-blue-100 text-blue-900"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => onDelete(item.id_sistema_parte)}
                  className="p-2 rounded border hover:bg-red-100 text-red-600"
                >
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

export default SistemaParteTable;
