import { headers } from "next/headers";
import ClientApp from "@/components/ClientApp";

// This is a NEXT.JS SERVER COMPONENT.
// It runs on the server to fetch data before the page is sent to the browser.

export default async function HomePage() {
  const headersList = headers();
  let data = null;
  let error = null;

  try {
    // --- ROBUST SUBDOMAIN DETECTION ---
    const host = headersList.get("x-forwarded-host") || headersList.get("host");

    let subdomain;
    // The VERCEL_URL variable is available in Vercel deployments.
    // It helps us identify our main domain vs. a custom subdomain.
    const appHost = process.env.VERCEL_URL || "propslane.com";

    if (host.includes(appHost)) {
      // It's the main domain or a Vercel preview URL.
      subdomain = "propslane";
    } else {
      // It's a custom subdomain.
      subdomain = host.split(".")[0];
    }

    // --- SERVER-SIDE API FETCH ---
    // On the server, we need to use the full, absolute URL to fetch from our own API.
    // The process.env.VERCEL_URL gives us the base path.
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const baseUrl = process.env.VERCEL_URL
      ? `${protocol}://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/${subdomain}`, {
      cache: "no-store", // Disable caching to always get fresh data
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data for subdomain: ${subdomain}`);
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
