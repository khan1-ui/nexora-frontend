import React from 'react';
import Modal from "./Modal";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border text-sm"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
