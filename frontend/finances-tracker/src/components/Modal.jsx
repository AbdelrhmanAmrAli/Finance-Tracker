import React, { useEffect, useRef } from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus the modal container when opened
    modalRef.current?.focus();

    // Handle Escape key to close modal
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-y-auto p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative bg-white rounded-2xl shadow-card w-full max-w-lg max-h-[90vh] overflow-auto outline-none font-display"
        onClick={(e) => e.stopPropagation()} // prevent closing clicks inside modal
        tabIndex={-1} // enable focus
      >
        <div className="flex justify-between items-center p-5 border-b border-accent/30">
          <h3 id="modal-title" className="text-xl font-bold text-primary">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-accent hover:text-danger text-2xl font-bold px-2 focus:outline-none"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
