import React from "react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, expedienteId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
      <div className="bg-white p-4 rounded-md shadow-md w-80">
        <h3 className="text-lg font-semibold mb-4">Confirmar Eliminación</h3>
        <p>¿Realmente desea eliminar el expediente de ID: {expedienteId}?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
