/**
 * ExpenseSkeleton
 *
 * Loading placeholder for expense table
 * Prevents layout shift
 */

import Skeleton from "@/components/ui/Skeleton";

const ExpenseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-950 
                    rounded-2xl shadow-lg 
                    border dark:border-slate-800 
                    p-6 space-y-4">

      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex justify-between items-center"
        >
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}

    </div>
  );
};

export default ExpenseSkeleton;