import React from "react";

export default function SuccessModal({ open, onClose, tittle, message }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md text-center">
        {/*  <h2 className="text-2xl font-semibold mb-4">Registration Successful</h2>*/}
        <h2 className="text-2xl font-semibold mb-4">{tittle}</h2>
        {/*<p className="text-gray-700 mb-6">
          Your account has been created successfully!
        </p>*/}
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
