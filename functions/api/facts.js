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

function parseEntryPriceLakhs(priceStr) {
  if (!priceStr || typeof priceStr !== "string") return null;
  const s = priceStr.toLowerCase();
  const numMatch = s.match(/(\d+(?:\.\d+)?)/);
  if (!numMatch) return null;
  const val = parseFloat(numMatch[1]);
  if (s.includes("cr")) return Math.round(val * 100 * 100) / 100;
  return val;
}

function normalizeToken(str) {
  return String(str || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function matchesBhk(cluster, bhkRaw) {
  const bhkNorm = String(bhkRaw || "").toLowerCase().trim().replace(/\s*bhk\s*/g, "");
  if (!bhkNorm) return true;
  const cfgs = (cluster.configurations || []).map((c) => c.toLowerCase());
  return cfgs.some((cfg) => {
    if (bhkNorm === "commercial" || bhkNorm === "office" || bhkNorm === "retail") {
      return cfg.includes("office") || cfg.includes("retail") || cfg.includes("live-work") || cfg.includes("studio");
    }
    return new RegExp(`\\b${bhkNorm.replace(".", "\\.")}\\s*bhk`, "i").test(cfg);
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;

  try {
    const reqUrl = new URL(request.url);
    const topic = (reqUrl.searchParams.get("topic") || "all").toLowerCase().trim();
    const query = (reqUrl.searchParams.get("q") || "").toLowerCase().trim();
    const compareParam = (reqUrl.searchParams.get("compare") || "").toLowerCase().trim();
    const bhkParam = (reqUrl.searchParams.get("bhk") || "").toLowerCase().trim();
    const maxLakhsParam = reqUrl.searchParams.get("maxLakhs");
    const clusterParam = (reqUrl.searchParams.get("cluster") || "").toLowerCase().trim();

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

    const clusters = facts.clusters || [];
    let payload = facts;

    if (compareParam || bhkParam || (maxLakhsParam !== null && maxLakhsParam !== "")) {
      const compareSlugs = compareParam
        ? compareParam.split(",").map((s) => normalizeToken(s)).filter(Boolean)
        : [];
      const maxLakhs = maxLakhsParam !== null && maxLakhsParam !== "" ? parseFloat(maxLakhsParam) : null;

      let filteredClusters = clusters.filter((c) => {
        if (compareSlugs.length > 0) {
          const cid = normalizeToken(c.id);
          const cname = normalizeToken(c.name);
          const urlSlug = normalizeToken((c.url || "").split("/").pop());
          if (!compareSlugs.some((slug) => cid === slug || cname === slug || urlSlug === slug)) {
            return false;
          }
        }
        if (bhkParam && !matchesBhk(c, bhkParam)) {
          return false;
        }
        if (maxLakhs !== null && !Number.isNaN(maxLakhs)) {
          const entryLakhs = parseEntryPriceLakhs(c.priceStarting);
          if (entryLakhs === null || entryLakhs > maxLakhs) {
            return false;
          }
        }
        return true;
      });

      const comparisonMatrix = filteredClusters.map((c) => ({
        id: c.id,
        name: c.name,
        url: c.url,
        badge: c.badge,
        status: c.status,
        configurations: c.configurations,
        priceStarting: c.priceStarting,
        entryLakhs: parseEntryPriceLakhs(c.priceStarting),
        carpetArea: c.carpetArea,
        towers: c.towers,
        maharera: c.maharera,
        tagline: c.tagline
      }));

      payload = {
        filters: {
          compare: compareParam || null,
          bhk: bhkParam || null,
          maxLakhs: maxLakhs !== null && !Number.isNaN(maxLakhs) ? maxLakhs : null
        },
        matchCount: comparisonMatrix.length,
        entity: facts.entity,
        contact: facts.contact,
        comparisonMatrix,
        tools: facts.tools
      };
    } else if (query || clusterParam) {
      const rawSearch = clusterParam || query;
      const normalizedQ = rawSearch
        .replace(/charohli|charoli/g, "charholi")
        .replace(/\bpwc\b/g, "pride world city")
        .trim();
      const normalizedCompact = normalizeToken(normalizedQ);

      const isTownshipWideQuery = /\b(charholi|pride world city|pune|412105|township|all)\b/.test(normalizedQ);
      const matchedClusters = isTownshipWideQuery
        ? clusters
        : clusters.filter((c) =>
            `${c.id} ${c.name} ${c.maharera} ${c.tagline} ${(c.configurations || []).join(" ")}`.toLowerCase().includes(normalizedQ) ||
            normalizeToken(c.name).includes(normalizedCompact)
          );
      const matchedEcosystem = (facts.ecosystem || []).filter((e) =>
        `${e.name} ${e.specs || ""} ${e.status || ""}`.toLowerCase().includes(normalizedQ)
      );
      const matchedGuides = (facts.guidesAndTools || []).filter((g) =>
        `${g.title} ${g.topics || ""} ${g.url}`.toLowerCase().includes(normalizedQ)
      );
      payload = {
        query: rawSearch,
        normalizedQuery: normalizedQ,
        entity: facts.entity,
        contact: facts.contact,
        matchedClusters,
        matchedEcosystem,
        matchedGuides,
        tools: facts.tools
      };
    } else if (topic === "clusters" || topic === "pricing" || topic === "rera") {
      payload = { entity: facts.entity, clusters, contact: facts.contact, tools: facts.tools };
    } else if (topic === "connectivity") {
      payload = { entity: facts.entity, connectivity: facts.connectivity, contact: facts.contact };
    } else if (topic === "market" || topic === "compare") {
      payload = {
        entity: facts.entity,
        clusters: clusters.map((c) => ({
          id: c.id,
          name: c.name,
          url: c.url,
          configurations: c.configurations,
          priceStarting: c.priceStarting,
          entryLakhs: parseEntryPriceLakhs(c.priceStarting),
          carpetArea: c.carpetArea,
          maharera: c.maharera
        })),
        puneMarketBenchmarks: facts.puneMarketBenchmarks,
        contact: facts.contact
      };
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
