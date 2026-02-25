import PropTypes from "prop-types";
import Modal from "@/components/ui/Modal";

/**
 * Reusable Delete Confirmation Modal
 * ---------------------------------------------------
 * This component is used across the application
 * for confirming delete / destructive actions.
 *
 * Props:
 * - isOpen: Boolean (controls modal visibility)
 * - onClose: Function (close modal handler)
 * - onConfirm: Function (confirm delete handler)
 * - title: String (modal title)
 * - message: String (confirmation message)
 * - confirmText: String (optional - default: "Delete")
 * - cancelText: String (optional - default: "Cancel")
 */

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <div className="space-y-6">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border dark:border-slate-700 transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

DeleteConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default DeleteConfirmModal;