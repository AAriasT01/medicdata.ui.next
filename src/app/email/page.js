"use client";

import { useState } from "react";
import axios from "axios";

const SendEmail = () => {
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/send-email", {
        to_email: toEmail,
        subject: subject,
        body: body,
      });

      setMessage(response.data.message);
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Failed to send email. Please try again.");
      setMessage(""); // Clear any previous messages
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-center">Send Email</h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-600 uppercase">
              To Email
            </label>
            <input
              type="email"
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-600 uppercase">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-600 uppercase">
              Body
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-3 text-white bg-blue-600 rounded-md"
          >
            Send Email
          </button>
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default SendEmail;
