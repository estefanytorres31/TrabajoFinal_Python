import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

const relaciones = [
  { id: 1, sistema: 'Navegación', parte: 'GPS' },
  { id: 2, sistema: 'Combustible', parte: 'Sensor de presión' },
];

function SistemaParteTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white  rounded-md shadow">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-3 ">ID</th>
            <th className="px-4 py-3 ">Sistema</th>
            <th className="px-4 py-3 ">Parte</th>
            <th className="px-4 py-3  text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {relaciones.map((r) => (
            <tr key={r.id} className=" hover:bg-gray-100">
              <td className="px-4 py-3 ">{r.id}</td>
              <td className="px-4 py-3 ">{r.sistema}</td>
              <td className="px-4 py-3 ">{r.parte}</td>
              <td className="px-4 py-3  flex justify-center gap-3">
                <button className="p-2 rounded  hover:bg-red-100 text-red-600"><FiTrash2 /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SistemaParteTable;
