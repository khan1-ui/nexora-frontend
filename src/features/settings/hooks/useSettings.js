/**
 * useSettings Hook
 *
 * Handles:
 * - Fetch settings data
 * - Update company info
 * - Update profile
 * - Loading states
 */
import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";
export const useSettings = () => {
  const [company, setCompany] = useState({});
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      setLoading(true);

      const res = await api.get("/settings");

      setCompany(res.data.data.company);
      setProfile(res.data.data.profile);
    } catch (err) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateCompany = async () => {
    try {
      await api.put("/settings/company", company);
      toast.success("Company updated successfully");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const updateProfile = async () => {
    try {
      await api.put("/settings/profile", profile);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return {
    company,
    setCompany,
    profile,
    setProfile,
    updateCompany,
    updateProfile,
    loading,
  };
};
