import React, { useCallback } from "react";
import PropTypes from "prop-types";

/**
 * ExpenseRow
 * --------------------------------------------------
 * - Memoized for performance
 * - Stable action handlers
 * - Clean & safe rendering
 */

const ExpenseRow = ({
  expense,
  handleEdit,
  handleDelete,
}) => {
  /* Stable handlers */
  const handleEditClick = useCallback(() => {
    handleEdit(expense);
  }, [handleEdit, expense]);

  const handleDeleteClick = useCallback(() => {
    handleDelete(expense._id);
  }, [handleDelete, expense._id]);

  return (
    <tr className="border-t dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900 transition">
      
      <td className="px-6 py-4">
        {expense?.title ?? "Untitled"}
      </td>

      <td>
        ${expense?.amount ?? 0}
      </td>

      <td>
        {expense?.category ?? "-"}
      </td>

      <td>
        {expense?.expenseDate?.split("T")[0] ?? "-"}
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

ExpenseRow.propTypes = {
  expense: PropTypes.object.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default React.memo(ExpenseRow);