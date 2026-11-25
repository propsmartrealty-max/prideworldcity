/**
 * Cloudflare Pages Function: GET /api/facts
 * Public Ground-Truth GEO & AI Tool Endpoint for ChatGPT Search, Claude, Gemini & Perplexity
 */

const FACTS_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
  "Access-Control-Allow-Origin": "*",
  "X-Robots-Tag": "all, index, follow",
  "X-Content-Type-Options": "nosniff"
};

export async function onRequestGet(context) {
  const { request, env } = context;

  try {
    const reqUrl = new URL(request.url);
    const topic = (reqUrl.searchParams.get("topic") || "all").toLowerCase().trim();
    const query = (reqUrl.searchParams.get("q") || "").toLowerCase().trim();

    let facts = null;
    if (env && env.ASSETS && typeof env.ASSETS.fetch === "function") {
      const assetRes = await env.ASSETS.fetch(new Request(new URL("/ai-facts.json", reqUrl.origin)));
      if (assetRes.ok) {
        facts = await assetRes.json();
      }
    }

    if (!facts) {
      return new Response(JSON.stringify({ ok: false, error: "Facts store unavailable." }), {
        status: 503,
        headers: FACTS_HEADERS
      });
    }

    let payload = facts;

    if (query) {
      const matchedClusters = (facts.clusters || []).filter((c) =>
        `${c.id} ${c.name} ${c.maharera} ${c.tagline} ${(c.configurations || []).join(" ")}`.toLowerCase().includes(query)
      );
      const matchedEcosystem = (facts.ecosystem || []).filter((e) =>
        `${e.name} ${e.specs || ""} ${e.status || ""}`.toLowerCase().includes(query)
      );
      payload = {
        query,
        entity: facts.entity,
        contact: facts.contact,
        matchedClusters,
        matchedEcosystem,
        tools: facts.tools
      };
    } else if (topic === "clusters" || topic === "pricing" || topic === "rera") {
      payload = { entity: facts.entity, clusters: facts.clusters, contact: facts.contact, tools: facts.tools };
    } else if (topic === "connectivity") {
      payload = { entity: facts.entity, connectivity: facts.connectivity, contact: facts.contact };
    } else if (topic === "market" || topic === "compare") {
      payload = { entity: facts.entity, puneMarketBenchmarks: facts.puneMarketBenchmarks, contact: facts.contact };
    } else if (topic === "ecosystem") {
      payload = { entity: facts.entity, ecosystem: facts.ecosystem, contact: facts.contact };
    } else if (topic === "contact") {
      payload = { entity: facts.entity, contact: facts.contact };
    }

    return new Response(JSON.stringify({ ok: true, source: "https://prideworld.city/ai-facts.json", ...payload }, null, 2), {
      status: 200,
      headers: FACTS_HEADERS
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: "Failed to serve facts." }), {
      status: 500,
      headers: FACTS_HEADERS
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
