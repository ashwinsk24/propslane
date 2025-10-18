import { BedIcon, BathIcon, MaximizeIcon } from "./Icons";

export default function PropertyCard({ property, onSelect, onBook }) {
  const formatCurrency = (price) => {
    if (!price) return "Price upon request";
    return new Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-cyan-500/20 hover:ring-2 hover:ring-blue-500">
      <div
        className="relative overflow-hidden cursor-pointer"
        onClick={() => onSelect(property)}
      >
        <img
          src={property.imageUrl}
          alt={`View of ${property.address}`}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 bg-black/50 text-white text-lg font-bold p-2 rounded-lg">
          {formatCurrency(property.price)}
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
          {property.address}
        </h3>
        <div className="text-sm text-gray-500 mb-4 flex-wrap flex gap-x-4 gap-y-1">
          <span>
            <BedIcon /> {property.bedrooms} beds
          </span>
          <span>
            <BathIcon /> {property.bathrooms} baths
          </span>
          <span>
            <MaximizeIcon /> {property.sqft} sq.ft.
          </span>
        </div>
        <div className="mt-auto space-y-2">
          <a
            href={property.matterportUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View 3D Tour
          </a>
          <button
            onClick={() => onBook(property)}
            className="w-full bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Book a Viewing
          </button>
        </div>
      </div>
    </div>
  );
}
