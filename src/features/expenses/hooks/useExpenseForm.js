/**
 * useExpenseForm Hook
 *
 * Handles:
 * - Create expense
 * - Modal state
 */

import { useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

export const useExpenseForm = (refresh) => {
  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    expenseDate: "",
  });

  const handleCreate = async () => {
    try {
      await api.post("/expenses", formData);
      toast.success("Expense added successfully");
      setOpenModal(false);
      setFormData({
        title: "",
        amount: "",
        category: "",
        expenseDate: "",
      });
      refresh();
    } catch {
      toast.error("Failed to add expense");
    }
  };

  return {
    openModal,
    setOpenModal,
    formData,
    setFormData,
    handleCreate,
  };
};