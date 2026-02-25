import { useTrashedInvoices } from "../invoices/hooks/useTrashedInvoices";
import { RotateCcw, Trash2 } from "lucide-react";

const InvoicesTrashPage = () => {
  const {
    invoices,
    loading,
    handleRestore,
    handlePermanentDelete,
  } = useTrashedInvoices();

  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  if (invoices.length === 0) {
    return (
      <div className="p-10 text-center">
        Trash is empty.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        Invoice Trash
      </h2>

      <div className="bg-white dark:bg-slate-950 rounded-2xl shadow border dark:border-slate-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-slate-900">
            <tr>
              <th className="px-6 py-4">Client</th>
              <th>Total</th>
              <th>Deleted At</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice._id}
                className="border-b dark:border-slate-800"
              >
                <td className="px-6 py-4">
                  {invoice.client?.name}
                </td>

                <td>${invoice.totalAmount}</td>

                <td>
                  {invoice.deletedAt?.split("T")[0]}
                </td>

                <td className="text-center">
                  <div className="flex justify-center gap-4">

                    <button
                      onClick={() =>
                        handleRestore(invoice._id)
                      }
                      className="text-green-600"
                      title="Restore"
                    >
                      <RotateCcw size={16} />
                    </button>

                    <button
                      onClick={() =>
                        handlePermanentDelete(
                          invoice._id
                        )
                      }
                      className="text-red-600"
                      title="Permanent Delete"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesTrashPage;