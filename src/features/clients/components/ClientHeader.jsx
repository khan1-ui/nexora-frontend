/**
 * ClientHeader
 * - Page title
 * - Search
 * - Create button
 */

import { Plus, Search } from "lucide-react";

const ClientHeader = ({ search, setSearch, onCreate }) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-6">

      <div>
        <h2 className="text-2xl font-bold">
          Clients
        </h2>
        <p className="text-sm text-app-muted-light dark:text-app-muted-dark">
          Manage your company clients
        </p>
      </div>

      <div className="flex gap-4 flex-col sm:flex-row">

        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-xl dark:border-slate-700"
          />
        </div>

        <button
          onClick={onCreate}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl"
        >
          <Plus size={18} />
          Add Client
        </button>

      </div>
    </div>
  );
};

export default ClientHeader;