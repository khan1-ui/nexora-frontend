/**
 * useInvoiceForm (Upgraded - CRUD Ready)
 *
 * Handles:
 * - Client fetch
 * - AI extraction
 * - Invoice create
 * - Invoice update (edit)
 * - Modal state
 */

import { useState, useEffect } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

export const useInvoiceForm = (refresh) => {
  const [clients, setClients] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  const initialState = {
    client: "",
    items: [{ description: "", quantity: 1, price: 0 }],
    dueDate: "",
    status: "unpaid",
  };

  const [formData, setFormData] = useState(initialState);

  /* ================= FETCH CLIENTS ================= */
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get("/clients");
        setClients(res.data.data || []);
      } catch {
        toast.error("Failed to load clients");
      }
    };

    fetchClients();
  }, []);

  /* ================= AI UPLOAD ================= */
  const handleAIUpload = async (file) => {
    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    try {
      setAiLoading(true);

      const res = await api.post("/ai/invoice-ocr", data);
      const aiData = res.data.data;

      const matchedClient = clients.find(
        (c) =>
          c.name.toLowerCase() ===
          aiData.clientName?.toLowerCase()
      );

      setFormData({
        client: matchedClient?._id || "",
        dueDate: aiData.dueDate?.split("T")[0] || "",
        status: "unpaid",
        items:
          aiData.items?.length > 0
            ? aiData.items
            : [{ description: "", quantity: 1, price: 0 }],
      });

      toast.success("AI data extracted successfully");
    } catch {
      toast.error("AI extraction failed");
    } finally {
      setAiLoading(false);
    }
  };

  /* ================= OPEN EDIT MODE ================= */
  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);

    setFormData({
      client: invoice.client?._id || "",
      items: invoice.items || [
        { description: "", quantity: 1, price: 0 },
      ],
      dueDate: invoice.dueDate?.split("T")[0] || "",
      status: invoice.status || "unpaid",
    });

    setOpenModal(true);
  };

  /* ================= CREATE / UPDATE ================= */
  const handleSubmit = async () => {
    try {
      if (editingInvoice) {
        // UPDATE
        await api.patch(
          `/invoices/${editingInvoice._id}`,
          formData
        );

        toast.success("Invoice updated successfully");
      } else {
        // CREATE
        await api.post("/invoices", formData);

        toast.success("Invoice created successfully");
      }

      // Reset
      setOpenModal(false);
      setEditingInvoice(null);
      setFormData(initialState);

      refresh();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Operation failed"
      );
    }
  };

  return {
    clients,
    openModal,
    setOpenModal,
    aiLoading,
    formData,
    setFormData,
    editingInvoice,
    handleAIUpload,
    handleSubmit,
    handleEdit,
  };
};