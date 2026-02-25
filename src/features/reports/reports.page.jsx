/**
 * ReportsPage
 *
 * Feature entry point
 * Clean orchestration only
 */

import { useReports } from "./hooks/useReports";
import ReportsHeader from "./components/ReportsHeader";
import ReportsFilters from "./components/ReportsFilters";
import ReportsSummaryCards from "./components/ReportsSummaryCards";
import ReportsChart from "./components/ReportsChart";
import ReportsSkeleton from "./components/ReportsSkeleton";

const ReportsPage = () => {
  const { data, loading, filters, setFilters } =
    useReports();

  if (loading) return <ReportsSkeleton />;

  return (
    <div className="space-y-8">

      <ReportsHeader />

      <ReportsFilters
        filters={filters}
        setFilters={setFilters}
      />

      <ReportsSummaryCards data={data} />

      <ReportsChart data={data} />

    </div>
  );
};

export default ReportsPage;