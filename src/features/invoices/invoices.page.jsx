/**
 * InvoicesPage
 * --------------------------------------------------
 * Feature Entry Point (Orchestration Layer)
 *
 * Responsibilities:
 * - Connects invoice business logic
 * - Connects form + AI logic
 * - Passes props to presentation components
 * - No API calls directly inside component
 */

import { useState } from "react";
import { useInvoices } from "./hooks/useInvoices";
import { useInvoiceForm } from "./hooks/useInvoiceForm";

import InvoiceHeader from "./components/InvoiceHeader";
import InvoiceTable from "./components/InvoiceTable";
import InvoiceModal from "./components/InvoiceModal";
import InvoiceAIModal from "./components/InvoiceAIModal";

import DeleteConfirmModal from "@/components/ui/DeleteConfirmModal";

const InvoicesPage = () => {
  /**
   * Business Logic Layer
   */
  const invoiceLogic = useInvoices();

  /**
   * AI Modal State
   */
  const [aiOpen, setAIOpen] = useState(false);

  /**
   * Create / Edit Form Logic
   */
  const formLogic = useInvoiceForm(() => {
    invoiceLogic.fetchInvoices();
    invoiceLogic.setCurrentPage(1);
  });

  /**
   * Delete Modal State (from hook)
   */
  const {
    deleteModalOpen,
    setDeleteModalOpen,
    confirmDelete,
  } = invoiceLogic;

  /**
   * AI Autofill Handler
   */
  const handleAIAutoFill = (data) => {
    formLogic.setFormData({
      ...formLogic.formData,
      clientName: data.clientName || "",
      invoiceNumber: data.invoiceNumber || "",
      issueDate: data.issueDate || "",
      dueDate: data.dueDate || "",
      items: data.items || [],
      totalAmount: data.totalAmount || 0,
    });

    formLogic.setOpenModal(true);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4">

      {/* Header */}
      <InvoiceHeader
        search={invoiceLogic.search}
        setSearch={invoiceLogic.setSearch}
        onCreate={() => formLogic.setOpenModal(true)}
        onAIScan={() => setAIOpen(true)}
      />

      {/* AI Scanner Modal */}
      <InvoiceAIModal
        open={aiOpen}
        setOpen={setAIOpen}
        onAutoFill={handleAIAutoFill}
      />

      {/* Table */}
      <InvoiceTable
        invoices={invoiceLogic.invoices}
        loading={invoiceLogic.loading}
        handleSort={invoiceLogic.handleSort}
        meta={invoiceLogic.meta}
        currentPage={invoiceLogic.currentPage}
        setCurrentPage={invoiceLogic.setCurrentPage}
        handleEdit={formLogic.handleEdit}
        handleDelete={invoiceLogic.handleDeleteClick}
        handleStatusChange={invoiceLogic.handleStatusChange}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Invoice"
        message="Are you sure you want to delete this invoice? This action cannot be undone."
      />

      {/* Create / Edit Modal */}
      <InvoiceModal {...formLogic} />

    </div>
  );
};

export default InvoicesPage;