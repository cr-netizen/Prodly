/**
 * Modal Component
 * Props:
 * isOpen
 * onClose
 * title
 * children
 */

import { useEffect } from "react";

function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape")
        onClose();
    };

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white p-6 rounded">

        <h2>{title}</h2>

        {children}

        <button
          onClick={onClose}
        >
          Close
        </button>

      </div>
    </div>
  );
}

export default Modal;