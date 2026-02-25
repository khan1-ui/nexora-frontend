import PropTypes from "prop-types";
import Modal from "@/components/ui/Modal";
import InvoiceForm from "./InvoiceForm";

/**
 * InvoiceModal Component
 *
 * Responsibilities:
 * - Wraps invoice form inside reusable Modal
 * - Supports AI autofill
 * - Handles Create + Edit mode
 * - Fully marketplace-ready isolation
 */
const InvoiceModal = ({
  openModal,
  setOpenModal,
  clients,
  aiLoading = false,
  formData,
  setFormData,
  handleAIUpload,
  handleSubmit,
}) => {
  const isEditMode = Boolean(formData?._id);

  return (
    <Modal
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
      title={
        isEditMode
          ? "Edit Invoice"
          : "Create Invoice (AI Enabled)"
      }
    >
      <InvoiceForm
        clients={clients}
        aiLoading={aiLoading}
        formData={formData}
        setFormData={setFormData}
        handleAIUpload={handleAIUpload}
        handleSubmit={handleSubmit}
      />
    </Modal>
  );
};

InvoiceModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  clients: PropTypes.array,
  aiLoading: PropTypes.bool,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleAIUpload: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
};

export default InvoiceModal;