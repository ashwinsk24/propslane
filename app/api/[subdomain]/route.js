import { NextResponse } from "next/server";
import Airtable from "airtable";

// Initialize Airtable using the credentials from our .env.local file.
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

// The second argument to GET is a context object that contains params.
export async function GET(request, context) {
  // FIX: Access subdomain directly from context.params.
  // This resolves the "params should be awaited" warning in newer Next.js versions.
  const { subdomain } = await context.params;

  if (!subdomain) {
    return NextResponse.json(
      { error: "Subdomain is required" },
      { status: 400 }
    );
  }

  try {
    // --- Step 1: Find the Agent ---
    // This part remains the same and is working correctly.
    const agentRecords = await base(process.env.AIRTABLE_AGENTS_TABLE)
      .select({
        maxRecords: 1,
        filterByFormula: `{subdomain} = '${subdomain}'`,
      })
      .firstPage();

    if (agentRecords.length === 0) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    const agent = agentRecords[0].fields;

    // --- Step 2: Directly Fetch Properties Using Linked Record IDs ---
    // NEW LOGIC: Instead of a second search, we use the property IDs
    // that Airtable already gave us inside the agent object.
    const propertyRecordIds = agent.Properties || [];
    let properties = [];

    // Only try to fetch properties if the agent is linked to any.
    if (propertyRecordIds.length > 0) {
      // We construct a formula that tells Airtable: "find records where the ID is
      // one of these, OR one of these, OR one of these..."
      // Example: OR(RECORD_ID() = 'rec123', RECORD_ID() = 'rec456')
      const filterFormula =
        "OR(" +
        propertyRecordIds.map((id) => `RECORD_ID() = '${id}'`).join(",") +
        ")";

      const propertyRecords = await base(process.env.AIRTABLE_PROPERTIES_TABLE)
        .select({ filterByFormula: filterFormula })
        .all();

      properties = propertyRecords.map((record) => record.fields);
    }

    // We no longer need the agentId for the second query.

    // --- Step 3: Return the Combined Data ---
    // The agent object from the first query already has all the info we need.
    // The properties array is now populated by our direct lookup.
    return NextResponse.json({
      agent,
      properties,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data from CMS" },
      { status: 500 }
    );
  }
}
