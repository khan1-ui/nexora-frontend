/**
 * useClients Hook
 *
 * Handles:
 * - Fetching clients
 * - Search
 * - Pagination
 * - Sorting
 */

import { useState, useEffect, useCallback } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get("/clients", {
        params: {
          page: currentPage,
          limit,
          search,
          sort: sortField,
          order: sortOrder,
        },
      });

      setClients(res.data.data || []);
      setMeta(res.data.meta || {});
    } catch {
      toast.error("Failed to fetch clients");
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, sortField, sortOrder, limit]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) =>
        prev === "asc" ? "desc" : "asc"
      );
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return {
    clients,
    meta,
    loading,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    handleSort,
    fetchClients,
  };
};