import { useEffect, useState, useCallback } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get("/notifications");

      setNotifications(res.data.data || []);
      setUnreadCount(res.data.unreadCount || 0);
    } catch {
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        )
      );

      setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
    } catch {
      toast.error("Failed to mark as read");
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.patch("/notifications/read-all");

      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );

      setUnreadCount(0);
    } catch {
      toast.error("Failed to mark all");
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications((prev) =>
        prev.filter((n) => n._id !== id)
      );
      toast.success("Notification removed");
    } catch {
      toast.error("Delete failed");
    }
  };

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  return {
    notifications: filteredNotifications,
    loading,
    filter,
    setFilter,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    unreadCount,
  };
};