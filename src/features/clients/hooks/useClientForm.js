import { useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

export const useClientForm = (refresh) => {
  const [openModal, setOpenModal] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const [formData, setFormData] = useState({
    _id: null,
    name: "",
    email: "",
    phone: "",
  });

  /* ================= CREATE / UPDATE ================= */
  const handleSubmit = async () => {
    try {
      if (formData._id) {
        // UPDATE
        await api.patch(`/clients/${formData._id}`, formData);
        toast.success("Client updated successfully");
      } else {
        // CREATE
        await api.post("/clients", formData);
        toast.success("Client created successfully");
      }

      setOpenModal(false);
      resetForm();
      refresh();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const handleEdit = (client) => {
    setFormData(client);
    setOpenModal(true);
  };

  const resetForm = () => {
    setFormData({
      _id: null,
      name: "",
      email: "",
      phone: "",
    });
  };

  /* ================= DELETE ================= */
  const openDeleteConfirm = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/clients/${selectedId}`);
      toast.success("Client deleted successfully");
      setConfirmOpen(false);
      refresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  return {
    openModal,
    setOpenModal,
    confirmOpen,
    setConfirmOpen,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    openDeleteConfirm,
    handleDelete,
  };
};