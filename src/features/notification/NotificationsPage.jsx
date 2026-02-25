import { useNotifications } from "./hooks/useNotifications";
import NotificationHeader from "./components/NotificationHeader";
import NotificationList from "./components/NotificationList";
import NotificationSkeleton from "./components/NotificationSkeleton";

const NotificationsPage = () => {
  const notificationLogic = useNotifications();

  if (notificationLogic.loading)
    return <NotificationSkeleton />;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">

      <NotificationHeader
        unreadCount={notificationLogic.unreadCount}
        markAll={notificationLogic.markAllAsRead}
      />

      <NotificationList {...notificationLogic} />

    </div>
  );
};

export default NotificationsPage;