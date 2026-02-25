import Skeleton from "@/components/ui/Skeleton";

/**
 * ReportsSkeleton
 *
 * Prevent layout shift while loading
 */

const ReportsSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-80 w-full" />
    </div>
  );
};

export default ReportsSkeleton;