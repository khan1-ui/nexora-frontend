import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import InvoiceRow from "./InvoiceRow";
import InvoiceSkeleton from "./InvoiceSkeleton";

/**
 * InvoiceTable
 * --------------------------------------------------
 * - Responsive (Desktop + Mobile)
 * - Optimized with React.memo
 * - Stable pagination handlers
 * - Clean empty state
 */

const InvoiceTable = ({
  invoices = [],
  loading = false,
  handleSort,
  meta = {},
  currentPage = 1,
  setCurrentPage,
  handleEdit,
  handleDelete,
  handleStatusChange,
}) => {
  /* ================= MEMOIZED VALUES ================= */
  const totalPages = useMemo(() => {
    return meta?.totalPages ?? 1;
  }, [meta]);

  const safeInvoices = useMemo(() => {
    return Array.isArray(invoices) ? invoices : [];
  }, [invoices]);

  /* ================= PAGINATION HANDLERS ================= */
  const handlePrev = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage, setCurrentPage]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages, setCurrentPage]);

  /* ================= LOADING ================= */
  if (loading) return <InvoiceSkeleton />;

  /* ================= EMPTY STATE ================= */
  if (safeInvoices.length === 0) {
    return (
      <div className="p-10 text-center bg-white dark:bg-slate-950 rounded-2xl border dark:border-slate-800 shadow-sm">
        <p className="text-sm text-app-muted-light dark:text-app-muted-dark">
          No invoices found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-lg border dark:border-slate-800 overflow-hidden">

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-slate-900 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-6 py-4 font-semibold">Client</th>
              <th className="font-semibold">Total</th>
              <th className="font-semibold">Status</th>
              <th
                onClick={() => handleSort("dueDate")}
                className="cursor-pointer select-none font-semibold hover:text-indigo-600 transition"
              >
                Due Date
              </th>
              <th className="px-4 py-4 font-semibold text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {safeInvoices.map((invoice) => (
              <InvoiceRow
                key={invoice._id}
                invoice={invoice}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleStatusChange={handleStatusChange}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden p-4 space-y-4">
        {safeInvoices.map((invoice) => (
          <div
            key={invoice._id}
            className="p-4 rounded-xl border dark:border-slate-800 bg-gray-50 dark:bg-slate-900 transition hover:shadow-md"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold">
                {invoice?.client?.name ?? "Unknown Client"}
              </p>
              <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                ${invoice?.totalAmount ?? 0}
              </p>
            </div>

            <div className="mt-2 flex justify-between text-sm items-center">
              <span className="capitalize">
                {invoice?.status ?? "N/A"}
              </span>

              <span className="text-xs text-app-muted-light dark:text-app-muted-dark">
                {invoice?.dueDate?.split("T")[0] ?? "-"}
              </span>
            </div>

            {/* Mobile Actions */}
            <div className="flex justify-end gap-4 mt-3 text-sm">
              <button
                onClick={() => handleEdit(invoice)}
                className="text-indigo-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(invoice._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-6 py-4 border-t dark:border-slate-800 bg-gray-50 dark:bg-slate-900">

          <button
            disabled={currentPage === 1}
            onClick={handlePrev}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              currentPage === 1
                ? "bg-gray-200 dark:bg-slate-700 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Previous
          </button>

          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={handleNext}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              currentPage === totalPages
                ? "bg-gray-200 dark:bg-slate-700 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Next
          </button>

        </div>
      )}
    </div>
  );
};

InvoiceTable.propTypes = {
  invoices: PropTypes.array,
  loading: PropTypes.bool,
  handleSort: PropTypes.func.isRequired,
  meta: PropTypes.object,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
};

export default React.memo(InvoiceTable);