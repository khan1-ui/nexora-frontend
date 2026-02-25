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

/**
 * Dashboard Revenue Chart
 */
const DashboardChart = ({ chartData }) => {
  return (
    <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl shadow-lg">
      <h3 className="text-lg font-semibold mb-6">
        Revenue vs Expenses Overview
      </h3>

      <ResponsiveContainer width="100%" height={400}>
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
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;