import React, { useState, useContext } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login(formData.email, formData.password);

      toast.success("Login successful 🎉");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-950 rounded-2xl shadow-2xl p-8 border dark:border-slate-800">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">
            Nexora
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Sign in to your workspace
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Email
            </label>
            <div className="mt-2 flex items-center border rounded-xl px-3 py-2 bg-gray-50 dark:bg-slate-800 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500 transition">
              <Mail size={18} className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="admin@nexora.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-gray-200"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Password
            </label>
            <div className="mt-2 flex items-center border rounded-xl px-3 py-2 bg-gray-50 dark:bg-slate-800 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500 transition">
              <Lock size={18} className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-gray-200"
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-indigo-600 cursor-pointer hover:underline"
            >
              Forgot Password?
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-xl font-medium shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 space-y-3">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-indigo-600 cursor-pointer font-medium hover:underline"
            >
              Create one
            </span>
          </p>

          <p className="text-center text-xs text-gray-400">
            © 2026 Nexora SaaS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;