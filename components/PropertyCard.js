import { BedIcon, BathIcon, SizeIcon } from "./Icons";
import { formatCurrency } from "../utils/formatters";

export default function PropertyCard({ property, onSelect }) {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onClick={() => onSelect(property)}
    >
      <div className="relative">
        <img
          src={property.imageUrl}
          alt={`View of ${property.title}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-black/50 text-white text-sm font-bold py-1 px-3 rounded-full backdrop-blur-sm">
          {formatCurrency(property.price)} pcm
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-800 truncate">
          {property.title}
        </h3>
        <p className="text-sm text-slate-500 mt-1 truncate">
          {property.address}
        </p>
        <div className="mt-4 flex items-center space-x-4 text-sm text-slate-500 border-t pt-3">
          <span className="flex items-center gap-2">
            <BedIcon /> {property.bedrooms} beds
          </span>
          <span className="flex items-center gap-2">
            <BathIcon /> {property.bathrooms} baths
          </span>
          <span className="flex items-center gap-2">
            <SizeIcon /> {property.sqft} sq.ft.
          </span>
        </div>
        {/* <div className="mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevents the onSelect of the card from firing
              onBook(property);
            }}
            className="w-full text-center bg-white border-2 border-indigo-600 text-indigo-600 font-bold py-2 px-4 rounded-lg hover:bg-indigo-50 transition-all text-sm"
          >
            Book a Viewing
          </button>
        </div> */}
      </div>
    </div>
  );
}
