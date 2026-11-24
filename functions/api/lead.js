/**
 * Cloudflare Pages Function: POST /api/lead
 * Enterprise Lead Capture, Turnstile Verification, Honeypot Guard, KV/D1 Persistence & CRM Webhook
 */

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store, max-age=0",
  "X-Content-Type-Options": "nosniff"
};

function sanitizeStr(val, maxLen = 180) {
  if (typeof val !== "string") return "";
  return val.trim().replace(/[\u0000-\u001F\u007F<>]/g, "").slice(0, maxLen);
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(JSON.stringify({ ok: false, error: "Unsupported Content-Type" }), {
        status: 415,
        headers: JSON_HEADERS
      });
    }

    const body = await request.json();

    // 1. Honeypot Anti-Bot Check
    if (body._gotcha_sec && String(body._gotcha_sec).trim() !== "") {
      return new Response(JSON.stringify({ ok: true, referenceId: "PWC-IGNORED" }), {
        status: 200,
        headers: JSON_HEADERS
      });
    }

    // 2. Sanitize & Validate Core Fields
    const name = sanitizeStr(body.name, 100);
    const phone = sanitizeStr(body.phone, 24);
    const email = sanitizeStr(body.email, 120);
    const cluster = sanitizeStr(body.cluster || "Valencia", 60);
    const typology = sanitizeStr(body.typology || "", 60);
    const budget = sanitizeStr(body.budget || "", 60);
    const preferredDate = sanitizeStr(body.date || "", 32);
    const timeSlot = sanitizeStr(body.timeSlot || "", 60);
    const source = sanitizeStr(body.source || "web_portal", 60);
    const turnstileToken = sanitizeStr(body.cf_turnstile_response || "", 2048);

    if (!name || name.length < 2) {
      return new Response(JSON.stringify({ ok: false, error: "Valid name is required." }), {
        status: 400,
        headers: JSON_HEADERS
      });
    }

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) {
      return new Response(JSON.stringify({ ok: false, error: "Valid contact number is required." }), {
        status: 400,
        headers: JSON_HEADERS
      });
    }

    // 3. Optional Cloudflare Turnstile Server Verification (if secret key configured)
    if (env && env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        return new Response(JSON.stringify({ ok: false, error: "Security verification required." }), {
          status: 403,
          headers: JSON_HEADERS
        });
      }

      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: request.headers.get("CF-Connecting-IP") || ""
        })
      });

      const verifyJson = await verifyRes.json();
      if (!verifyJson.success) {
        return new Response(JSON.stringify({ ok: false, error: "Bot verification failed." }), {
          status: 403,
          headers: JSON_HEADERS
        });
      }
    }

    // 4. Enrich with Cloudflare Edge Geo Telemetry
    const cf = request.cf || {};
    const referenceId = `PWC-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const leadRecord = {
      referenceId,
      timestamp: new Date().toISOString(),
      name,
      phone,
      email,
      cluster,
      typology,
      budget,
      preferredDate,
      timeSlot,
      source,
      geo: {
        country: cf.country || "Unknown",
        city: cf.city || "Unknown",
        colo: cf.colo || "Edge",
        isNRI: Boolean(cf.country && cf.country !== "IN")
      }
    };

    // 5. Persist in Cloudflare KV if bound
    if (env && env.LEADS_KV) {
      context.waitUntil(
        env.LEADS_KV.put(`lead:${leadRecord.timestamp}:${referenceId}`, JSON.stringify(leadRecord))
      );
    }

    // 6. Persist in Cloudflare D1 Database if bound
    if (env && env.DB) {
      context.waitUntil(
        env.DB.prepare(
          "INSERT INTO leads (reference_id, created_at, name, phone, email, cluster, typology, budget, preferred_date, source, country, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        )
          .bind(
            referenceId,
            leadRecord.timestamp,
            name,
            phone,
            email,
            cluster,
            typology,
            budget,
            preferredDate,
            source,
            leadRecord.geo.country,
            leadRecord.geo.city
          )
          .run()
          .catch(() => {})
      );
    }

    // 7. Forward asynchronously to CRM Webhook / Notification endpoint if configured
    if (env && env.CRM_WEBHOOK_URL) {
      context.waitUntil(
        fetch(env.CRM_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(env.CRM_WEBHOOK_SECRET ? { "X-Webhook-Secret": env.CRM_WEBHOOK_SECRET } : {})
          },
          body: JSON.stringify(leadRecord)
        }).catch(() => {})
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        referenceId,
        message: "VIP Appointment & Brochure Request logged at Edge.",
        isNRI: leadRecord.geo.isNRI
      }),
      { status: 200, headers: JSON_HEADERS }
    );
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: "Invalid request payload." }), {
      status: 400,
      headers: JSON_HEADERS
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://prideworld.city",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
