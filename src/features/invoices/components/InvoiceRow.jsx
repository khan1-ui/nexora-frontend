import React, { useCallback } from "react";
import PropTypes from "prop-types";

/**
 * InvoiceRow
 * --------------------------------------------------
 * - Optimized row rendering
 * - Memoized to prevent unnecessary re-render
 */

const InvoiceRow = ({
  invoice,
  handleEdit,
  handleDelete,
  handleStatusChange,
}) => {
  const handleEditClick = useCallback(() => {
    handleEdit(invoice);
  }, [handleEdit, invoice]);

  const handleDeleteClick = useCallback(() => {
    handleDelete(invoice._id);
  }, [handleDelete, invoice._id]);

  const handleStatus = useCallback(
    (e) => {
      handleStatusChange(invoice._id, e.target.value);
    },
    [handleStatusChange, invoice._id]
  );

  return (
    <tr className="border-t dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900 transition">
      <td className="px-6 py-4">
        {invoice?.client?.name ?? "Unknown Client"}
      </td>

      <td>${invoice?.totalAmount ?? 0}</td>

      <td>
        <select
          value={invoice?.status}
          onChange={handleStatus}
          className="text-xs border rounded px-2 py-1 dark:bg-slate-800"
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
      </td>

      <td>
        {invoice?.dueDate?.split("T")[0] ?? "-"}
      </td>

      <td className="text-center space-x-3">
        <button
          onClick={handleEditClick}
          className="text-indigo-600 hover:underline"
        >
          Edit
        </button>

        <button
          onClick={handleDeleteClick}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

InvoiceRow.propTypes = {
  invoice: PropTypes.object.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
};

export default React.memo(InvoiceRow);