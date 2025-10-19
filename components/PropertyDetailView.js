import { BedIcon, BathIcon, SizeIcon } from "./Icons";
import { formatCurrency } from "../utils/formatters";

export default function PropertyDetailView({ property, onBack, onBook }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Back to all properties
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <img
            src={property.imageUrl}
            alt={`View of ${property.title}`}
            className="w-full h-auto object-cover rounded-xl shadow-lg aspect-[16/10]"
          />
        </div>

        {/* <div className="grid grid-cols-3 gap-2">
          {property.gallery?.slice(0, 3).map((img, index) => (
            <img
              key={index}
              src={img.url} // Airtable attachments have a 'url' property
              className="w-full h-24 object-cover rounded-lg"
              alt={`Gallery image ${index + 1} for ${property.address}`}
            />
          ))}
        </div> */}

        {/* Details Column */}
        <div className="flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {property.title}
          </h1>
          <p className="mt-2 text-lg text-slate-500">{property.address}</p>
          <p className="mt-4 text-5xl font-bold text-blue-500">
            {formatCurrency(property.price)} pcm
          </p>

          <div className="my-6 flex items-center space-x-6 text-slate-600 border-t border-b py-4">
            <span className="flex items-center gap-2 text-lg">
              <BedIcon /> {property.bedrooms} beds
            </span>
            <span className="flex items-center gap-2 text-lg">
              <BathIcon /> {property.bathrooms} baths
            </span>
            <span className="flex items-center gap-2 text-lg">
              <SizeIcon /> {property.sqft} sq.ft.
            </span>
          </div>

          <div className="mt-auto flex flex-col sm:flex-row gap-3">
            <a
              href={property.matterportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              View 3D Tour
            </a>
            <button
              onClick={() => onBook(property)}
              className="w-full text-center bg-white border-2 border-indigo-600 text-indigo-600 font-bold py-3 px-6 rounded-lg hover:bg-indigo-50 transition-all duration-200"
            >
              Book a Viewing
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white p-8 rounded-lg shadow-sm">
        <h3 className="text-2xl font-bold text-slate-800">
          Property Description
        </h3>
        <p className="mt-4 text-slate-600 leading-relaxed max-w-4xl">
          {property.description}
        </p>
      </div>
    </div>
  );
}
