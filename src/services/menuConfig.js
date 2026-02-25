import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  BarChart3,
  Settings,
} from "lucide-react";

import { ROUTES } from "../constants/routes";

/**
 * Navigation Configuration
 * - Role-based access
 * - Centralized routing
 * - Future-ready structure
 */
export const menuConfig = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: ROUTES.DASHBOARD,
    roles: ["owner", "manager", "staff"],
  },
  {
    id: "clients",
    label: "Clients",
    icon: Users,
    path: ROUTES.CLIENTS,
    roles: ["owner", "manager"],
  },
  {
    id: "invoices",
    label: "Invoices",
    icon: FileText,
    path: ROUTES.INVOICES,
    roles: ["owner", "manager"],
  },
  {
    id: "expenses",
    label: "Expenses",
    icon: DollarSign,
    path: ROUTES.EXPENSES,
    roles: ["owner", "manager"],
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    path: ROUTES.REPORTS,
    roles: ["owner", "manager"],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    path: ROUTES.SETTINGS,
    roles: ["owner"],
  },
];