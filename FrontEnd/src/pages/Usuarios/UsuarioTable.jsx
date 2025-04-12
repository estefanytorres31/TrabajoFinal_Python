import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const usuarios = [
  { id: 'U001', nombre: 'Cristofer Grimaldo', correo: 'cristopher@perucontrols.com', rol: 'Administrador' },
  { id: 'U002', nombre: 'Lucía Vargas', correo: 'lucia@empresa.com', rol: 'Operador' },
];

function UsuarioTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white  rounded-md shadow">
      <thead className="bg-[#0d1e4c] text-white">
          <tr>
            <th className="px-4 py-3 text-left ">🆔 ID</th>
            <th className="px-4 py-3 text-left ">👤 Nombre</th>
            <th className="px-4 py-3 text-left ">✉️ Correo</th>
            <th className="px-4 py-3 text-left ">🎖 Rol</th>
            <th className="px-4 py-3 text-center ">⚙️ Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className=" hover:bg-gray-100">
              <td className="px-4 py-3 ">{usuario.id}</td>
              <td className="px-4 py-3 ">{usuario.nombre}</td>
              <td className="px-4 py-3 ">{usuario.correo}</td>
              <td className="px-4 py-3 ">{usuario.rol}</td>
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

export default UsuarioTable;
