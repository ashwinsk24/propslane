import { headers } from "next/headers";
import ClientApp from "@/components/ClientApp";

// This page will now match routes like /brighthomes, /propslane, etc.
// The `params` object (passed by Next.js) will contain the dynamic part of the URL.
export default async function AgentPage({ params }) {
  // 1. Get the agent name (subdomain) directly from the URL parameters
  const subdomain = params.agentName; // e.g., "brighthomes"

  let data = null;
  let error = null;

  try {
    // We no longer need to parse the host to get the subdomain.
    // We ONLY need the host to make an absolute server-side API call.
    const headersList = await headers();
    const host = headersList.get("x-forwarded-host") || headersList.get("host");

    // 2. Construct the API URL
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    // 3. Fetch data for this specific agent
    const res = await fetch(`${baseUrl}/api/${subdomain}`, {
      cache: "no-store", // Disable caching to always get fresh data
    });

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(
        `Failed to fetch data for agent: ${subdomain}. API responded with: ${JSON.stringify(
          errorBody
        )}`
      );
    }
    data = await res.json();
  } catch (err) {
    console.error(err);
    error = err.message;
  }

  // 4. Render the error page or the ClientApp (this logic is unchanged)
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

  // 5. Pass the fetched data to the client component
  return <ClientApp data={data} />;
}
