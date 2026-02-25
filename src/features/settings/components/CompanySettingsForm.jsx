/**
 * CompanySettingsForm
 */

const CompanySettingsForm = ({
  company,
  setCompany,
  updateCompany,
}) => {
  return (
    <div className="bg-white dark:bg-slate-950 
                    rounded-2xl shadow-lg 
                    border dark:border-slate-800 
                    p-6 space-y-5">

      <input
        type="text"
        placeholder="Company Name"
        value={company.name || ""}
        onChange={(e) =>
          setCompany({ ...company, name: e.target.value })
        }
        className="w-full px-4 py-2 rounded-xl border 
                   bg-gray-50 dark:bg-slate-900
                   dark:border-slate-800"
      />

      <input
        type="email"
        placeholder="Company Email"
        value={company.email || ""}
        onChange={(e) =>
          setCompany({ ...company, email: e.target.value })
        }
        className="w-full px-4 py-2 rounded-xl border 
                   bg-gray-50 dark:bg-slate-900
                   dark:border-slate-800"
      />

      <button
        onClick={updateCompany}
        className="bg-indigo-600 hover:bg-indigo-700 
                   text-white px-4 py-2 rounded-xl"
      >
        Save Changes
      </button>
    </div>
  );
};

export default CompanySettingsForm;