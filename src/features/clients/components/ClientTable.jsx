import ClientRow from "./ClientRow";
import ClientSkeleton from "./ClientSkeleton";
import { ChevronUp, ChevronDown } from "lucide-react";

/**
 * ClientTable (Enterprise Version)
 */

const ClientTable = ({
  clients = [],
  loading,
  meta = {},
  currentPage,
  setCurrentPage,
  handleSort,
  handleEdit,
  handleDelete,
  sortField,
  sortOrder,
}) => {
  if (loading) return <ClientSkeleton />;

  if (!clients.length)
    return (
      <div className="p-10 text-center text-app-muted-light dark:text-app-muted-dark">
        No clients found.
      </div>
    );

  return (
    <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-lg border dark:border-slate-800 overflow-hidden">

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-slate-900 text-xs uppercase">
            <tr>
              <th
                onClick={() => handleSort("name")}
                className="px-6 py-4 cursor-pointer flex items-center gap-2"
              >
                Name
                {sortField === "name" &&
                  (sortOrder === "asc" ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  ))}
              </th>

              <th>Email</th>
              <th>Phone</th>

              <th className="text-right pr-6">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {clients.map((client) => (
              <ClientRow
                key={client._id}
                client={client}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden p-4 space-y-4">
        {clients.map((client) => (
          <div
            key={client._id}
            className="p-4 rounded-xl border dark:border-slate-800 space-y-2"
          >
            <p className="font-semibold">
              {client.name}
            </p>

            <p className="text-sm">
              {client.email || "-"}
            </p>

            <p className="text-sm">
              {client.phone || "-"}
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleEdit?.(client)}
                className="text-indigo-600 text-sm"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  handleDelete?.(client._id)
                }
                className="text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-between px-6 py-4 border-t dark:border-slate-800 text-sm">

        <span>
          Page {meta.page || 1} of{" "}
          {meta.totalPages || 1}
        </span>

        <div className="flex gap-2">
          <button
            disabled={meta.page <= 1}
            onClick={() =>
              setCurrentPage((p) => p - 1)
            }
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            Prev
          </button>

          <button
            disabled={
              meta.page >= meta.totalPages
            }
            onClick={() =>
              setCurrentPage((p) => p + 1)
            }
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default ClientTable;