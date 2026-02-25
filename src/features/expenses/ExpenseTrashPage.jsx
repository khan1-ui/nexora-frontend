import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";
import ExpenseHeader from "./components/ExpenseHeader";

const ExpenseTrashPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrash = async () => {
    try {
      setLoading(true);
      const res = await api.get("/expenses/trash");
      setExpenses(res.data.data || []);
    } catch {
      toast.error("Failed to load trash");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  const handleRestore = async (id) => {
    try {
      await api.patch(`/expenses/${id}/restore`);
      toast.success("Expense restored");
      fetchTrash();
    } catch {
      toast.error("Restore failed");
    }
  };

  const handlePermanentDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}/permanent`);
      toast.success("Expense permanently deleted");
      fetchTrash();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">

      <ExpenseHeader />

      {loading ? (
        <div className="text-center py-10 text-sm text-gray-500">
          Loading trash...
        </div>
      ) : expenses.length === 0 ? (
        <div className="p-10 text-center text-gray-500">
          Trash is empty.
        </div>
      ) : (
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense._id}
              className="flex justify-between items-center p-4 rounded-xl border dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm"
            >
              <div>
                <p className="font-medium">{expense.title}</p>
                <p className="text-xs text-gray-500">
                  ${expense.amount} • {expense.category}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleRestore(expense._id)}
                  className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition"
                >
                  Restore
                </button>

                <button
                  onClick={() =>
                    handlePermanentDelete(expense._id)
                  }
                  className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ExpenseTrashPage;