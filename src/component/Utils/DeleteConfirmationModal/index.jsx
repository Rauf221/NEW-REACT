import React from 'react';
import { FaTrash } from 'react-icons/fa';

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete, customerName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-[#2a3042] p-6 rounded shadow-lg text-white">
        <div className="flex items-center justify-center mb-4">
          <FaTrash className="text-2xl text-red-500" />
        </div>
        <p className="mb-4 text-center">Are you sure you want to permanently delete {customerName} datas?</p>
        <div className="flex justify-end">
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Delete Now
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
