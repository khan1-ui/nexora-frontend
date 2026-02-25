/**
 * ReportsFilters
 *
 * Date range filtering UI
 */

const ReportsFilters = ({ filters, setFilters }) => {
  return (
    <div className="bg-white dark:bg-slate-950 
                    rounded-2xl shadow-lg 
                    border dark:border-slate-800 
                    p-6 grid md:grid-cols-3 gap-4">
      <div className="flex gap-2">
        <label>From :</label>
      <input
        type="date"
        value={filters.from}
        onChange={(e) =>
          setFilters({ ...filters, from: e.target.value })
        }
        className="px-6 py-2 rounded-xl border 
                   bg-gray-50 dark:bg-slate-900 
                   dark:border-slate-300"
      />
      </div>
    <div className="flex gap-2">
       <label htmlFor="">To :</label>
      <input
        type="date"
        value={filters.to}
        onChange={(e) =>
          setFilters({ ...filters, to: e.target.value })
        }
        className="px-6 py-2 rounded-xl border 
                   bg-gray-50 dark:bg-slate-900 
                   dark:border-slate-300"
      />
    </div>

      <button
        onClick={() =>
          setFilters({ from: "", to: "" })
        }
        className="bg-gray-200 dark:bg-slate-800  border 
                   rounded-xl px-4 py-2 dark:border-slate-200"
      >
        Reset
      </button>

    </div>
  );
};

export default ReportsFilters;