import React, { useEffect, useState } from 'react';
import ParteTable from './ParteTable';
import CreateParteModal from './CreateParteModal';
// import ModalSuccess from '../../components/modals/ModalSuccess';
// import ModalError from '../../components/modals/ModalError';
// import ConfirmDeleteModal from '../../components/modals/ConfirmDeleteModal';
import { getPartes, deleteParte } from '../../api/parte';
import ModalSuccess from '../../components/ModalSucess';
import ModalError from '../../components/ModalError';
// import ConfirmDeleteModal from '../../components/modals/ConfirmDeleteModal';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';

function ParteHome() {
  const [showModal, setShowModal] = useState(false);
  const [parteToEdit, setParteToEdit] = useState(null);
  const [partes, setPartes] = useState([]);
  const [modalSuccess, setModalSuccess] = useState(null);
  const [modalError, setModalError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const fetchPartes = async () => {
    try {
      const res = await getPartes();
      const activas = res.data.filter((p) => p.estado === true);
      setPartes(activas);
    } catch (err) {
      setModalError('Error al obtener partes.');
    }
  };

  useEffect(() => {
    fetchPartes();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteParte(idToDelete);
      setModalSuccess('Parte eliminada correctamente.');
      fetchPartes();
    } catch (err) {
      setModalError('Error al eliminar parte.');
    } finally {
      setIdToDelete(null);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">PARTES REGISTRADAS</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-900 text-white px-5 py-2 rounded shadow hover:bg-blue-800"
        >
          + Crear Parte
        </button>
      </div>

      <ParteTable
        partes={partes}
        onEdit={(p) => {
          setParteToEdit(p);
          setShowModal(true);
        }}
        onDelete={(id) => {
          setIdToDelete(id);
          setShowDeleteModal(true);
        }}
      />

      {(showModal || parteToEdit) && (
        <CreateParteModal
          parteToEdit={parteToEdit}
          onClose={() => {
            setShowModal(false);
            setParteToEdit(null);
            fetchPartes();
          }}
          onSuccess={(msg) => setModalSuccess(msg)}
          onError={(msg) => setModalError(msg)}
        />
      )}

      {showDeleteModal && (
        <ConfirmDeleteModal
          mensaje="¿Deseas eliminar esta parte?"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}

      {modalSuccess && (
        <ModalSuccess mensaje={modalSuccess} onClose={() => setModalSuccess(null)} />
      )}

      {modalError && (
        <ModalError mensaje={modalError} onClose={() => setModalError(null)} />
      )}
    </div>
  );
}

export default ParteHome;