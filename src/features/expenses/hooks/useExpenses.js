/**
 * useExpenses (Marketplace Ready)
 * --------------------------------------------------
 * Responsibilities:
 * - Fetch expenses
 * - Soft delete (trash)
 * - Edit expense
 * - Pagination, search, sort
 */

import { useState, useEffect, useCallback } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

export const useExpenses = () => {
  /* ================= CORE STATE ================= */
  const [expenses, setExpenses] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const [sortField, setSortField] = useState("expenseDate");
  const [sortOrder, setSortOrder] = useState("desc");

  /* ================= DELETE ================= */
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  /* ================= EDIT ================= */
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const [editFormData, setEditFormData] = useState({
    title: "",
    amount: "",
    category: "",
    expenseDate: "",
  });

  /* ================= FETCH ================= */
  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/expenses", {
        params: {
          page: currentPage,
          limit,
          search,
          sort: sortField,
          order: sortOrder,
        },
      });

      setExpenses(data?.data ?? []);
      setMeta(data?.meta ?? {});
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch expenses"
      );
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, sortField, sortOrder]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  /* ================= SORT ================= */
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  /* ================= DELETE (SOFT TRASH) ================= */
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;

    try {
      await api.patch(`/expenses/${selectedId}/trash`);

      toast.success("Expense moved to trash");

      setDeleteModalOpen(false);
      setSelectedId(null);

      fetchExpenses();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Delete failed"
      );
    }
  };

  /* ================= EDIT ================= */
  const handleEditClick = (expense) => {
    setSelectedExpense(expense);

    setEditFormData({
      title: expense.title ?? "",
      amount: expense.amount ?? "",
      category: expense.category ?? "",
      expenseDate: expense.expenseDate?.split("T")[0] ?? "",
    });

    setEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedExpense) return;

    try {
      await api.patch(
        `/expenses/${selectedExpense._id}`,
        editFormData
      );

      toast.success("Expense updated successfully");

      setEditModalOpen(false);
      setSelectedExpense(null);

      setEditFormData({
        title: "",
        amount: "",
        category: "",
        expenseDate: "",
      });

      fetchExpenses();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Update failed"
      );
    }
  };

  return {
    expenses,
    meta,
    loading,

    search,
    setSearch,

    currentPage,
    setCurrentPage,

    handleSort,
    fetchExpenses,

    /* Delete */
    deleteModalOpen,
    setDeleteModalOpen,
    handleDeleteClick,
    confirmDelete,

    /* Edit */
    editModalOpen,
    setEditModalOpen,
    editFormData,
    setEditFormData,
    handleEditClick,
    handleUpdate,
  };
};