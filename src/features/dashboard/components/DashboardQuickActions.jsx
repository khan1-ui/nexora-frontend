import { Link } from "react-router-dom";

/**
 * Quick Actions Widget
 */
const DashboardQuickActions = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-3xl text-white shadow-lg">
      <h3 className="text-lg font-semibold mb-4">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <Link to="/invoices" className="bg-white text-indigo-600 py-2 rounded-xl text-center font-medium">
          Create Invoice
        </Link>

        <Link to="/clients" className="bg-white text-indigo-600 py-2 rounded-xl text-center font-medium">
          Add Client
        </Link>

        <Link to="/expenses" className="bg-white text-indigo-600 py-2 rounded-xl text-center font-medium">
          Add Expense
        </Link>

        <Link to="/reports" className="bg-white text-indigo-600 py-2 rounded-xl text-center font-medium">
          View Reports
        </Link>
      </div>
    </div>
  );
};

export default DashboardQuickActions;