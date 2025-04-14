import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const partes = [
  { id: 1, nombre: 'Sensor de presión' },
  { id: 2, nombre: 'Válvula de control' },
];

function ParteTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white  rounded-md shadow">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-3 ">ID</th>
            <th className="px-4 py-3 ">Nombre</th>
            <th className="px-4 py-3  text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {partes.map((p) => (
            <tr key={p.id} className=" hover:bg-gray-100">
              <td className="px-4 py-3 ">{p.id}</td>
              <td className="px-4 py-3 ">{p.nombre}</td>
              <td className="px-4 py-3  flex justify-center gap-3">
                <button className="p-2 rounded  hover:bg-blue-100 text-blue-900"><FiEdit2 /></button>
                <button className="p-2 rounded  hover:bg-red-100 text-red-600"><FiTrash2 /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ParteTable;
