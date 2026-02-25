import Skeleton from "@/components/ui/Skeleton";

/**
 * InvoiceSkeleton Component
 *
 * Purpose:
 * - Loading placeholder for invoice table
 * - Improves perceived performance
 * - Prevents layout shift
 */
const InvoiceSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-lg border dark:border-slate-800 p-6 space-y-4">

      {/* Header Placeholder */}
      <Skeleton className="h-6 w-1/3" />

      {/* Row placeholders */}
      {[...Array(5)].map((_, index) => (
        <Skeleton key={index} className="h-10 w-full" />
      ))}

    </div>
  );
};

export default InvoiceSkeleton;