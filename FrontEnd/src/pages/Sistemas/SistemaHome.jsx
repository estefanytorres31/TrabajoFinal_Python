import React, { useEffect, useState } from 'react';
import SistemaTable from './SistemaTable';
import CreateSistemaModal from './CreateSistemaModal';
// import ModalSuccess from '../../components/modals/ModalSuccess';
// import ModalError from '../../components/modals/ModalError';
// import ConfirmDeleteModal from '../../components/modals/ConfirmDeleteModal';
import { getSistemas, deleteSistema } from '../../api/sistema';
import ModalSuccess from '../../components/ModalSucess';
import ModalError from '../../components/ModalError';
// import ConfirmDeleteModal from '../../components/modals/ConfirmDeleteModal';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';

function SistemaHome() {
  const [showModal, setShowModal] = useState(false);
  const [sistemaToEdit, setSistemaToEdit] = useState(null);
  const [sistemas, setSistemas] = useState([]);
  const [modalSuccess, setModalSuccess] = useState(null);
  const [modalError, setModalError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const fetchSistemas = async () => {
    try {
      const res = await getSistemas();
      const activos = res.data.filter((s) => s.estado === true);
      setSistemas(activos);
    } catch (err) {
      setModalError('Error al obtener sistemas.');
    }
  };

  useEffect(() => {
    fetchSistemas();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteSistema(idToDelete);
      setModalSuccess('Sistema eliminado correctamente.');
      fetchSistemas();
    } catch (error) {
      setModalError('Error al eliminar sistema.');
    } finally {
      setIdToDelete(null);
      setShowDeleteModal(false);
    }
  };

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

      <SistemaTable
        sistemas={sistemas}
        onEdit={(s) => {
          setSistemaToEdit(s);
          setShowModal(true);
        }}
        onDelete={(id) => {
          setIdToDelete(id);
          setShowDeleteModal(true);
        }}
      />

      {(showModal || sistemaToEdit) && (
        <CreateSistemaModal
          sistemaToEdit={sistemaToEdit}
          onClose={() => {
            setShowModal(false);
            setSistemaToEdit(null);
            fetchSistemas();
          }}
          onSuccess={(msg) => setModalSuccess(msg)}
          onError={(msg) => setModalError(msg)}
        />
      )}

      {showDeleteModal && (
        <ConfirmDeleteModal
          mensaje="¿Deseas eliminar este sistema?"
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

export default SistemaHome;