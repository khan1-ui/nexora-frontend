/**
 * ExpensesPage
 * --------------------------------------------------
 * Feature Entry Point (Orchestration Layer)
 *
 * Responsibilities:
 * - Connects business logic hooks
 * - Passes props to presentation components
 * - No API calls or business logic here
 * - Maintains clean separation of concerns
 */

import { useExpenses } from "./hooks/useExpenses";
import { useExpenseForm } from "./hooks/useExpenseForm";

import ExpenseHeader from "./components/ExpenseHeader";
import ExpenseTable from "./components/ExpenseTable";
import ExpenseModal from "./components/ExpenseModal";

import DeleteConfirmModal from "@/components/ui/DeleteConfirmModal";

const ExpensesPage = () => {
  /**
   * Business Logic Layer
   */
  const expenseLogic = useExpenses();

  /**
   * Create Form Logic
   */
  const createFormLogic = useExpenseForm(expenseLogic.fetchExpenses);

  /**
   * Delete Modal State (comes from hook)
   */
  const {
    deleteModalOpen,
    setDeleteModalOpen,
    confirmDelete,
  } = expenseLogic;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4">

      {/* Header Section */}
      <ExpenseHeader
        search={expenseLogic.search}
        setSearch={expenseLogic.setSearch}
        onCreate={() => createFormLogic.setOpenModal(true)}
      />

      {/* Data Table */}
      <ExpenseTable
        expenses={expenseLogic.expenses}
        loading={expenseLogic.loading}
        meta={expenseLogic.meta}
        currentPage={expenseLogic.currentPage}
        setCurrentPage={expenseLogic.setCurrentPage}
        handleSort={expenseLogic.handleSort}
        handleEdit={expenseLogic.handleEditClick}
        handleDelete={expenseLogic.handleDeleteClick}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Expense"
        message="Are you sure you want to move this expense to trash?"
      />

      {/* Create Expense Modal */}
      <ExpenseModal {...createFormLogic} />

      {/* Edit Expense Modal */}
      <ExpenseModal
        openModal={expenseLogic.editModalOpen}
        setOpenModal={expenseLogic.setEditModalOpen}
        formData={expenseLogic.editFormData}
        setFormData={expenseLogic.setEditFormData}
        handleCreate={expenseLogic.handleUpdate}
      />
    </div>
  );
};

export default ExpensesPage;