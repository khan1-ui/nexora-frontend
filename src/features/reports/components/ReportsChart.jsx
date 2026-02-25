/**
 * ReportsChart
 *
 * Revenue vs Expense Chart
 */

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ReportsChart = ({ data }) => {
  const chartData = data?.monthly || [];

  return (
    <div className="bg-white dark:bg-slate-950 
                    rounded-2xl shadow-lg 
                    border dark:border-slate-800 
                    p-6">

      <h3 className="font-semibold mb-4">
        Revenue vs Expenses
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#6366f1"
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444"
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default ReportsChart;