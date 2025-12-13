import React from "react";

const SessionExpiredModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    
    <div 
      
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg text-center">
        <h3 className="text-xl font-semibold mb-3">Session Expired</h3>
        <p className="mb-5">
          Your session has expired. Please log in again to continue shopping.
        </p>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          onClick={onClose}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
