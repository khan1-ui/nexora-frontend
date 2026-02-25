const NotificationHeader = ({
  unreadCount,
  markAll,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">
          Notifications
        </h2>
        <p className="text-sm text-gray-500">
          {unreadCount} unread notifications
        </p>
      </div>

      {unreadCount > 0 && (
        <button
          onClick={markAll}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm"
        >
          Mark All as Read
        </button>
      )}
    </div>
  );
};

export default NotificationHeader;