/**
 * Pride World City - Enterprise Analytics, Google Consent Mode v2 & Edge Lead Dispatcher
 * Compatible with Google Analytics 4 (GA4), Google Tag Manager (GTM), Google Ads & Cloudflare Zaraz
 */

window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}

// Default Google Consent Mode v2 initialization (EU User Consent Policy & DPDP Act 2023 Ready)
const EEA_UK_CH_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MT", "NL", "NO", "PL",
  "PT", "RO", "SK", "SI", "ES", "SE", "GB", "CH"
];

gtag("consent", "default", {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "granted",
  security_storage: "granted",
  region: EEA_UK_CH_REGIONS,
  wait_for_update: 500
});

let storedConsent = null;
try {
  storedConsent = localStorage.getItem("pwc_consent_v2");
} catch (_) {}

gtag("consent", "default", {
  ad_storage: storedConsent === "denied" ? "denied" : "granted",
  ad_user_data: storedConsent === "denied" ? "denied" : "granted",
  ad_personalization: storedConsent === "denied" ? "denied" : "granted",
  analytics_storage: storedConsent === "denied" ? "denied" : "granted",
  functionality_storage: "granted",
  security_storage: "granted",
  wait_for_update: 500
});

if (storedConsent === "granted" || storedConsent === "denied") {
  gtag("consent", "update", {
    ad_storage: storedConsent,
    ad_user_data: storedConsent,
    ad_personalization: storedConsent,
    analytics_storage: storedConsent
  });
}

const WHATSAPP_DIGITS = "917744009295";
const PHONE_DISPLAY = "+91 77440 09295";

const PrideAnalytics = {
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
   * Submit lead payload privately to Cloudflare Pages Function (/api/lead),
   * and return pre-filled WhatsApp dispatch URL (+91 77440 09295).
   * Target email stays strictly private on the server edge.
   */
  async submitLead(leadData) {
    // Google Ads & GA4 Enhanced Conversions (SHA-256 Client-Side Hashing)
    if (window.crypto && window.crypto.subtle && (leadData.email || leadData.phone)) {
      try {
        const sha256 = async (str) => {
          if (!str) return undefined;
          const norm = str.trim().toLowerCase();
          const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(norm));
          return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
        };
        const [hashedEmail, hashedPhone] = await Promise.all([
          sha256(leadData.email),
          sha256(leadData.phone ? leadData.phone.replace(/[^0-9]/g, "") : "")
        ]);
        const userData = {};
        if (hashedEmail) userData.sha256_email_address = hashedEmail;
        if (hashedPhone) userData.sha256_phone_number = hashedPhone;
        gtag("set", "user_data", userData);
      } catch (_) {}
    }

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

    return {
      ok: true,
      referenceId,
      whatsappNumber: WHATSAPP_DIGITS,
      whatsappUrl,
      emailDispatched: Boolean(apiResult && apiResult.emailDispatched),
      fallback: !apiResult
    };
  }
};

window.PrideAnalytics = PrideAnalytics;

document.addEventListener("DOMContentLoaded", () => {
  // Plug-and-play Google Tag / GA4 / Google Ads loader (loads when tag ID meta/global is present)
  const tagMeta = document.querySelector('meta[name="google-tag-id"], meta[name="google-analytics-id"], meta[name="google-ads-id"]');
  const googleTagId = (tagMeta && tagMeta.content) || window.PWC_GOOGLE_TAG_ID;
  if (googleTagId && !document.getElementById("googleTagScript")) {
    const s = document.createElement("script");
    s.id = "googleTagScript";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleTagId)}`;
    document.head.appendChild(s);
    gtag("config", googleTagId, { send_page_view: true });
  }
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

  // Bind responsive hamburger menu across all sub-pages seamlessly
  const menuBtn = document.getElementById("mobileMenuBtn");
  const navLinksEl = document.getElementById("navLinks");
  if (menuBtn && navLinksEl && !menuBtn.dataset.bound) {
    menuBtn.dataset.bound = "1";
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-controls", "navLinks");
    menuBtn.addEventListener("click", () => {
      const isOpen = navLinksEl.classList.toggle("mobile-open");
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    navLinksEl.querySelectorAll(".nav-link").forEach((lnk) => {
      lnk.addEventListener("click", () => {
        navLinksEl.classList.remove("mobile-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

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
      <a href="/pride-world-city-vip-site-visit" class="mobile-cta-btn mobile-cta-vip"><i class="fa-solid fa-calendar-check"></i> VIP Tour</a>
    `;
    document.body.appendChild(bar);
    const mobileVipBtn = bar.querySelector(".mobile-cta-vip");
    if (mobileVipBtn && document.getElementById("vipExperienceModal")) {
      mobileVipBtn.addEventListener("click", (e) => {
        if (typeof window.openVipExperienceModal === "function") {
          e.preventDefault();
          window.openVipExperienceModal();
        }
      });
    }
  }

  // Smooth Scroll-Triggered Stagger Reveal & Metric Number Polish (60fps, Zero CLS)
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    const revealTargets = document.querySelectorAll(
      ".seo-matrix-card, .pillar-spec-box, .cluster-card, .amenity-card, .civic-card, .transit-card, .gallery-item-card, .valencia-pillar-card, .valencia-testimonial-card, .seo-feature-box, .booking-section-card, .rera-banner-box"
    );
    const vh = window.innerHeight || 800;
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("pwc-inview");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

    revealTargets.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      if (rect.top > vh * 0.92) {
        el.style.transitionDelay = `${Math.min((idx % 4) * 70, 210)}ms`;
        el.classList.add("pwc-reveal-init");
        io.observe(el);
      }
    });
  }

  // Register lightweight offline PWA Service Worker
  if ("serviceWorker" in navigator && window.location.protocol === "https:") {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }

  // Non-blocking Consent Mode v2 Banner & Re-openable Cookie Preferences
  function setConsentPreference(granted) {
    const state = granted ? "granted" : "denied";
    try {
      localStorage.setItem("pwc_consent_v2", state);
    } catch (_) {}
    gtag("consent", "update", {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state
    });
    const banner = document.getElementById("pwcConsentBanner");
    if (banner) banner.remove();
  }

  function showConsentBanner() {
    if (document.getElementById("pwcConsentBanner")) return;
    const banner = document.createElement("aside");
    banner.id = "pwcConsentBanner";
    banner.className = "pwc-consent-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Privacy and Cookie Preferences");
    banner.innerHTML = `
      <p style="margin: 0; font-size: 0.8rem; line-height: 1.5; color: var(--text-muted);">
        <strong style="color: var(--text-main);">Privacy &amp; Cookies:</strong> We use essential storage and optional analytics to improve this Pride World City advisory portal. Read our <a href="/privacy" style="color: var(--accent-gold); text-decoration: underline;">Privacy Policy</a> &amp; <a href="/terms" style="color: var(--accent-gold); text-decoration: underline;">Terms</a>.
      </p>
      <div class="pwc-consent-actions">
        <button type="button" id="pwcConsentAccept" class="btn btn-gold" style="padding: 0.45rem 0.9rem; font-size: 0.78rem;">Accept All</button>
        <button type="button" id="pwcConsentReject" class="btn btn-outline" style="padding: 0.45rem 0.9rem; font-size: 0.78rem;">Essential Only</button>
      </div>
    `;
    document.body.appendChild(banner);
    const acceptBtn = document.getElementById("pwcConsentAccept");
    const rejectBtn = document.getElementById("pwcConsentReject");
    if (acceptBtn) acceptBtn.addEventListener("click", () => setConsentPreference(true));
    if (rejectBtn) rejectBtn.addEventListener("click", () => setConsentPreference(false));
  }

  window.openPrivacyPreferences = showConsentBanner;
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open-consent]");
    if (trigger) {
      e.preventDefault();
      showConsentBanner();
    }
  });

  if (!storedConsent) {
    setTimeout(showConsentBanner, 1200);
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
