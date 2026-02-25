import Modal from "@/components/ui/Modal";
import { useState } from "react";
import api from "@/services/api";

const AIAssistantModal = ({ open, setOpen }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const res = await api.post("/ai/assistant", {
      message: input,
    });

    const aiMessage = {
      role: "assistant",
      text: res.data.data,
    };

    setMessages((prev) => [...prev, aiMessage]);
    setInput("");
  };

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} title="AI Assistant">
      <div className="space-y-4 h-96 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "text-right" : ""}>
            <p className="bg-gray-200 dark:bg-slate-800 p-2 rounded-xl">
              {msg.text}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-xl px-3 py-2"
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 rounded-xl"
        >
          Send
        </button>
      </div>
    </Modal>
  );
};

export default AIAssistantModal;