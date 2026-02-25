import {
  Sun,
  Moon,
  LogOut,
  Bell,
  ChevronDown,
} from "lucide-react";
import { useContext, useState, useRef, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";
import api from "../../services/api";
import { Link } from "react-router-dom";

const Topbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingNotif, setLoadingNotif] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const socketRef = useRef(null);

  /* ================= GREETING ================= */
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  /* ================= SAFE FETCH ================= */
  const fetchNotifications = async () => {
    try {
      setLoadingNotif(true);
      const res = await api.get("/notifications");
      setNotifications(res.data?.data || []);
      setUnreadCount(res.data?.unreadCount || 0);
    } catch (err) {
      console.error("Notification fetch failed", err);
    } finally {
      setLoadingNotif(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  /* ================= SOCKET REALTIME ================= */
  useEffect(() => {
    if (!user?.company?._id) return;

    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) return;

    const baseUrl = apiUrl.replace("/api", "");

    socketRef.current = io(baseUrl, {
      transports: ["websocket"],
      reconnection: true,
    });

    socketRef.current.emit("joinCompany", user.company._id);

    socketRef.current.on("newNotification", (data) => {
      setNotifications((prev) => {
        if (prev.some((n) => n._id === data._id)) return prev;
        return [data, ...prev];
      });

      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [user]);

  /* ================= OUTSIDE CLICK ================= */
  useEffect(() => {
    const handler = (e) => {
      if (!profileRef.current?.contains(e.target))
        setProfileOpen(false);

      if (!notifRef.current?.contains(e.target))
        setNotifOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ================= MARK SINGLE ================= */
  const markAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        )
      );

      setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
    } catch (err) {
      console.error("Mark as read failed", err);
    }
  };

  /* ================= MARK ALL ================= */
  const markAllAsRead = async () => {
    try {
      await api.patch("/notifications/read-all");

      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );

      setUnreadCount(0);
    } catch (err) {
      console.error("Mark all failed", err);
    }
  };

  /* ================= REFRESH WHEN OPEN ================= */
  useEffect(() => {
    if (notifOpen) fetchNotifications();
  }, [notifOpen]);

  return (
    <header className="h-20 bg-white dark:bg-slate-950 border-b dark:border-slate-800 px-4 md:px-8 flex items-center justify-between shadow-sm">

      {/* LEFT */}
      <div className="hidden md:block">
        <h2 className="text-lg font-semibold">
          {getGreeting()}, {user?.name || "User"} 👋
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Welcome back to Nexora Dashboard
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative"
          >
            <Bell size={22} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[18px] h-5 px-1 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-4 w-80 max-w-[95vw] bg-white dark:bg-slate-900 rounded-2xl shadow-xl border dark:border-slate-800 p-4 z-50 max-h-96 overflow-y-auto">

              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-semibold">
                  Notifications
                </h4>

                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-indigo-600 hover:underline"
                  >
                    Mark all
                  </button>
                )}
              </div>

              {loadingNotif && (
                <p className="text-sm text-gray-400">
                  Loading...
                </p>
              )}

              {!loadingNotif && notifications.length === 0 && (
                <p className="text-sm text-gray-400">
                  No notifications
                </p>
              )}

              {notifications.slice(0, 5).map((notif) => (
                <div
                  key={notif._id}
                  onClick={() =>
                    !notif.isRead && markAsRead(notif._id)
                  }
                  className={`p-3 mb-2 rounded-xl cursor-pointer transition ${
                    notif.isRead
                      ? "bg-gray-50 dark:bg-slate-800"
                      : "bg-indigo-50 dark:bg-indigo-900"
                  }`}
                >
                  <p className="text-sm font-medium">
                    {notif.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {notif.message}
                  </p>
                </div>
              ))}

              {/* View All Link */}
              <Link
                to="/notifications"
                className="block text-center text-sm text-indigo-600 mt-3 hover:underline"
                onClick={() => setNotifOpen(false)}
              >
                View All Notifications
              </Link>

            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition"
          >
            <img
              src={user?.avatar || "https://i.pravatar.cc/40"}
              alt="avatar"
              className="w-9 h-9 rounded-full border-2 border-indigo-500"
            />
            <ChevronDown size={16} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-4 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border dark:border-slate-800 py-2 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                Profile
              </Link>

              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-800 text-red-600"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Topbar;