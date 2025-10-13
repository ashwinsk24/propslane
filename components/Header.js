export default function Header({ agent }) {
  if (!agent) return null;

  return (
    <header className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700/50 p-4 sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src={agent.logoUrl}
            alt={`${agent.name} Logo`}
            className="h-10 object-contain"
          />
          <span className="text-xl font-bold text-white tracking-wider">
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
    </header>
  );
}
