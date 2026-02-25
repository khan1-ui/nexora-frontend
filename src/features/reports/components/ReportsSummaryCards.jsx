/**
 * ReportsSummaryCards
 *
 * Displays revenue, expense, net profit summary
 */



const ReportsSummaryCards = ({ data }) => {
  const revenue = data?.totalRevenue || 0;
  const expenses = data?.totalExpenses || 0;
  const net = data?.netProfit || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <Card title="Total Revenue" value={`$${revenue}`} positive />

      <Card title="Total Expenses" value={`$${expenses}`} negative />

      <Card
        title="Net Profit"
        value={`$${net}`}
        positive={net >= 0}
        negative={net < 0}
      />

    </div>
  );
};
const Card = ({ title, value, positive, negative }) => (
  <div className="bg-white dark:bg-slate-950 
                  rounded-2xl shadow-lg 
                  border dark:border-slate-800 
                  p-6">
    <p className="text-sm text-app-muted-light dark:text-app-muted-dark">
      {title}
    </p>

    <h3
      className={`text-2xl font-bold mt-2 ${
        positive
          ? "text-green-600"
          : negative
          ? "text-red-600"
          : ""
      }`}
    >
      {value}
    </h3>
  </div>
);
export default ReportsSummaryCards;