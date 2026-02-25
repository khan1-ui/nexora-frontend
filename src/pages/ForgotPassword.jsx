import React, { useState } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post("/auth/forgot-password", { email });

      toast.success("Reset link generated ✅");

      // Demo purpose: show link in console
      if (data.resetUrl) {
        console.log("Reset URL:", data.resetUrl);
      }

    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Request failed"
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
            Forgot Password
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Enter your email to receive reset link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="text-sm font-medium">Email</label>
            <div className="mt-2 flex items-center border rounded-xl px-3 py-2 bg-gray-50 dark:bg-slate-800 dark:border-slate-700">
              <Mail size={18} className="text-gray-400 mr-2" />
              <input
                type="email"
                required
                placeholder="admin@nexora.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-xl font-medium shadow-lg disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p
          onClick={() => navigate("/login")}
          className="text-center text-sm text-indigo-600 cursor-pointer mt-6 hover:underline"
        >
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;