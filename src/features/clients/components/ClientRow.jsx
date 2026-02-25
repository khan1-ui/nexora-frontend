import { Trash2, Pencil } from "lucide-react";

const ClientRow = ({
  client,
  handleEdit,
  handleDelete,
}) => {
  return (
    <tr className="border-b dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900">
      <td className="px-6 py-4 font-medium">
        {client.name}
      </td>
      <td>{client.email || "-"}</td>
      <td>{client.phone || "-"}</td>

      <td className="text-right pr-6">
        <div className="flex justify-end gap-3">

          <button
            onClick={() => handleEdit(client)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => handleDelete(client._id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>

        </div>
      </td>
    </tr>
  );
};
export default ClientRow;