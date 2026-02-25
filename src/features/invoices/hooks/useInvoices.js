/**
 * useInvoices (Enterprise + Performance Optimized)
 * --------------------------------------------------
 * - Debounced search
 * - Smart pagination
 * - Stable callbacks
 * - Marketplace ready
 */

import { useEffect, useState, useCallback } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";
import { useDebounce } from "@/hooks/useDebounce";

export const useInvoices = () => {
  /* ================= CORE STATE ================= */
  const [invoices, setInvoices] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  /* ================= DELETE STATE ================= */
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  /* ================= FETCH ================= */
  const fetchInvoices = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/invoices", {
        params: {
          page: currentPage,
          limit,
          search: debouncedSearch, // ✅ correct
          sort: sortField,
          order: sortOrder,
        },
      });

      setInvoices(data?.data ?? []);
      setMeta(data?.meta ?? {});
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch invoices"
      );
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch, sortField, sortOrder]); // ✅ fixed dependency

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  /* Reset page only when debounced search changes */
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [debouncedSearch]);

  /* ================= SORT ================= */
  const handleSort = useCallback((field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  }, [sortField]);

  /* ================= DELETE ================= */
  const handleDeleteClick = useCallback((id) => {
    setSelectedInvoiceId(id);
    setDeleteModalOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!selectedInvoiceId) return;

    try {
      await api.delete(`/invoices/${selectedInvoiceId}`);

      toast.success("Invoice deleted successfully");

      setDeleteModalOpen(false);
      setSelectedInvoiceId(null);

      if (invoices.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        fetchInvoices();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Delete failed"
      );
    }
  }, [selectedInvoiceId, invoices.length, currentPage, fetchInvoices]);

  /* ================= STATUS UPDATE ================= */
  const handleStatusChange = useCallback(async (id, status) => {
    try {
      await api.patch(`/invoices/${id}/status`, { status });

      toast.success("Status updated");

      fetchInvoices();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Status update failed"
      );
    }
  }, [fetchInvoices]);

  return {
    invoices,
    meta,
    loading,

    /* Search */
    search,           // ✅ raw search for input
    setSearch,

    currentPage,
    setCurrentPage,

    handleSort,
    fetchInvoices,

    /* Delete */
    deleteModalOpen,
    setDeleteModalOpen,
    handleDeleteClick,
    confirmDelete,

    /* Status */
    handleStatusChange,
  };
};