import Skeleton from "@/components/ui/Skeleton";

/**
 * SettingsSkeleton
 */

const SettingsSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-8 w-40" />
    <Skeleton className="h-40 w-full" />
  </div>
);

export default SettingsSkeleton;