import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

/**
 * Main Application Layout
 * - Sidebar
 * - Topbar
 * - Routed Content via Outlet
 */
const Layout = () => {
  return (
    <div className="min-h-screen flex bg-app-lightBg text-app-lightText dark:bg-app-darkBg dark:text-app-darkText transition-colors duration-300">

      {/* Sidebar */}
      <Sidebar />

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col">

        {/* Top Navigation */}
        <Topbar />

        {/* Routed Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default Layout;