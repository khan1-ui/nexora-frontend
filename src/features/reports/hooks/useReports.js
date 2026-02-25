import { useEffect, useState, useCallback } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

export const useReports = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    from: "",
    to: "",
  });

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get("/reports", {
        params: filters,
      });

      setData(res.data.data);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to load reports"
      );
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    data,
    loading,
    filters,
    setFilters,
  };
};