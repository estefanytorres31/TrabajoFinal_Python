import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const empresas = [
  { id: 'E001', nombre: 'Peru Controls', ruc: '12345678901' },
  { id: 'E002', nombre: 'Global Tech', ruc: '10987654321' },
];

function EmpresaTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white  rounded-md shadow">
        <thead className="bg-[#0d1e4c] text-white">
          <tr>
            <th className="px-4 py-3 text-left ">🆔 ID</th>
            <th className="px-4 py-3 text-left ">🏢 Nombre</th>
            <th className="px-4 py-3 text-left ">🔢 RUC</th>
            <th className="px-4 py-3 text-center ">⚙️ Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa) => (
            <tr key={empresa.id} className=" hover:bg-gray-100">
              <td className="px-4 py-3 ">{empresa.id}</td>
              <td className="px-4 py-3 ">{empresa.nombre}</td>
              <td className="px-4 py-3 ">{empresa.ruc}</td>
              <td className="px-4 py-3  flex justify-center gap-3">
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

export default EmpresaTable;
