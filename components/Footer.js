export default function Footer({ agent }) {
  if (!agent) return null;

  return (
    <footer className="bg-white mt-12 border-slate-200">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-semibold text-slate-700">{agent.name}</p>
        <p className="text-sm text-slate-500 mt-1">
          {agent.contactEmail} | {agent.contactPhone}
        </p>
        <p className="mt-4 text-xs text-slate-400">
          © 2025 {agent.name} | Powered by Propslane.
        </p>
      </div>
    </footer>
  );
}
