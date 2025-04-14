import React, { useEffect, useState } from 'react';
import ParteTable from './ParteTable';
import CreateParteModal from './CreateParteModal';
import { getPartes, deleteParte } from '../../api/parte';

function ParteHome() {
  const [showModal, setShowModal] = useState(false);
  const [parteToEdit, setParteToEdit] = useState(null);
  const [partes, setPartes] = useState([]);

  const fetchPartes = async () => {
    try {
      const res = await getPartes();
      const activas = res.data.filter((p) => p.estado === true);
      setPartes(activas);
    } catch (err) {
      console.error('Error al obtener partes:', err);
    }
  };

  useEffect(() => {
    fetchPartes();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('¿Deseas eliminar esta parte?');
    if (!confirm) return;
    try {
      await deleteParte(id);
      fetchPartes();
    } catch (err) {
      console.error('Error al eliminar parte:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">PARTES REGISTRADAS</h1>
        <button onClick={() => setShowModal(true)} className="bg-blue-900 text-white px-5 py-2 rounded shadow hover:bg-blue-800">
          + Crear Parte
        </button>
      </div>

      <ParteTable partes={partes} onEdit={(p) => {
        setParteToEdit(p);
        setShowModal(true);
      }} onDelete={handleDelete} />

      {(showModal || parteToEdit) && (
        <CreateParteModal
          onClose={() => {
            setShowModal(false);
            setParteToEdit(null);
            fetchPartes();
          }}
          parteToEdit={parteToEdit}
        />
      )}
    </div>
  );
}

export default ParteHome;
