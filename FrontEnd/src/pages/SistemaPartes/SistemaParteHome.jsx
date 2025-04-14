import React, { useEffect, useState } from 'react';
import SistemaParteTable from './SistemaParteTable';
import CreateSistemaParteModal from './CreateSistemaParteModal';

import {
  getRelacionesSistemaParte,
  deleteRelacionSistemaParte,
} from '../../api/sistemaParte';

function SistemaParteHome() {
  const [showModal, setShowModal] = useState(false);
  const [sistemaParteToEdit, setSistemaParteToEdit] = useState(null);
  const [sistemaPartes, setSistemaPartes] = useState([]);

  const fetchSistemaPartes = async () => {
    try {
      const res = await getRelacionesSistemaParte();
      const activos = res.data.filter((item) => item.estado === true);
      setSistemaPartes(activos);
    } catch (error) {
      console.error('Error al obtener relaciones sistema-parte:', error);
    }
  };

  useEffect(() => {
    fetchSistemaPartes();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('¿Seguro que deseas eliminar esta relación?');
    if (!confirm) return;

    try {
      await deleteRelacionSistemaParte(id);
      fetchSistemaPartes();
    } catch (error) {
      console.error('Error al eliminar relación:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Relaciones Sistema - Parte</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-900 text-white px-5 py-2 rounded shadow hover:bg-blue-800"
        >
          + Relacionar
        </button>
      </div>

      <SistemaParteTable
        sistemaPartes={sistemaPartes}
        onEdit={(item) => {
          setSistemaParteToEdit(item);
          setShowModal(true);
        }}
        onDelete={handleDelete}
      />

      {(showModal || sistemaParteToEdit) && (
        <CreateSistemaParteModal
          sistemaParteToEdit={sistemaParteToEdit}
          onClose={() => {
            setShowModal(false);
            setSistemaParteToEdit(null);
            fetchSistemaPartes();
          }}
        />
      )}
    </div>
  );
}

export default SistemaParteHome;
