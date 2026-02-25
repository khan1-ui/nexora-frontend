import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

export const useTrashedInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrash = async () => {
    try {
      setLoading(true);

      const res = await api.get("/invoices/trash");

      setInvoices(res.data.data || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load trash"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  const handleRestore = async (id) => {
    try {
      await api.patch(`/invoices/${id}/restore`);
      toast.success("Invoice restored");
      fetchTrash();
    } catch {
      toast.error("Restore failed");
    }
  };

  const handlePermanentDelete = async (id) => {
    try {
      await api.delete(`/invoices/${id}/permanent`);
      toast.success("Invoice permanently deleted");
      fetchTrash();
    } catch {
      toast.error("Delete failed");
    }
  };

  return {
    invoices,
    loading,
    handleRestore,
    handlePermanentDelete,
  };
};