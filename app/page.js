import { headers } from "next/headers";
import ClientApp from "@/components/ClientApp";

// This is a NEXT.JS SERVER COMPONENT.
// It runs on the server to fetch data before the page is sent to the browser.

export default async function HomePage() {
  const headersList = headers();
  let data = null;
  let error = null;

  try {
    const host = headersList.get("x-forwarded-host") || headersList.get("host");

    // --- MORE ROBUST SUBDOMAIN DETECTION ---
    // This logic now correctly differentiates between the main domain, Vercel preview URLs, and custom subdomains.
    let subdomain;
    const rootHosts = [
      "propslane.com", // Your final production domain
      "propslane.vercel.app", // Your Vercel production domain
      process.env.VERCEL_URL, // The dynamic Vercel deployment URL (e.g., propslane-xyz.vercel.app)
      "localhost:3000",
    ];

    if (rootHosts.includes(host)) {
      // If the host is one of the main domains, we use the 'propslane' agent.
      subdomain = "propslane";
    } else {
      // Otherwise, we assume it's a custom agent subdomain.
      subdomain = host.split(".")[0];
    }

    // --- MORE RELIABLE SERVER-SIDE API FETCH ---
    // We construct the base URL directly from the host header, which is more reliable than VERCEL_URL.
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/${subdomain}`, {
      cache: "no-store", // Disable caching to always get fresh data
    });

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(
        `Failed to fetch data for subdomain: ${subdomain}. API responded with: ${JSON.stringify(
          errorBody
        )}`
      );
    }
    data = await res.json();
  } catch (err) {
    console.error(err);
    error = err.message;
  }

  // --- RENDER PAGE ---
  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold">Oops! Something went wrong.</h1>
          <p className="text-gray-400 mt-2 mb-4">
            We could not find the microsite you are looking for.
          </p>
          <p className="text-xs text-gray-600">Error Details: {error}</p>
        </div>
      </div>
    );
  }

  return <ClientApp data={data} />;
}
