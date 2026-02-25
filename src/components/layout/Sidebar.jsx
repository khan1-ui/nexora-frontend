import { NavLink } from "react-router-dom";
import { useContext, useState,useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { menuConfig } from "../../services/menuConfig";
import { X, Menu } from "lucide-react";

/**
 * Responsive Sidebar
 * - Desktop: Fixed sidebar
 * - Mobile: Slide-over drawer
 */

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const userRole = user?.role || "staff";

  const filteredMenu = menuConfig.filter((item) =>
    item.roles.includes(userRole)
  );
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [isOpen]);
  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={20} />
      </button>

      {/* Overlay (Mobile Only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static top-0 left-0 z-50 h-full w-64
          bg-gradient-to-b from-white to-gray-50 
          dark:from-slate-950 dark:to-slate-900
          border-r dark:border-slate-800
          flex flex-col
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b dark:border-slate-800">
         <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Nexora
        </h1>

          {/* Close button (mobile) */}
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {filteredMenu.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                }`
              }
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">
                {item.label}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;