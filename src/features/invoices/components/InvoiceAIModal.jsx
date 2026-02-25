import Modal from "@/components/ui/Modal";
import { useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

const InvoiceAIModal = ({
  open,
  setOpen,
  onAutoFill,
}) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post(
        "/ai/invoice-ocr",
        formData
      );

      onAutoFill(res.data.data);
      setOpen(false);

      toast.success("Invoice data extracted!");

    } catch {
      toast.error("AI extraction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={open}
      onClose={() => setOpen(false)}
      title="AI Invoice Scan"
    >
      <div className="space-y-4 text-center">

        <input
          type="file"
          accept=".pdf,.jpg,.png"
          onChange={handleUpload}
        />

        {loading && (
          <p className="text-purple-600">
            AI is reading invoice...
          </p>
        )}
      </div>
    </Modal>
  );
};

export default InvoiceAIModal;