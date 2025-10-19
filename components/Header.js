export default function Header({ agent }) {
  if (!agent) return null;

  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-lg z-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <img
              src={agent.logoUrl}
              alt={`${agent.name} Logo`}
              className="h-10 object-contain"
            />
            <span className="text-xl font-bold text-gray-900 tracking-wider">
              {agent.name}
            </span>
          </div>

          <a
            href={`mailto:${agent.contactEmail}`}
            className="hidden sm:inline-block bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Agent
          </a>
        </div>
      </div>
    </header>
  );
}
