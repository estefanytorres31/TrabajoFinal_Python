import React, { useEffect, useState } from 'react';
import SistemaTable from './SistemaTable';
import CreateSistemaModal from './CreateSistemaModal';
import { getSistemas } from '../../api/sistema';
import {deleteSistema } from '../../api/sistema';

function SistemaHome() {
  const [showModal, setShowModal] = useState(false);
  const [sistemaToEdit, setSistemaToEdit] = useState(null);
  const [sistemas, setSistemas] = useState([]);

  // 🔄 Función para obtener sistemas desde la API
  const fetchSistemas = async () => {
    try {
      const res = await getSistemas();
      const activos = res.data.filter((s) => s.estado === true);
      setSistemas(activos);
    } catch (err) {
      console.error('Error al obtener sistemas:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('¿Estás seguro de que deseas eliminar este sistema?');
    if (!confirm) return;
  
    try {
      await deleteSistema(id);
      fetchSistemas(); // refrescar la lista
    } catch (error) {
      console.error('Error al eliminar sistema:', error);
    }
  };

  // Se ejecuta al montar el componente
  useEffect(() => {
    fetchSistemas();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">SISTEMAS REGISTRADOS</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-900 text-white px-5 py-2 rounded shadow hover:bg-blue-800"
        >
          + Crear Sistema
        </button>
      </div>

      {/* Lista actualizada */}
      <SistemaTable sistemas={sistemas} 
      onEdit={(s) => {
        setSistemaToEdit(s);
        setShowModal(true);
      }}
      onDelete={handleDelete} // Pasar la función de eliminar
       />

      {/* Modal para crear o editar */}
      {(showModal || sistemaToEdit) && (
        <CreateSistemaModal
          onClose={() => {
            setShowModal(false);
            setSistemaToEdit(null);
            fetchSistemas(); // 🔁 Recargar tabla al cerrar modal
          }}
          sistemaToEdit={sistemaToEdit}
        />
      )}
    </div>
  );
}

export default SistemaHome;
