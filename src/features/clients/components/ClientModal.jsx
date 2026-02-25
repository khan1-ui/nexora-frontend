/**
 * ClientModal
 *
 * Wraps ClientForm inside reusable Modal
 * Handles create + delete confirmation
 */

import Modal from "@/components/ui/Modal";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ClientForm from "./ClientForm";

const ClientModal = ({
  openModal,
  setOpenModal,
  confirmOpen,
  setConfirmOpen,
  formData,
  setFormData,
  handleSubmit,
  handleDelete,
}) => {
  return (
    <>
      {/* Create Modal */}
      <Modal
  isOpen={openModal}
  onClose={() => setOpenModal(false)}
  title={formData._id ? "Edit Client" : "Add New Client"}
>
  <ClientForm
    formData={formData}
    setFormData={setFormData}
    handleSubmit={handleSubmit}
  />
</Modal>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        message="This action cannot be undone. Delete this client permanently?"
      />
    </>
  );
};

export default ClientModal;