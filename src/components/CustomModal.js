import React, { useState } from "react";

const CustomModal = ({ isOpen, onClose, children }) => {
  const [modalClasses, setModalClasses] = useState(
    "fixed inset-0 w-full h-full flex items-center justify-center transition-opacity duration-300"
  );

  const closeModal = () => {
    setModalClasses(
      "fixed inset-0 w-full h-full flex items-center justify-center opacity-0"
    );
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <>
      {isOpen && (
        <div className={modalClasses}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-8 rounded-md z-10">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 p-4 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default CustomModal;
