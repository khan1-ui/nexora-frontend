import { useEffect, useMemo, useState } from "react";
import api from "@/services/api";

/**
 * useDashboardData
 * Handles:
 * - Fetching dashboard stats 
 * - Transforming monthly chart data
 * - Managing loading state
 */
export const useDashboardData = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard");

        if (isMounted) {
          setStats(res.data?.data || {});
        }
      } catch (error) {
        console.error("Dashboard fetch failed:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Memoized chart data transformation
   * Prevents unnecessary recalculations
   */
  const chartData = useMemo(() => {
    const monthlyRevenue = stats?.monthlyRevenue || [];
    const monthlyExpenses = stats?.monthlyExpenses || [];

    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    return months.map((month) => ({
      month: `M${month}`,
      revenue:
        monthlyRevenue.find((r) => r._id === month)?.total || 0,
      expenses:
        monthlyExpenses.find((e) => e._id === month)?.total || 0,
    }));
  }, [stats]);

  return {
    stats,
    chartData,
    loading,
  };
};