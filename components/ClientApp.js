"use client";

import { useState, useMemo } from "react";
import Header from "./Header";
import PropertyCard from "./PropertyCard";
import PropertyDetailView from "./PropertyDetailView";
import BookingModal from "./BookingModal";
import SkeletonCard from "./SkeletonCard";
import Footer from "./Footer";

// This component now acts as the main container for the interactive part of the app.
export default function ClientApp({ data }) {
  const [view, setView] = useState("list"); // 'list' or 'detail'
  const [isExiting, setIsExiting] = useState(false); // For view transitions
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [properties, setProperties] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // --- NEW: State to manage all filter values ---
  const [filters, setFilters] = useState({
    price: "all",
    beds: "all",
    // These are placeholders for future use, not tied to data yet
    status: "all",
    type: "all",
  });

  // This function updates the filter state when a dropdown changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // --- NEW: Filtering Logic ---
  // useMemo will re-calculate the filtered list only when the original data or the filters change.
  const filteredProperties = useMemo(() => {
    // Start with the full list of properties from the server.
    // The '|| []' prevents errors if data.properties is not available.
    let propertiesToFilter = data.properties || [];

    // 1. Filter by Price
    if (filters.price !== "all") {
      const [min, max] = filters.price.split("-").map(Number);
      propertiesToFilter = propertiesToFilter.filter(
        (p) => p.price >= min && p.price <= (max || Infinity)
      );
    }

    // 2. Filter by Bedrooms
    if (filters.beds !== "all") {
      const minBeds = parseInt(filters.beds, 10);
      propertiesToFilter = propertiesToFilter.filter(
        (p) => p.bedrooms >= minBeds
      );
    }

    return propertiesToFilter;
  }, [data.properties, filters]); // Dependencies for useMemo

  // NOTE: The original `isLoading` and `properties` states are removed
  // because we now derive the list directly from the `data` prop.
  // This is a more robust approach.

  const changeView = (newView, property = null) => {
    setIsExiting(true); // Start exit animation
    setTimeout(() => {
      setView(newView);
      setSelectedProperty(property);
      setIsExiting(false); // End exit animation, new view will animate in
      window.scrollTo(0, 0);
    }, 300); // Duration should match the fadeOut animation
  };

  const handleSelectProperty = (property) => {
    changeView("detail", property);
  };

  const handleBackToList = () => {
    changeView("list");
  };

  const handleOpenModal = (property) => {
    setSelectedProperty(property); // Make sure property is set for modal
    setIsModalOpen(true);
  };

  const { agent } = data;

  return (
    <div className="bg-slate-100 min-h-screen">
      <Header agent={agent} />
      <main className={isExiting ? "animate-fade-out" : "animate-fade-in"}>
        {view === "list" && (
          <div>
            {/* --- CHANGE: Filter dropdowns are now connected to state --- */}
            <div className="p-4 sm:p-6 bg-white border-b border-slate-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* --- Status Dropdown --- */}
                <div className="relative">
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="w-full p-2.5 pr-8 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                  >
                    <option value="all">Any Status</option>
                    <option value="tolet">To Let</option>
                  </select>
                  {/* Custom Arrow */}
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>

                {/* --- Type Dropdown --- */}
                <div className="relative">
                  <select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    className="w-full p-2.5 pr-8 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                  >
                    <option value="all">Any Type</option>
                    <option value="house">House</option>
                    <option value="flat">Flat</option>
                  </select>
                  {/* Custom Arrow */}
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>

                {/* --- Price Dropdown --- */}
                <div className="relative">
                  <select
                    name="price"
                    value={filters.price}
                    onChange={handleFilterChange}
                    className="w-full p-2.5 pr-8 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                  >
                    <option value="all">Any Price</option>
                    <option value="0-3000">£0 - £3,000</option>
                    <option value="3000-5000">£3,000 - £5,000</option>
                    <option value="5000-Infinity">£5,000+</option>
                  </select>
                  {/* Custom Arrow */}
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>

                {/* --- Beds Dropdown --- */}
                <div className="relative">
                  <select
                    name="beds"
                    value={filters.beds}
                    onChange={handleFilterChange}
                    className="w-full p-2.5 pr-8 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                  >
                    <option value="all">Any Beds</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                  {/* Custom Arrow */}
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Grid */}
            {/* --- CHANGE: Now we map over the `filteredProperties` array --- */}
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    onSelect={handleSelectProperty}
                    onBook={() => handleOpenModal(prop)}
                  />
                ))
              ) : (
                // --- NEW: A helpful message when no properties match the filters ---
                <div className="col-span-full text-center py-12 text-slate-500">
                  <h3 className="text-xl font-semibold">No Properties Found</h3>
                  <p className="mt-2">
                    Try adjusting your filters to find your requirements.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {view === "detail" && selectedProperty && (
          <PropertyDetailView
            property={selectedProperty}
            onBack={handleBackToList}
            onBook={() => handleOpenModal(selectedProperty)}
          />
        )}
      </main>

      {isModalOpen && selectedProperty && (
        <BookingModal
          property={selectedProperty}
          agent={agent}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <Footer agent={agent} />
    </div>
  );
}
