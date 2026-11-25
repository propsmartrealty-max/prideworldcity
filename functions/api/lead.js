/**
 * Cloudflare Pages Function: POST /api/lead
 * Enterprise Lead Capture, Turnstile Verification, Honeypot Guard, KV/D1 Persistence,
 * Direct Email Delivery (propsmartrealty@gmail.com) & Pre-filled WhatsApp Payload (917744009295)
 */

const DEFAULT_NOTIFY_EMAIL = "propsmartrealty@gmail.com";
const DEFAULT_WHATSAPP_NUMBER = "917744009295";

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
  // 1. Primary API delivery via Resend if configured in Cloudflare Pages Secrets
  if (env && env.RESEND_API_KEY) {
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
      if (res.ok) return { dispatched: true, provider: "resend" };
    } catch (_) {}
  }

  // 2. Built-in zero-key relay via FormSubmit AJAX directly to propsmartrealty@gmail.com
  try {
    const fsPayload = {
      _subject: `New Pride World City Enquiry (${lead.referenceId}) - ${lead.cluster}`,
      _template: "table",
      _captcha: "false",
      ...(lead.email ? { _replyto: lead.email } : {}),
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
      WhatsApp_Followup_Link: whatsappUrl
    };

    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": "https://prideworld.city",
        "Referer": "https://prideworld.city/"
      },
      body: JSON.stringify(fsPayload)
    });

    if (res.ok) {
      const json = await res.json().catch(() => ({}));
      if (json && (json.success === "true" || json.success === true)) {
        return { dispatched: true, provider: "formsubmit" };
      }
    }
  } catch (_) {}

  return { dispatched: false, provider: "none" };
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

    // 4. Enrich with Cloudflare Edge Geo Telemetry & Target Destinations
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
      notifyEmail,
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

    // 8. Dispatch Email to propsmartrealty@gmail.com (await briefly so client knows if fallback needed)
    const emailResult = await Promise.race([
      dispatchEmailNotification(leadRecord, whatsappUrl, env, notifyEmail),
      new Promise(resolve => setTimeout(() => resolve({ dispatched: false, provider: "timeout" }), 2500))
    ]);

    return new Response(
      JSON.stringify({
        ok: true,
        referenceId,
        notifyEmail,
        emailDispatched: Boolean(emailResult && emailResult.dispatched),
        emailProvider: (emailResult && emailResult.provider) || "none",
        whatsappNumber: notifyWhatsapp,
        whatsappUrl,
        message: `Enquiry logged & forwarded to ${notifyEmail} + WhatsApp +91 77440 09295.`,
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
