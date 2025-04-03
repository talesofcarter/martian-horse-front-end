// components/ConfirmationModal.jsx
import { useEffect } from "react";
import { createPortal } from "react-dom";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="relative z-50 w-full max-w-md mx-4 transform overflow-hidden rounded-lg bg-white shadow-2xl transition-all">
        <div className="px-6 py-5">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{message}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ConfirmationModal;
