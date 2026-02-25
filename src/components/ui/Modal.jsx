import React from 'react';
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-950 w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
          {title}
        </h3>

        {children}
      </div>
    </div>
  );
};

export default Modal;
