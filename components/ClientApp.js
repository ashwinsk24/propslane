"use client"; // This directive is ESSENTIAL. It marks this as a Client Component.

import { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import PropertyCard from "./PropertyCard";
import PropertyDetailView from "./PropertyDetailView";
import BookingModal from "./BookingModal";
import Footer from "./Footer";

// This component now acts as the main container for the interactive part of the app.
export default function ClientApp({ data }) {
  const [view, setView] = useState("list"); // 'list' or 'detail'
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Simulate loading on initial mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500); // Simulate initial load
    return () => clearTimeout(timer);
  }, []);

  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
    setView("detail");
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedProperty(null);
  };

  const handleOpenModal = (property) => {
    setSelectedProperty(property); // Make sure property is set for modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { agent, properties } = data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header agent={agent} />
      <main className="p-4 sm:p-8 animate-fade-in">
        {view === "list" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop, index) => (
              <PropertyCard
                key={index}
                property={prop}
                onSelect={handleSelectProperty}
                onBook={() => handleOpenModal(prop)}
              />
            ))}
          </div>
        )}

        {view === "detail" && selectedProperty && (
          <PropertyDetailView
            property={selectedProperty}
            onBack={handleBackToList}
            onBook={() => handleOpenModal(selectedProperty)}
          />
        )}

        {properties.length === 0 && view === "list" && (
          <div className="text-center py-20 col-span-full">
            <h2 className="text-2xl font-semibold text-white">
              No Properties Found
            </h2>
            <p className="text-gray-400 mt-2">
              This agent currently has no active listings. Please check back
              later.
            </p>
          </div>
        )}
      </main>
      {isModalOpen && selectedProperty && (
        <BookingModal
          property={selectedProperty}
          agent={agent}
          onClose={handleCloseModal}
        />
      )}
      <Footer />
    </div>
  );
}
