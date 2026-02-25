import { Trash2 } from "lucide-react";

const NotificationList = ({
  notifications,
  markAsRead,
  deleteNotification,
  filter,
  setFilter,
}) => {
  return (
    <div className="space-y-6">

      {/* Filter Tabs */}
      <div className="flex gap-4">
        {["all", "unread"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-sm ${
              filter === tab
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 dark:bg-slate-800"
            }`}
          >
            {tab === "all" ? "All" : "Unread"}
          </button>
        ))}
      </div>

      {/* Timeline Style */}
      <div className="bg-white dark:bg-slate-950 rounded-2xl shadow border dark:border-slate-800 p-6 space-y-4">

        {notifications.length === 0 && (
          <p className="text-gray-400 text-sm">
            No notifications found.
          </p>
        )}

        {notifications.map((notif) => (
          <div
            key={notif._id}
            className={`flex justify-between items-start p-4 rounded-xl transition ${
              notif.isRead
                ? "bg-gray-50 dark:bg-slate-800"
                : "bg-indigo-50 dark:bg-indigo-900"
            }`}
          >
            <div
              onClick={() =>
                !notif.isRead &&
                markAsRead(notif._id)
              }
              className="cursor-pointer"
            >
              <p className="font-medium text-sm">
                {notif.title}
              </p>

              <p className="text-xs text-gray-500">
                {notif.message}
              </p>

              <p className="text-[10px] text-gray-400 mt-1">
                {new Date(
                  notif.createdAt
                ).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() =>
                deleteNotification(notif._id)
              }
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default NotificationList;