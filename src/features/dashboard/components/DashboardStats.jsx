import StatCard from "./StatCard";

const DashboardStats = ({ stats }) => {
  const unpaid = stats?.unpaidInvoices || { count: 0, total: 0 };
  const overdue = stats?.overdueInvoices || { count: 0, total: 0 };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <StatCard
        title="Total Revenue"
        value={`$${stats?.totalRevenue || 0}`}
      />

      <StatCard
        title="Unpaid Invoices"
        value={unpaid.count}
        badge={`$${unpaid.total}`}
        badgeColor="blue"
      />

      <StatCard
        title="Overdue Invoices"
        value={overdue.count}
        badge={`$${overdue.total}`}
        badgeColor="red"
      />

      <StatCard
        title="Net Profit"
        value={`$${stats?.netProfit || 0}`}
        badgeColor={
          (stats?.netProfit || 0) >= 0 ? "green" : "red"
        }
      />

    </div>
  );
};

export default DashboardStats;