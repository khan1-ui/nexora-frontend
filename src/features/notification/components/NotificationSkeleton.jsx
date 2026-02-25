import Skeleton from "@/components/ui/Skeleton";

const NotificationSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
};

export default NotificationSkeleton;