/**
 * ExpenseForm Component
 *
 * Responsibilities:
 * - Render expense creation form
 * - Controlled inputs
 * - Pure UI (no API logic)
 */

import PropTypes from "prop-types";

const ExpenseForm = ({
  formData,
  setFormData,
  handleCreate,
}) => {
  return (
    <form
      onSubmit={(e) => {
      e.preventDefault();
      handleCreate(formData);
    }}
      className="space-y-5"
    >
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
          className="w-full px-4 py-2 rounded-xl border 
                     bg-gray-50 dark:bg-slate-900 
                     dark:border-slate-800
                     focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Category
        </label>
        <input
          type="text"
          required
          value={formData.category}
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value,
            })
          }
          className="w-full px-4 py-2 rounded-xl border 
                     bg-gray-50 dark:bg-slate-900 
                     dark:border-slate-800
                     focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Amount
        </label>
        <input
          type="number"
          required
          min="0"
          value={formData.amount}
          onChange={(e) =>
            setFormData({
              ...formData,
              amount: e.target.value,
            })
          }
          className="w-full px-4 py-2 rounded-xl border 
                     bg-gray-50 dark:bg-slate-900 
                     dark:border-slate-800
                     focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Expense Date
        </label>
        <input
          type="date"
          required
          value={formData.expenseDate}
          onChange={(e) =>
            setFormData({
              ...formData,
              expenseDate: e.target.value,
            })
          }
          className="w-full px-4 py-2 rounded-xl border 
                     bg-gray-50 dark:bg-slate-900 
                     dark:border-slate-800
                     focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 
                   text-white py-2 rounded-xl 
                   font-medium transition shadow-md"
      >
        Save Expense
      </button>
    </form>
  );
};

ExpenseForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
};

export default ExpenseForm;