import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useDashboardData } from "./hooks/useDashboardData";
import DashboardSkeleton from "./components/DashboardSkeleton";
import DashboardStats from "./components/DashboardStats";
import DashboardChart from "./components/DashboardChart";
import DashboardLists from "./components/DashboardLists";
import DashboardQuickActions from "./components/DashboardQuickActions";
import AIAssistantModal from "./components/AIAssistantModal";

/**
 * Dashboard Page
 * Clean, modular, scalable
 * AI Assistant Integrated
 */
const DashboardPage = () => {
  const { stats, chartData, loading } = useDashboardData();
  const [aiOpen, setAIOpen] = useState(false);

  if (loading) return <DashboardSkeleton />;

  return (
    <>
      <div className="space-y-10">

        <DashboardStats stats={stats} />

        <DashboardChart chartData={chartData} />

        <DashboardLists
          outstandingInvoices={stats?.outstandingInvoices}
          latestExpenses={stats?.latestExpenses}
          recentClients={stats?.recentClients}
        />

        <DashboardQuickActions />

      </div>

      {/* ===== Floating AI Button ===== */}
      <button
        onClick={() => setAIOpen(true)}
        className="fixed bottom-6 right-6 z-50
                   bg-gradient-to-r from-indigo-600 to-purple-600
                   hover:opacity-90
                   text-white
                   p-4 rounded-full
                   shadow-2xl
                   transition-all duration-300"
      >
        <Sparkles size={22} />
      </button>

      {/* ===== AI Assistant Modal ===== */}
      <AIAssistantModal
        open={aiOpen}
        setOpen={setAIOpen}
      />
    </>
  );
};

export default DashboardPage;