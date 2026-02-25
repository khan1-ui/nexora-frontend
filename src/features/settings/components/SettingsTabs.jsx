/**
 * SettingsTabs
 *
 * Tab navigation between Company & Account
 */

const SettingsTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-4 border-b dark:border-slate-800 pb-3">
      {["company", "account"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
            activeTab === tab
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 dark:bg-slate-800"
          }`}
        >
          {tab === "company"
            ? "Company Settings"
            : "Account Settings"}
        </button>
      ))}
    </div>
  );
};

export default SettingsTabs;