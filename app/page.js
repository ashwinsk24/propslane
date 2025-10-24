// This is your new root page, which handles "/"
// It is separate from the dynamic agent pages.

import Link from "next/link";

export default function RootHomePage() {
  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center">
      <div className="text-center p-8 max-w-2xl">
        <h1 className="text-5xl font-extrabold text-indigo-600 tracking-tight">
          Welcome to Propslane
        </h1>
        <p className="text-xl text-slate-700 mt-4">
          Your new hub for real estate agent microsites.
        </p>
        <p className="text-slate-500 mt-10">
          Agent sites are now available at their own paths. For example:
          <Link
            href="/propslane" // Example link to an agent page
            className="block mt-2 text-lg font-semibold text-blue-600 hover:underline"
          >
            propslane.com/propslane
          </Link>
        </p>
      </div>
    </div>
  );
}
