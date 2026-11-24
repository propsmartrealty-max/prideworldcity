/**
 * Cloudflare Pages Function: GET /api/geo
 * Returns lightweight Geo-IP & NRI Context from Cloudflare Edge telemetry
 */

export async function onRequestGet(context) {
  const cf = context.request.cf || {};
  const country = cf.country || "IN";
  const isNRI = country !== "IN";

  return new Response(
    JSON.stringify({
      ok: true,
      country,
      city: cf.city || "Pune",
      region: cf.region || "Maharashtra",
      timezone: cf.timezone || "Asia/Kolkata",
      colo: cf.colo || "BOM",
      isNRI,
      airportTransferEligible: true
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff"
      }
    }
  );
}
