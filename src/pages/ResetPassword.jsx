import React, { useState } from "react";
import { Lock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await api.put(`/auth/reset-password/${token}`, {
        password,
      });

      toast.success("Password reset successful 🎉");

      navigate("/login");

    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-950 rounded-2xl shadow-2xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">
            Reset Password
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Enter your new password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="text-sm font-medium">New Password</label>
            <div className="mt-2 flex items-center border rounded-xl px-3 py-2 bg-gray-50 dark:bg-slate-800 dark:border-slate-700">
              <Lock size={18} className="text-gray-400 mr-2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <div className="mt-2 flex items-center border rounded-xl px-3 py-2 bg-gray-50 dark:bg-slate-800 dark:border-slate-700">
              <Lock size={18} className="text-gray-400 mr-2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-xl font-medium shadow-lg disabled:opacity-70"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;