// This is the main Server Component for the page. Its only job is to
// fetch data and then pass it to the client components for rendering.

import { headers } from "next/headers";
import ClientApp from "../components/ClientApp"; // Import the main client component

// This is a special Next.js function to get the base URL of our deployment.
// It helps us make API calls from the server to itself.
function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    // This is the Vercel system environment variable for the deployment URL.
    return `https://${process.env.VERCEL_URL}`;
  }
  // Fallback for local development
  return "http://localhost:3000";
}

// This is the main Server Component for the page. It runs on the server only.
export default async function HomePage() {
  const headersList = await headers();
  // On Vercel, the 'x-forwarded-host' header reliably tells us the domain the user is visiting.
  // The 'host' header is a fallback for local development.
  const host = await headersList.get("x-forwarded-host") || headersList.get("host");

  let subdomain;

  // FIX: Differentiate between production and local environments.
  if (host.includes("localhost")) {
    // In local development, the host is 'localhost:3000'. We can't parse a real subdomain.
    // So, we'll use a default one for testing.
    // You can change this to 'londonprops' or 'newhorizons' to test other agents locally.
    subdomain = "brighthomes";
  } else {
    // In production (on Vercel), we parse the subdomain from the host string.
    subdomain = host.split(".")[0];
  }

  const baseUrl = getBaseUrl();
  let data = null;
  let error = null;

  try {
    // This fetch happens on the server, calling our own API route.
    // 'cache: no-store' ensures we always get the latest data from Airtable.
    const res = await fetch(`${baseUrl}/api/${subdomain}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch data for subdomain: ${subdomain}`);
    }
    data = await res.json();
  } catch (err) {
    console.error(err); // Log the actual error on the server for debugging.
    error = err.message;
  }

  // If we couldn't fetch data (e.g., invalid subdomain), we render a user-friendly error page.
  if (error || !data || !data.agent) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold text-red-500">
          Oops! Something went wrong.
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          We couldn't find the microsite you're looking for.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Error Details: {error || "Invalid agent subdomain."}
        </p>
      </div>
    );
  }

  // If data is fetched successfully, we pass it to the ClientApp component,
  // which will be rendered interactively in the user's browser.
  return <ClientApp data={data} />;
}
