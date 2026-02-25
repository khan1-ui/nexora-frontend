import { useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

export const useAI = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async (file) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post(
        "/ai/invoice-ocr",
        formData
      );

      setResult(res.data.data);

    } catch {
      toast.error("AI extraction failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    result,
    loading,
    uploadFile,
  };
};