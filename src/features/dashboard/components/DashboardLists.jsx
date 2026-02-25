import PropTypes from "prop-types";

/**
 * Reusable Section Wrapper
 */
const SectionCard = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-950 p-6 rounded-3xl shadow-lg">
    <h3 className="text-lg font-semibold mb-4">
      {title}
    </h3>
    {children}
  </div>
);

/**
 * Reusable Empty State
 */
const EmptyState = ({ message }) => (
  <p className="text-sm text-app-muted-light dark:text-app-muted-dark">
    {message}
  </p>
);

/**
 * Individual Invoice Row
 */
const InvoiceItem = ({ invoice }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-slate-800">
    <div>
      <p className="font-medium">
        {invoice.client?.name}
      </p>
      <p className="text-xs text-app-muted-light dark:text-app-muted-dark">
        Due: {invoice.dueDate?.split("T")[0]}
      </p>
    </div>

    <span
      className={`px-3 py-1 text-xs rounded-full font-medium ${
        invoice.status === "overdue"
          ? "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
          : "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
      }`}
    >
      {invoice.status}
    </span>
  </div>
);

/**
 * Individual Expense Row
 */
const ExpenseItem = ({ expense }) => (
  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-slate-800">
    <div>
      <p className="text-sm font-medium">
        {expense.title}
      </p>
      <p className="text-xs text-app-muted-light dark:text-app-muted-dark">
        {expense.category}
      </p>
    </div>

    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
      ${expense.amount}
    </span>
  </div>
);

/**
 * Individual Client Row
 */
const ClientItem = ({ client }) => (
  <div className="flex items-center gap-3 py-3 border-b border-gray-200 dark:border-slate-800">
    <img
      src="https://i.pravatar.cc/35"
      alt="avatar"
      className="w-8 h-8 rounded-full"
    />
    <div>
      <p className="text-sm font-medium">
        {client.name}
      </p>
      <p className="text-xs text-app-muted-light dark:text-app-muted-dark">
        {client.email}
      </p>
    </div>
  </div>
);

/**
 * DashboardLists Main Component
 */
const DashboardLists = ({
  outstandingInvoices = [],
  latestExpenses = [],
  recentClients = [],
}) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

      {/* LEFT SIDE */}
      <div className="xl:col-span-2 space-y-8">

        <SectionCard title="Outstanding Invoices">
          {outstandingInvoices.length === 0 ? (
            <EmptyState message="No outstanding invoices" />
          ) : (
            outstandingInvoices.map((inv) => (
              <InvoiceItem key={inv._id} invoice={inv} />
            ))
          )}
        </SectionCard>

        <SectionCard title="Latest Expenses">
          {latestExpenses.length === 0 ? (
            <EmptyState message="No expenses available" />
          ) : (
            latestExpenses.map((exp) => (
              <ExpenseItem key={exp._id} expense={exp} />
            ))
          )}
        </SectionCard>

      </div>

      {/* RIGHT SIDE */}
      <div className="space-y-8">

        <SectionCard title="Recent Clients">
          {recentClients.length === 0 ? (
            <EmptyState message="No clients available" />
          ) : (
            recentClients.map((client) => (
              <ClientItem key={client._id} client={client} />
            ))
          )}
        </SectionCard>

      </div>
    </div>
  );
};

DashboardLists.propTypes = {
  outstandingInvoices: PropTypes.array,
  latestExpenses: PropTypes.array,
  recentClients: PropTypes.array,
};

export default DashboardLists;