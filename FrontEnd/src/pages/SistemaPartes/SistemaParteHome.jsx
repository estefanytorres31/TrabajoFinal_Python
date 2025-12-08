import React, { useEffect, useState } from 'react';
import SistemaParteTable from './SistemaParteTable';
import CreateSistemaParteModal from './CreateSistemaParteModal';

import ModalSuccess from '../../components/ModalSucess';
import ModalError from '../../components/ModalError';

import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';

import {
  getRelacionesSistemaParte,
  deleteRelacionSistemaParte,
} from '../../api/sistemaParte';

function SistemaParteHome() {
  const [showModal, setShowModal] = useState(false);
  const [sistemaParteToEdit, setSistemaParteToEdit] = useState(null);
  const [sistemaPartes, setSistemaPartes] = useState([]);
  const [modalSuccess, setModalSuccess] = useState(null);
  const [modalError, setModalError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const fetchSistemaPartes = async () => {
    try {
      const res = await getRelacionesSistemaParte();
      const activos = res.data.filter((item) => item.estado === true);
      setSistemaPartes(activos);
    } catch {
      setModalError('Error al obtener relaciones sistema-parte.');
    }
  };

  useEffect(() => {
    fetchSistemaPartes();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteRelacionSistemaParte(idToDelete);
      setModalSuccess('Relación eliminada correctamente.');
      fetchSistemaPartes();
    } catch {
      setModalError('Error al eliminar relación.');
    } finally {
      setIdToDelete(null);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">SISTEMA PARTE</h1>
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
        onDelete={(id) => {
          setIdToDelete(id);
          setShowDeleteModal(true);
        }}
      />

      {(showModal || sistemaParteToEdit) && (
        <CreateSistemaParteModal
          sistemaParteToEdit={sistemaParteToEdit}
          onClose={() => {
            setShowModal(false);
            setSistemaParteToEdit(null);
            fetchSistemaPartes();
          }}
          onSuccess={(msg) => setModalSuccess(msg)}
          onError={(msg) => setModalError(msg)}
        />
      )}

      {showDeleteModal && (
        <ConfirmDeleteModal
          mensaje="¿Deseas eliminar esta relación sistema-parte?"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}

      {modalSuccess && (
        <ModalSuccess
          mensaje={modalSuccess}
          onClose={() => setModalSuccess(null)}
        />
      )}

      {modalError && (
        <ModalError
          mensaje={modalError}
          onClose={() => setModalError(null)}
        />
      )}
    </div>
  );
}

export default SistemaParteHome;
