/**
 * ExpenseModal
 *
 * Wraps ExpenseForm inside reusable Modal
 */

import Modal from "@/components/ui/Modal";
import ExpenseForm from "./ExpenseForm";

const ExpenseModal = ({
  openModal,
  setOpenModal,
  formData,
  setFormData,
  handleCreate,
}) => {
  return (
    <Modal
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
      title={formData?._id ? "Edit Expense" : "Add New Expense"}
    >
      <ExpenseForm
        formData={formData}
        setFormData={setFormData}
        handleCreate={handleCreate}
      />
    </Modal>
  );
};

export default ExpenseModal;