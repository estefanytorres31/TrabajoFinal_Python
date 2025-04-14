import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

function SistemaTable({ sistemas, onEdit , onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white  rounded-md shadow">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-3 ">ID</th>
            <th className="px-4 py-3 ">Nombre</th>
            <th className="px-4 py-3 ">Descripción</th>
            <th className="px-4 py-3  text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sistemas.map((s) => (
            <tr key={s.id_sistema} className=" hover:bg-gray-100">
              <td className="px-4 py-3 ">{s.id_sistema}</td>
              <td className="px-4 py-3 ">{s.nombre_sistema}</td>
              <td className="px-4 py-3 ">{s.descripcion}</td>
              <td className="px-4 py-3  flex justify-center gap-3">
                <button
                  onClick={() => onEdit(s)}
                  className="p-2 rounded  hover:bg-blue-100 text-blue-900"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => onDelete(s.id_sistema)}
                  className="p-2 rounded  hover:bg-red-100 text-red-600"
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

export default SistemaTable;
