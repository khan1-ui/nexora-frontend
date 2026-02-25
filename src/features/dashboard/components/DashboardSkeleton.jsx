import Skeleton from "@/components/ui/Skeleton";

/**
 * Loading Skeleton for Dashboard
 */
const DashboardSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-950 p-6 rounded-3xl shadow-lg"
          >
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>

      <Skeleton className="h-96 w-full rounded-3xl" />
    </div>
  );
};

export default DashboardSkeleton;