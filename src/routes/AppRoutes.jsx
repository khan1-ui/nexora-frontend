import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Layout from "@/components/layout/Layout";

import DashboardPage from "@/features/dashboard/dashboard.page";
import ClientsPage from "@/features/clients/clients.page";
import InvoicesPage from "@/features/invoices/invoices.page";
import InvoicesTrashPage from "@/features/invoices/InvoicesTrashPage";
import ExpensesPage from "@/features/expenses/expenses.page";
import ExpenseTrashPage from "@/features/expenses/ExpenseTrashPage";
import ReportsPage from "@/features/reports/reports.page";
import SettingsPage from "@/features/settings/settings.page";
import NotificationsPage from "@/features/notification/NotificationsPage";
import AIPage from "@/features/ai/ai.page";

import Register from "@/pages/Register";
import Login from "@/pages/Login";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword  from "@/pages/ResetPassword";


const AppRoutes = () => {
  return (
    <Routes>

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Protected Wrapper */}
      <Route element={<ProtectedRoute />}>

        {/* Layout Wrapper */}
        <Route element={<Layout />}>

          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="ai" element={<AIPage />} />

        </Route>

      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
      <Route path="/invoices/trash" element={<InvoicesTrashPage />} />
       <Route path="/expenses/trash" element={<ExpenseTrashPage />} />

    </Routes>
  );
};

export default AppRoutes;