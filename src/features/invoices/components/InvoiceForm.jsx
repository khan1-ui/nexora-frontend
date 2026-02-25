import PropTypes from "prop-types";
import { useMemo } from "react";

const InvoiceForm = ({
  clients = [],
  aiLoading = false,
  formData,
  setFormData,
  handleAIUpload,
  handleSubmit,
}) => {

  /* ================= CALCULATE TOTAL ================= */
  const totalAmount = useMemo(() => {
    return formData.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  }, [formData.items]);

  /* ================= UPDATE ITEM ================= */
  const updateItem = (index, field, value) => {
    const updated = [...formData.items];
    updated[index][field] = value;

    setFormData({
      ...formData,
      items: updated,
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { description: "", quantity: 1, price: 0 },
      ],
    });
  };

  const removeItem = (index) => {
    const updated = formData.items.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      items:
        updated.length > 0
          ? updated
          : [{ description: "", quantity: 1, price: 0 }],
    });
  };

  return (
    <div className="space-y-1.5">

      {/* ================= AI UPLOAD ================= */}
      <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
        <p className="text-sm font-medium mb-2">
          Upload invoice for AI auto-fill
        </p>

        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) =>
            handleAIUpload(e.target.files[0])
          }
          className="text-sm"
        />

        {aiLoading && (
          <p className="text-xs mt-2 text-indigo-600">
            Extracting invoice data...
          </p>
        )}
      </div>

      {/* ================= FORM ================= */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-1.5"
      >

        {/* Client */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Client
          </label>

          <select
            required
            value={formData.client}
            onChange={(e) =>
              setFormData({
                ...formData,
                client: e.target.value,
              })
            }
            className="w-full px-4 py-2 border rounded-xl dark:border-slate-700 bg-white dark:bg-slate-900"
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        {/* ================= ITEMS ================= */}
        <div className="space-y-1.5">
          <h4 className="text-sm font-semibold">
            Invoice Items
          </h4>

          {formData.items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
            >
              <div className="md:col-span-2">
                <label className="text-xs block mb-1">
                  Description
                </label>
                <input
                  type="text"
                  required
                  value={item.description}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border rounded-lg dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="text-xs block mb-1">
                  Qty
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "quantity",
                      Number(e.target.value)
                    )
                  }
                  className="w-full px-3 py-2 border rounded-lg dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="text-xs block mb-1">
                  Price
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={item.price}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "price",
                      Number(e.target.value)
                    )
                  }
                  className="w-full px-3 py-2 border rounded-lg dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>

              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-xs text-red-500 hover:underline md:col-span-4 text-left"
              >
                Remove Item
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="text-sm text-indigo-600 hover:underline"
          >
            + Add Item
          </button>
        </div>

        {/* ================= STATUS ================= */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Status
          </label>

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
            className="w-full px-4 py-2 border rounded-xl dark:border-slate-700 bg-white dark:bg-slate-900"
          >
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {/* ================= DUE DATE ================= */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Due Date
          </label>

          <input
            type="date"
            required
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({
                ...formData,
                dueDate: e.target.value,
              })
            }
            className="w-full px-4 py-2 border rounded-xl dark:border-slate-700 bg-white dark:bg-slate-900"
          />
        </div>

        {/* ================= TOTAL PREVIEW ================= */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border dark:border-slate-800 flex justify-between font-semibold">
          <span>Total</span>
          <span>${totalAmount}</span>
        </div>

        {/* ================= SUBMIT ================= */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-2 rounded-xl font-medium"
        >
          Save Invoice
        </button>

      </form>
    </div>
  );
};

InvoiceForm.propTypes = {
  clients: PropTypes.array,
  aiLoading: PropTypes.bool,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleAIUpload: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
};

export default InvoiceForm;