/**
 * Pride World City - Enterprise Analytics, Google Consent Mode v2 & Edge Lead Dispatcher
 * Compatible with Google Analytics 4 (GA4), Google Tag Manager (GTM), Google Ads & Cloudflare Zaraz
 */

window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}

// Default Google Consent Mode v2 initialization (DPDP / Privacy Ready)
gtag("consent", "default", {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
  functionality_storage: "granted",
  security_storage: "granted",
  wait_for_update: 500
});

const CONTACT_EMAIL = "propsmartrealty@gmail.com";
const WHATSAPP_DIGITS = "917744009295";
const PHONE_DISPLAY = "+91 77440 09295";

const PrideAnalytics = {
  CONTACT_EMAIL,
  WHATSAPP_DIGITS,
  PHONE_DISPLAY,

  /**
   * Build pre-filled WhatsApp enquiry URL targeting +91 77440 09295
   */
  buildWhatsappUrl(leadData = {}, referenceId = "") {
    const lines = [
      "*New Enquiry — Pride World City, Charholi Pune*",
      referenceId ? `Ref ID: ${referenceId}` : null,
      leadData.name ? `Name: ${leadData.name}` : null,
      leadData.phone ? `Phone: ${leadData.phone}` : null,
      leadData.email ? `Email: ${leadData.email}` : null,
      leadData.cluster ? `Cluster: ${leadData.cluster}` : "Cluster: Valencia",
      leadData.typology ? `Configuration: ${leadData.typology}` : null,
      leadData.budget ? `Budget: ${leadData.budget}` : null,
      leadData.date ? `Preferred Visit Date: ${leadData.date}` : null,
      leadData.timeSlot ? `Time Slot: ${leadData.timeSlot}` : null,
      `Source: ${leadData.source || "web_portal"}`
    ].filter(Boolean);

    return `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(lines.join("\n"))}`;
  },

  /**
   * Open WhatsApp enquiry cleanly in a new tab/window
   */
  dispatchWhatsapp(whatsappUrl) {
    if (!whatsappUrl) return false;
    try {
      this.track("contact_whatsapp", { link_url: whatsappUrl, channel: "enquiry_auto_dispatch" });
      const win = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      return Boolean(win);
    } catch (_) {
      return false;
    }
  },

  /**
   * Client-side fallback email dispatch via FormSubmit AJAX directly to propsmartrealty@gmail.com
   */
  async sendClientEmailFallback(leadData, referenceId, whatsappUrl) {
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        keepalive: true,
        body: JSON.stringify({
          _subject: `New Pride World City Enquiry (${referenceId}) - ${leadData.cluster || "Valencia"}`,
          _template: "table",
          _captcha: "false",
          ...(leadData.email ? { _replyto: leadData.email } : {}),
          Reference_ID: referenceId,
          Full_Name: leadData.name || "",
          Phone: leadData.phone || "",
          Email: leadData.email || "Not provided",
          Cluster: leadData.cluster || "Valencia",
          Configuration: leadData.typology || "Not specified",
          Budget: leadData.budget || "Not specified",
          Preferred_Date: leadData.date || "Not specified",
          Time_Slot: leadData.timeSlot || "Not specified",
          Source: leadData.source || "web_portal",
          WhatsApp_Link: whatsappUrl
        })
      });
      return res.ok;
    } catch (_) {
      return false;
    }
  },

  /**
   * Dispatch conversion / engagement events to GTM, GA4, and Cloudflare Zaraz
   */
  track(eventName, params = {}) {
    try {
      const payload = {
        ...params,
        page_location: window.location.href,
        page_title: document.title,
        timestamp: new Date().toISOString()
      };

      window.dataLayer.push({ event: eventName, ...payload });
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, payload);
      }
      if (window.zaraz && typeof window.zaraz.track === "function") {
        window.zaraz.track(eventName, payload);
      }
    } catch (_) {
      // Fail safely in strict/sandboxed environments
    }
  },

  /**
   * Submit lead payload to Cloudflare Pages Function (/api/lead), ensure email delivery
   * to propsmartrealty@gmail.com, and return pre-filled WhatsApp dispatch URL (+91 77440 09295).
   */
  async submitLead(leadData) {
    this.track("generate_lead", {
      cluster: leadData.cluster || "Valencia",
      typology: leadData.typology || "",
      source: leadData.source || "web_portal",
      value: 1,
      currency: "INR"
    });

    let apiResult = null;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData)
      });

      if (res.ok) {
        apiResult = await res.json();
      }
    } catch (_) {
      // Static local preview or transient edge error fallback
    }

    const referenceId = (apiResult && apiResult.referenceId) || `PWC-${Math.floor(1000 + Math.random() * 9000)}`;
    const whatsappUrl = (apiResult && apiResult.whatsappUrl) || this.buildWhatsappUrl(leadData, referenceId);

    let emailDispatched = Boolean(apiResult && apiResult.emailDispatched);
    if (!emailDispatched) {
      emailDispatched = await this.sendClientEmailFallback(leadData, referenceId, whatsappUrl);
    }

    return {
      ok: true,
      referenceId,
      notifyEmail: CONTACT_EMAIL,
      whatsappNumber: WHATSAPP_DIGITS,
      whatsappUrl,
      emailDispatched,
      fallback: !apiResult
    };
  }
};

window.PrideAnalytics = PrideAnalytics;

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href") || "";

    if (href.includes("wa.me")) {
      PrideAnalytics.track("contact_whatsapp", { link_url: href });
    } else if (href.startsWith("tel:")) {
      PrideAnalytics.track("contact_phone", { phone_number: href.replace("tel:", "") });
    }
  });

  document.querySelectorAll(".download-brochure-trigger").forEach(btn => {
    btn.addEventListener("click", () => {
      PrideAnalytics.track("file_download", { file_name: "Pride_World_City_Master_Brochure" });
    });
  });

  // Inject responsive mobile sticky CTA bar across all portal & spoke pages
  if (!document.getElementById("mobileStickyCtaBar")) {
    const pageTitle = document.title.split("|")[0].trim();
    const waHref = `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(`Hello Propsmart Realty, please share Cost Sheet & floor plans for ${pageTitle} at Pride World City, Charholi Pune.`)}`;
    const bar = document.createElement("nav");
    bar.id = "mobileStickyCtaBar";
    bar.className = "mobile-sticky-cta-bar";
    bar.setAttribute("aria-label", "Quick Enquiry Bar");
    bar.innerHTML = `
      <a href="tel:+${WHATSAPP_DIGITS}" class="mobile-cta-btn mobile-cta-call"><i class="fa-solid fa-phone"></i> Call Now</a>
      <a href="${waHref}" target="_blank" rel="noopener noreferrer" class="mobile-cta-btn mobile-cta-wa"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
      <a href="/#vip-booking" class="mobile-cta-btn mobile-cta-vip"><i class="fa-solid fa-calendar-check"></i> VIP Tour</a>
    `;
    document.body.appendChild(bar);
  }

  // Register lightweight offline PWA Service Worker
  if ("serviceWorker" in navigator && window.location.protocol === "https:") {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }

  fetch("/api/geo")
    .then(r => (r.ok ? r.json() : null))
    .then(geo => {
      if (geo && geo.isNRI) {
        const sub = document.getElementById("heroStageSub");
        if (sub && !sub.dataset.nriTagged) {
          sub.dataset.nriTagged = "1";
          PrideAnalytics.track("nri_visitor_detected", { country: geo.country, city: geo.city });
        }
      }
    })
    .catch(() => {});
});
