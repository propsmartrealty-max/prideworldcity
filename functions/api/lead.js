/**
 * Cloudflare Pages Function: POST /api/lead
 * Enterprise Lead Capture, Turnstile Verification, Honeypot Guard, KV/D1 Persistence,
 * Private Server Email Delivery (via Cloudflare Pages Secrets) & Pre-filled WhatsApp Payload (917744009295)
 */

const DEFAULT_WHATSAPP_NUMBER = "917744009295";
const DEFAULT_NOTIFY_EMAIL = "propsmartrealty@gmail.com";

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store, max-age=0",
  "X-Content-Type-Options": "nosniff"
};

function sanitizeStr(val, maxLen = 180) {
  if (typeof val !== "string") return "";
  return val.trim().replace(/[\u0000-\u001F\u007F<>]/g, "").slice(0, maxLen);
}

function buildWhatsappUrl(lead, waDigits = DEFAULT_WHATSAPP_NUMBER) {
  const lines = [
    `*New Enquiry — Pride World City, Charholi Pune*`,
    `Ref ID: ${lead.referenceId}`,
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    lead.email ? `Email: ${lead.email}` : null,
    `Cluster: ${lead.cluster}`,
    lead.typology ? `Configuration: ${lead.typology}` : null,
    lead.budget ? `Budget: ${lead.budget}` : null,
    lead.preferredDate ? `Preferred Date: ${lead.preferredDate}` : null,
    lead.timeSlot ? `Time Slot: ${lead.timeSlot}` : null,
    `Location: ${lead.geo.city}, ${lead.geo.country}`,
    `Source: ${lead.source}`
  ].filter(Boolean);

  return `https://wa.me/${waDigits}?text=${encodeURIComponent(lines.join("\n"))}`;
}

async function dispatchEmailNotification(lead, whatsappUrl, env, targetEmail) {
  let lastDiagnostic = { dispatched: false, provider: "none", status: 0, needsActivation: false, message: "" };

  // 1. Primary API delivery via Resend if configured in Cloudflare Pages Secrets
  if (env && env.RESEND_API_KEY && targetEmail) {
    try {
      const fromAddress = env.RESEND_FROM || "Pride World City Portal <enquiries@prideworld.city>";
      const htmlRows = [
        ["Reference ID", lead.referenceId],
        ["Name", lead.name],
        ["Phone", lead.phone],
        ["Email", lead.email || "Not provided"],
        ["Cluster", lead.cluster],
        ["Configuration", lead.typology || "Not specified"],
        ["Budget", lead.budget || "Not specified"],
        ["Preferred Visit Date", lead.preferredDate || "Not specified"],
        ["Time Slot", lead.timeSlot || "Not specified"],
        ["Geo", `${lead.geo.city}, ${lead.geo.country}${lead.geo.isNRI ? " (NRI)" : ""}`],
        ["Source", lead.source],
        ["WhatsApp Reply Link", whatsappUrl]
      ]
        .map(([k, v]) => `<tr><td style="padding:6px 10px;border:1px solid #ddd;font-weight:600;">${k}</td><td style="padding:6px 10px;border:1px solid #ddd;">${v}</td></tr>`)
        .join("");

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [targetEmail],
          ...(lead.email ? { reply_to: lead.email } : {}),
          subject: `New Pride World City Enquiry (${lead.referenceId}) - ${lead.cluster}`,
          html: `<h3>New Township Enquiry Received</h3><table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">${htmlRows}</table>`
        })
      });
      if (res.ok) return { dispatched: true, provider: "resend", status: res.status, needsActivation: false, message: "Sent via Resend" };
      lastDiagnostic = { dispatched: false, provider: "resend", status: res.status, needsActivation: false, message: await res.text().catch(() => "") };
    } catch (_) {}
  }

  // 2. Secondary API delivery via Web3Forms if configured in Cloudflare Pages Secrets
  if (env && env.WEB3FORMS_ACCESS_KEY) {
    try {
      const w3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: env.WEB3FORMS_ACCESS_KEY,
          subject: `New Pride World City Enquiry (${lead.referenceId}) - ${lead.cluster}`,
          from_name: "Pride World City Portal",
          name: lead.name,
          phone: lead.phone,
          email: lead.email || targetEmail,
          cluster: lead.cluster,
          configuration: lead.typology || "Not specified",
          budget: lead.budget || "Not specified",
          preferred_date: lead.preferredDate || "Not specified",
          time_slot: lead.timeSlot || "Not specified",
          visitor_location: `${lead.geo.city}, ${lead.geo.country}`,
          source: lead.source,
          whatsapp_link: whatsappUrl
        })
      });
      const w3Json = await w3Res.json().catch(() => ({}));
      if (w3Res.ok && w3Json && w3Json.success) {
        return { dispatched: true, provider: "web3forms", status: w3Res.status, needsActivation: false, message: "Sent via Web3Forms" };
      }
      lastDiagnostic = { dispatched: false, provider: "web3forms", status: w3Res.status, needsActivation: false, message: (w3Json && w3Json.message) || "" };
    } catch (_) {}
  }

  // 3. Server-side FormSubmit relay (set env.LEAD_FORMSUBMIT_ALIAS or env.LEAD_NOTIFY_EMAIL in Cloudflare Secrets)
  const fsTarget = (env && (env.LEAD_FORMSUBMIT_ALIAS || env.LEAD_NOTIFY_EMAIL)) || targetEmail || DEFAULT_NOTIFY_EMAIL;
  if (fsTarget) {
    try {
      const fsParams = new URLSearchParams({
        _subject: `New Pride World City Enquiry (${lead.referenceId}) - ${lead.cluster}`,
        _template: "table",
        _captcha: "false",
        Reference_ID: lead.referenceId,
        Full_Name: lead.name,
        Phone: lead.phone,
        Email: lead.email || "Not provided",
        Cluster: lead.cluster,
        Configuration: lead.typology || "Not specified",
        Budget: lead.budget || "Not specified",
        Preferred_Date: lead.preferredDate || "Not specified",
        Time_Slot: lead.timeSlot || "Not specified",
        Visitor_Location: `${lead.geo.city}, ${lead.geo.country}`,
        Source: lead.source,
        WhatsApp_Followup: whatsappUrl
      });
      if (lead.email) {
        fsParams.set("_replyto", lead.email);
      }

      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(fsTarget)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0 (compatible; PrideWorldCityPortal/2.0; +https://prideworld.city)",
          "Origin": "https://prideworld.city",
          "Referer": "https://prideworld.city/"
        },
        body: fsParams.toString()
      });

      const rawText = await res.text().catch(() => "");
      let json = {};
      try { json = JSON.parse(rawText); } catch (_) {}
      const msg = (json && json.message) || rawText.slice(0, 160);
      const needsActivation = /activat/i.test(msg);

      if (res.ok && (json.success === "true" || json.success === true || res.status === 200)) {
        return { dispatched: true, provider: "formsubmit", status: res.status, needsActivation: false, message: "Sent via FormSubmit" };
      }
      lastDiagnostic = { dispatched: false, provider: "formsubmit", status: res.status, needsActivation, message: msg };
    } catch (err) {
      lastDiagnostic = { dispatched: false, provider: "formsubmit_error", status: 0, needsActivation: false, message: String(err && err.message || err).slice(0, 120) };
    }
  }

  return lastDiagnostic;
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

    // 4. Enrich with Cloudflare Edge Geo Telemetry & Private Server Destinations
    const notifyEmail = (env && env.LEAD_NOTIFY_EMAIL) || DEFAULT_NOTIFY_EMAIL;
    const notifyWhatsapp = (env && env.LEAD_WHATSAPP_NUMBER) || DEFAULT_WHATSAPP_NUMBER;
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
      notifyWhatsapp,
      geo: {
        country: cf.country || "Unknown",
        city: cf.city || "Unknown",
        colo: cf.colo || "Edge",
        isNRI: Boolean(cf.country && cf.country !== "IN")
      }
    };

    const whatsappUrl = buildWhatsappUrl(leadRecord, notifyWhatsapp);

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

    // 7. Forward asynchronously to CRM Webhook if configured
    if (env && env.CRM_WEBHOOK_URL) {
      context.waitUntil(
        fetch(env.CRM_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(env.CRM_WEBHOOK_SECRET ? { "X-Webhook-Secret": env.CRM_WEBHOOK_SECRET } : {})
          },
          body: JSON.stringify({ ...leadRecord, whatsappUrl })
        }).catch(() => {})
      );
    }

    // 8. Dispatch Private Server-Side Email (never return recipient email in HTTP response)
    const emailResult = await Promise.race([
      dispatchEmailNotification(leadRecord, whatsappUrl, env, notifyEmail),
      new Promise(resolve => setTimeout(() => resolve({ dispatched: false, provider: "timeout", status: 0, needsActivation: false, message: "Edge upstream timeout" }), 6000))
    ]);

    return new Response(
      JSON.stringify({
        ok: true,
        referenceId,
        emailDispatched: Boolean(emailResult && emailResult.dispatched),
        emailProvider: (emailResult && emailResult.provider) || "none",
        emailNeedsActivation: Boolean(emailResult && emailResult.needsActivation),
        whatsappNumber: notifyWhatsapp,
        whatsappUrl,
        message: "Enquiry logged & routed to Propsmart Realty Advisory Desk + WhatsApp +91 77440 09295.",
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
