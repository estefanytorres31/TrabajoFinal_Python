import React from 'react';

function ModalSuccess({ mensaje, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-green-700 mb-4">Éxito</h2>
        <p className="text-gray-800 mb-6">{mensaje}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalSuccess;
