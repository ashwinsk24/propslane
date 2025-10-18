"use client"; // This component uses state, so it must be a client component.

import { useState, useEffect } from "react";
import { XIcon } from "./Icons";

export default function BookingModal({ property, agent, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Effect to handle closing the modal with the Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Handles the closing animation before calling the parent's onClose function
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Duration should match the animation
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this form data to an API endpoint
    console.log(
      `Form submitted for ${property.address} to ${agent.contactEmail}`
    );
    setIsSubmitted(true);
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-600 bg-opacity-10 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${
        isClosing ? "opacity-10" : "opacity-100"
      }`}
    >
      <div
        className={`bg-white text-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md relative transform transition-all duration-300 ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {isSubmitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Thank You!
            </h2>
            <p className="text-gray-600 mt-2">
              Your viewing request has been sent to {agent.name}.
            </p>
            <p className="text-gray-500 mt-1">
              They will be in touch with you shortly.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Book a Viewing</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-700 absolute top-4 right-4"
              >
                <XIcon />
              </button>
            </div>
            <p className="text-gray-500 mb-1">Enquire about property:</p>
            <p className="text-gray-900 font-semibold text-lg mb-6">
              {property.address}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
              />
              <textarea
                placeholder="Your message (optional)"
                rows="3"
                className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                Send Enquiry
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
