import { NextResponse } from "next/server";
import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

// The second argument to GET is a context object that contains params.
export async function GET(request, context) {
  // FIX: Access subdomain directly from context.params.
  const { subdomain } = await context.params;

  if (!subdomain) {
    return NextResponse.json(
      { error: "Subdomain is required" },
      { status: 400 }
    );
  }

  try {
    // --- Step 1: Find the Agent ---
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
    const propertyRecordIds = agent.Properties || [];
    let properties = [];

    // Only try to fetch properties if the agent is linked to any.
    if (propertyRecordIds.length > 0) {
      const filterFormula =
        "OR(" +
        propertyRecordIds.map((id) => `RECORD_ID() = '${id}'`).join(",") +
        ")";

      const propertyRecords = await base(process.env.AIRTABLE_PROPERTIES_TABLE)
        .select({ filterByFormula: filterFormula })
        .all();

      properties = propertyRecords.map((record) => ({
        id: record.id,
        ...record.fields,
      }));
    }

    // --- Step 3: Return the Combined Data ---
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
