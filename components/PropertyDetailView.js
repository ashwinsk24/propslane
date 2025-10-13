import { BedIcon, BathIcon, MaximizeIcon } from "./Icons";

export default function PropertyDetailView({ property, onBack, onBook }) {
  const formatCurrency = (price) => {
    if (!price) return "Price upon request";
    return new Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      <button
        onClick={onBack}
        className="text-cyan-400 hover:text-cyan-300 mb-6 font-semibold"
      >
        &larr; Back to Listings
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Image Gallery Column */}
        <div className="lg:col-span-3">
          <img
            src={property.imageUrl}
            alt={`View of ${property.address}`}
            className="w-full h-auto object-cover rounded-2xl shadow-2xl mb-4"
          />
          <div className="grid grid-cols-3 gap-2">
            {property.gallery?.slice(0, 3).map((img, index) => (
              <img
                key={index}
                src={img.url} // Airtable attachments have a 'url' property
                className="w-full h-24 object-cover rounded-lg"
                alt={`Gallery image ${index + 1} for ${property.address}`}
              />
            ))}
          </div>
        </div>

        {/* Details Column */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-6 rounded-2xl sticky top-24">
            <h1 className="text-3xl font-bold text-white mb-1">
              {property.address}
            </h1>
            <p className="text-3xl font-light text-cyan-400 mb-4">
              {formatCurrency(property.price)}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-300 border-y border-gray-700 py-4 mb-4">
              <span>
                <BedIcon /> {property.bedrooms} beds
              </span>
              <span>
                <BathIcon /> {property.bathrooms} baths
              </span>
              <span>
                <MaximizeIcon /> {property.sqft} sqft
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {property.description}
            </p>
            <div className="space-y-3">
              <a
                href={property.matterportUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-700 transition-colors text-lg"
              >
                View 3D Tour
              </a>
              <button
                onClick={() => onBook(property)}
                className="w-full bg-gray-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors text-lg"
              >
                Book a Viewing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
