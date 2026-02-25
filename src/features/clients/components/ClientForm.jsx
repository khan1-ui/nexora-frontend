import PropTypes from "prop-types";

const ClientForm = ({
  formData,
  setFormData,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="space-y-5"
    >
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Client Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          className="w-full px-4 py-2 rounded-xl border bg-gray-50 
                     dark:bg-slate-900 dark:border-slate-800 
                     focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          className="w-full px-4 py-2 rounded-xl border bg-gray-50 
                     dark:bg-slate-900 dark:border-slate-800 
                     focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Phone
        </label>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value,
            })
          }
          className="w-full px-4 py-2 rounded-xl border bg-gray-50 
                     dark:bg-slate-900 dark:border-slate-800 
                     focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 
                   text-white py-2 rounded-xl font-medium 
                   transition shadow-md"
      >
        {formData._id ? "Update Client" : "Save Client"}
      </button>
    </form>
  );
};

ClientForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ClientForm;