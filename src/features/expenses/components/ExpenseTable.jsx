import { Trash2 } from "lucide-react";
import ExpenseRow from "./ExpenseRow";
import ExpenseSkeleton from "./ExpenseSkeleton";
import { Link } from "react-router-dom";

const ExpenseTable = ({
  expenses = [],
  loading = false,
  meta = {},
  currentPage = 1,
  setCurrentPage,
  handleSort,
  handleEdit,
  handleDelete,
}) => {
  if (loading) return <ExpenseSkeleton />;

  const totalPages = meta?.totalPages || 1;

  return (
    <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-lg border dark:border-slate-800 overflow-hidden">

      {/* ===== Top Action Bar ===== */}
      <div className="flex justify-between items-center px-6 py-4 border-b dark:border-slate-800 bg-gray-50 dark:bg-slate-900">
        <h3 className="font-semibold text-sm uppercase tracking-wide">
          Expense List
        </h3>    
      </div>

      {/* ===== Empty State ===== */}
      {!expenses.length ? (
        <div className="p-10 text-center text-app-muted-light dark:text-app-muted-dark">
          No expenses found.
        </div>
      ) : (
        <>
          {/* ===== Desktop Table ===== */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-slate-900 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th>Category</th>

                  <th
                    onClick={() => handleSort("amount")}
                    className="cursor-pointer hover:text-indigo-600 transition"
                  >
                    Amount
                  </th>

                  <th
                    onClick={() => handleSort("expenseDate")}
                    className="cursor-pointer hover:text-indigo-600 transition"
                  >
                    Date
                  </th>

                  <th className="px-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((expense) => (
                  <ExpenseRow
                    key={expense._id}
                    expense={expense}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== Pagination ===== */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center px-6 py-4 border-t dark:border-slate-800 bg-gray-50 dark:bg-slate-900 text-sm">
              <span>
                Page {currentPage} of {totalPages}
              </span>

              <div className="flex gap-2">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-4 py-1 rounded-lg border disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                >
                  Prev
                </button>

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-4 py-1 rounded-lg border disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExpenseTable;