"use client"; // This component now uses hooks, so it must be a client component.

import { useState, useEffect } from "react";

// An array of short, inspiring messages to display while loading.
const loadingMessages = [
  "Finding your happy place...",
  "Unlocking the door to your new home...",
  "Crafting your property showcase...",
  "The journey to home begins now...",
  "Let's find a space you'll love...",
];

// A simple SVG house icon component.
const HouseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-16 w-16 text-blue-600"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

export default function LoadingSpinner() {
  // Start with a predictable index to avoid hydration errors.
  const [messageIndex, setMessageIndex] = useState(0);

  // This effect runs only ONCE on the client after the component mounts.
  useEffect(() => {
    // It picks a random starting index and sets it.
    const randomStartIndex = Math.floor(Math.random() * loadingMessages.length);
    setMessageIndex(randomStartIndex);

    // There is no interval, so the message will not change again.
  }, []); // The empty dependency array [] is crucial.

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 text-gray-800">
      <div className="animate-pulse">
        <HouseIcon />
      </div>
      <p className="mt-6 text-lg font-semibold text-gray-600">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
}
