/**
 * ClientSkeleton
 *
 * Loading placeholder for client table
 * Prevents layout shift
 */

import Skeleton from "@/components/ui/Skeleton";

const ClientSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-lg border dark:border-slate-800 p-6 space-y-4">

      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex justify-between items-center"
        >
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}

    </div>
  );
};

export default ClientSkeleton;