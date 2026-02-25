/**
 * InvoiceHeader (Enterprise SaaS Ready)
 *
 * Features:
 * - Search with clear
 * - Create button
 * - Trash navigation
 * - Responsive layout
 */

import { Plus, Search, Trash2, X, Sparkles} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const InvoiceHeader = ({
  search,
  setSearch,
  onCreate,
  onAIScan,
}) => {
  const location = useLocation();
  const isTrashPage = location.pathname.includes(
    "/trash"
  );

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

      {/* ===== Title Section ===== */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-3">
          {isTrashPage ? "Invoice Trash" : "Invoices"}

          {isTrashPage && (
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
              Trash Mode
            </span>
          )}
        </h2>

        <p className="text-sm text-app-muted-light dark:text-app-muted-dark">
          AI-powered invoice management
        </p>
      </div>

      {/* ===== Actions Section ===== */}
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">

        {/* Search */}
        {!isTrashPage && (
          <div className="relative w-full sm:w-64">
            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by status..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-10 pr-10 py-2 rounded-xl border dark:border-slate-700"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}
         {/* AI Scan Button */}
        <button
          onClick={onAIScan}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl"
        >
          <Sparkles size={18} />
          AI Scan
        </button>
        {/* Trash / Back Button */}
        {!isTrashPage ? (
          <Link
            to="/invoices/trash"
            className="flex items-center justify-center gap-2 bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded-xl transition"
          >
            <Trash2 size={18} />
            Trash
          </Link>
        ) : (
          <Link
            to="/invoices"
            className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-slate-800 px-4 py-2 rounded-xl transition"
          >
            Back to Invoices
          </Link>
        )}

        {/* Create Button */} 
        {!isTrashPage && (
          <button
            onClick={onCreate}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition"
          >
            <Plus size={18} />
            Create
          </button>
        )}

      </div>
    </div>
  );
};

export default InvoiceHeader;