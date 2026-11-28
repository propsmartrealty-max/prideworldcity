/**
 * Pride World City - Main Application Orchestrator
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Subsystems
  if (typeof TOWNSHIP_DATA !== 'undefined') {
    // Render Township Metrics & Highlights
    renderHeroHighlights(TOWNSHIP_DATA.keyHighlights);
    renderLeadership(TOWNSHIP_DATA.leadership);
    renderCivicInfrastructure(TOWNSHIP_DATA.civicInfrastructure);
    renderConnectivity(TOWNSHIP_DATA.connectivity);
    renderAmenities(TOWNSHIP_DATA.amenitiesList);
    renderTestimonials(TOWNSHIP_DATA.testimonials);
    renderFaqs(TOWNSHIP_DATA.faqs);

    // Boot Dedicated Valencia Showcase & Master Floor Plans
    if (TOWNSHIP_DATA.valenciaDetail) {
      renderValenciaShowcase(TOWNSHIP_DATA.valenciaDetail);
    }

    // Boot Interactive Masterplan
    if (window.MasterplanViewer && document.getElementById("masterplanCanvasArea")) {
      new MasterplanViewer("masterplanCanvasArea", TOWNSHIP_DATA);
    }

    // Boot Cluster Catalog & Floor Plans
    if (window.ClusterManager && document.getElementById("clustersGrid")) {
      new ClusterManager("clustersGrid", TOWNSHIP_DATA);
    }

    // Boot Mega Media Gallery & Lightbox
    if (window.TownshipGallery && document.getElementById("galleryGrid")) {
      new TownshipGallery("galleryGrid", TOWNSHIP_DATA);
    }

    // Boot 360 Virtual Tour & Day/Night Mode
    if (window.TourExperience && document.getElementById("tourCanvasArea")) {
      new TourExperience("tourCanvasArea");
    }

    // Boot EMI Intelligence Calculator
    if (window.EmiCalculator) {
      new EmiCalculator();
    }

    // Boot AI Concierge
    if (window.PrideConcierge) {
      new PrideConcierge(TOWNSHIP_DATA);
    }
  }

  // 2. Setup Sticky Header on Scroll
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 3. Mobile Navigation Menu Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  if (mobileMenuBtn && navLinks && !mobileMenuBtn.dataset.bound) {
    mobileMenuBtn.dataset.bound = "1";
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    mobileMenuBtn.setAttribute("aria-controls", "navLinks");
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("mobile-open");
      mobileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 4. VIP Booking Form Submission (Wired privately to Edge /api/lead & WhatsApp +91 77440 09295)
  const bookingForm = document.getElementById("vipBookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const honeypot = document.getElementById("bookHoneypot");
      if (honeypot && honeypot.value.trim() !== "") {
        return false;
      }
      const name = document.getElementById("bookName").value;
      const phone = document.getElementById("bookPhone").value;
      const emailEl = document.getElementById("bookEmail");
      const email = emailEl ? emailEl.value : "";
      const cluster = document.getElementById("bookingClusterSelect").value;
      const date = document.getElementById("bookDate").value;
      const waConsentEl = document.getElementById("bookWhatsappConsent");
      if (waConsentEl && !waConsentEl.checked) {
        showToast("Please tick the Privacy Policy & communication consent checkbox to submit your enquiry.");
        waConsentEl.focus();
        return false;
      }
      const sendWhatsapp = Boolean(waConsentEl && waConsentEl.checked);

      const submitBtn = bookingForm.querySelector("button[type='submit']");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending Enquiry...`;
      }

      const payload = { name, phone, email, cluster, date, source: "vip_booking_section", _gotcha_sec: "" };
      let res = null;
      if (window.PrideAnalytics && typeof window.PrideAnalytics.submitLead === "function") {
        res = await window.PrideAnalytics.submitLead(payload);
      }

      const refId = res && res.referenceId ? res.referenceId : `PWC-${Math.floor(1000 + Math.random() * 9000)}`;
      const waUrl = (res && res.whatsappUrl) || (window.PrideAnalytics
        ? window.PrideAnalytics.buildWhatsappUrl(payload, refId)
        : `https://wa.me/917744009295?text=${encodeURIComponent(`New Enquiry (${refId}) - ${name}, ${phone}, ${cluster}, Date: ${date}`)}`);

      const confirmBox = document.getElementById("vipBookingConfirm");
      const confirmRefEl = document.getElementById("vipBookingConfirmRef");
      const confirmWaBtn = document.getElementById("vipBookingWaBtn");
      const confirmMailBtn = document.getElementById("vipBookingMailBtn");
      const confirmEmailStatus = document.getElementById("vipBookingEmailStatus");
      if (confirmRefEl) confirmRefEl.textContent = refId;
      if (confirmWaBtn) confirmWaBtn.setAttribute("href", waUrl);
      if (confirmMailBtn) confirmMailBtn.style.display = "none";
      if (confirmEmailStatus) {
        confirmEmailStatus.textContent = `Enquiry registered (${refId}) with Propsmart Realty Advisory Desk. Tap below to confirm on WhatsApp (+91 77440 09295):`;
      }
      if (confirmBox) confirmBox.style.display = "block";

      if (sendWhatsapp && window.PrideAnalytics && typeof window.PrideAnalytics.dispatchWhatsapp === "function") {
        window.PrideAnalytics.dispatchWhatsapp(waUrl);
      }

      showToast(`Enquiry Sent (Ref: ${refId}) to Propsmart Realty Advisory Desk & WhatsApp +91 77440 09295! Welcome, ${name}!`);
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-calendar-check"></i> Confirm VIP Reservation`;
      }
      bookingForm.reset();
    });
  }

  // 5. On-Domain Brochure & 2026 Cost Sheet Dispatcher (Zero External Redirect Leak)
  const downloadBrochureBtns = document.querySelectorAll(".download-brochure-trigger");
  downloadBrochureBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.PrideAnalytics) {
        window.PrideAnalytics.track("file_download", { file_name: "Pride_World_City_Brochure_Request" });
      }
      if (typeof window.openVipExperienceModal === "function") {
        window.openVipExperienceModal("Valencia");
        showToast("Complete your 30-sec VIP pass to receive the PDF Brochure & Cost Sheet on WhatsApp (+91 77440 09295) & Email.");
      } else {
        window.scrollToSection && window.scrollToSection("vip-booking");
        showToast("Enter your details below or tap WhatsApp (+91 77440 09295) for instant Brochure PDF delivery.");
      }
    });
  });

  // Setup SEO Knowledge Guide Tabs
  const guideTabBtns = document.querySelectorAll("#seoGuideTabs .seo-pill-btn");
  if (guideTabBtns.length > 0) {
    guideTabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-tab");
        guideTabBtns.forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".seo-tab-pane").forEach(pane => pane.classList.remove("active"));
        btn.classList.add("active");
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add("active");
      });
    });
  }

  // 6. Interactive Hero Master Township Switcher
  setupHeroTownshipSwitcher();
});

function setupHeroTownshipSwitcher() {
  const tabs = document.querySelectorAll(".hero-township-tab");
  const heroImg = document.getElementById("heroMasterImg");
  const titleEl = document.getElementById("heroStageTitle");
  const captionEl = document.getElementById("heroStageCaption");
  const descEl = document.getElementById("heroStageDesc");
  const subEl = document.getElementById("heroStageSub");
  const hlEl = document.getElementById("heroStageHighlight");

  if (!tabs.length || !heroImg) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const src = tab.getAttribute("data-src");
      const title = tab.getAttribute("data-title");
      const caption = tab.getAttribute("data-caption");
      const desc = tab.getAttribute("data-desc");
      const sub = tab.getAttribute("data-sub");
      const hl = tab.getAttribute("data-hl");

      heroImg.style.opacity = "0.2";
      setTimeout(() => {
        heroImg.src = src;
        if (titleEl) titleEl.innerText = title;
        if (captionEl) captionEl.innerText = caption;
        if (descEl) descEl.innerText = desc;
        if (subEl) subEl.innerText = sub;
        if (hlEl) hlEl.innerText = hl;
        heroImg.style.opacity = "1";
      }, 200);
    });
  });
}

/**
 * Toast notification utility
 */
function showToast(message) {
  let toast = document.getElementById("siteToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "siteToast";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-crown text-gold"></i> <span>${message}</span>`;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4500);
}

window.showToast = showToast;

/**
 * Render Highlights in Hero
 */
function renderHeroHighlights(highlights) {
  const container = document.getElementById("heroMetricsContainer");
  if (!container) return;

  container.innerHTML = highlights.slice(0, 4).map(h => `
    <div class="hero-metric-item">
      <div class="metric-number text-gold-gradient">${h.number}</div>
      <div class="metric-label">${h.label}</div>
    </div>
  `).join("");
}

/**
 * Render Connectivity Grid
 */
function renderConnectivity(list) {
  const container = document.getElementById("connectivityGrid");
  if (!container) return;

  container.innerHTML = list.map(item => `
    <div class="transit-card">
      <div class="transit-time-pill">
        ${item.time.split(" ")[0]}
        <small>${item.time.split(" ")[1]}</small>
      </div>
      <div class="transit-info">
        <h4>${item.destination}</h4>
        <p><i class="fa-solid fa-road text-gold"></i> ${item.distance} • ${item.type}</p>
      </div>
    </div>
  `).join("");
}

/**
 * Render Amenities Grid
 */
function renderAmenities(amenities) {
  const container = document.getElementById("amenitiesGrid");
  if (!container) return;

  container.innerHTML = amenities.map(am => `
    <div class="amenity-card">
      <div class="amenity-cat">${am.category}</div>
      <h4>${am.title}</h4>
      <p>${am.desc}</p>
    </div>
  `).join("");
}

/**
 * Render Resident Testimonials
 */
function renderTestimonials(testimonials) {
  const container = document.getElementById("testimonialsGrid");
  if (!container) return;

  container.innerHTML = testimonials.map(t => {
    const initials = (t.name || "PW").replace(/[^A-Za-z\s]/g, "").trim().split(/\s+/).slice(0, 2).map(w => w[0].toUpperCase()).join("") || "PW";
    const hasLocalAvatar = t.avatar && !t.avatar.startsWith("https://");
    const avatarHtml = hasLocalAvatar
      ? `<img src="${t.avatar}" alt="${t.name}" width="48" height="48" loading="lazy" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-gold);" />`
      : `<div class="testimonial-initials" aria-hidden="true">${initials}</div>`;
    return `
    <div class="amenity-card" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="color: var(--accent-gold); font-size: 1.05rem; margin-bottom: 0.85rem;" aria-label="Resident experience highlight">
          <i class="fa-solid fa-quote-left"></i>
        </div>
        <p style="font-style: italic; color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
          "${t.quote}"
        </p>
      </div>

      <div style="display: flex; align-items: center; gap: 0.85rem; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
        ${avatarHtml}
        <div>
          <h4 style="font-size: 1rem; margin-bottom: 0.15rem;">${t.name}</h4>
          <div style="font-size: 0.78rem; color: var(--accent-gold); font-weight: 500;">${t.cluster}</div>
          <div style="font-size: 0.72rem; color: var(--text-dim);">${t.role}</div>
        </div>
      </div>
    </div>
  `;
  }).join("");
}

/**
 * Render FAQs
 */
function renderFaqs(faqs) {
  const container = document.getElementById("faqsAccordion");
  if (!container) return;

  // Preserve static SSR FAQ items so structured data & visible HTML match 1:1
  if (!container.querySelector(".faq-item")) {
    container.innerHTML = faqs.map(faq => `
      <div class="faq-item" style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); margin-bottom: 0.85rem; overflow: hidden;">
        <button type="button" class="faq-question-btn" aria-expanded="false" style="width: 100%; text-align: left; background: none; border: none; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; color: var(--text-main); font-size: 1.05rem; font-weight: 600; cursor: pointer;">
          <span>${faq.q}</span>
          <i class="fa-solid fa-chevron-down faq-chevron" style="color: var(--accent-gold); transition: transform 0.3s;"></i>
        </button>
        <div class="faq-answer-panel" style="padding: 0 1.5rem 1.25rem 1.5rem; display: none; color: var(--text-muted); font-size: 0.92rem; line-height: 1.6;">
          ${faq.a}
        </div>
      </div>
    `).join("");
  }

  // Attach accessible toggle events
  container.querySelectorAll(".faq-question-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const chevron = btn.querySelector(".faq-chevron");
      const isVisible = panel.style.display === "block";

      // Close all
      container.querySelectorAll(".faq-question-btn").forEach(b => b.setAttribute("aria-expanded", "false"));
      container.querySelectorAll(".faq-answer-panel").forEach(p => p.style.display = "none");
      container.querySelectorAll(".faq-chevron").forEach(c => c.style.transform = "rotate(0deg)");

      if (!isVisible) {
        panel.style.display = "block";
        btn.setAttribute("aria-expanded", "true");
        if (chevron) chevron.style.transform = "rotate(180deg)";
      }
    });
  });
}


/**
 * Scroll Progress Bar
 */
window.addEventListener("scroll", () => {
  const progressBar = document.getElementById("scrollProgressBar");
  if (progressBar) {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }
});

/**
 * Render Leadership Vision & The Address of Yes
 */
function renderLeadership(leadership) {
  const container = document.getElementById("leadershipSectionContainer");
  if (!container || !leadership) return;

  container.innerHTML = `
    <div class="leadership-grid">
      <div class="leader-portrait-wrap">
        <div class="leader-portrait-glow"></div>
        <img src="${leadership.image}" alt="${leadership.leaderName}" class="leader-portrait-img" />
      </div>

      <div class="leader-card-box">
        <div class="address-of-yes-badge">
          <img src="${leadership.addressOfYesLogo}" alt="Address of Yes Logo" />
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-gold); letter-spacing: 0.1em; text-transform: uppercase;">
            ${leadership.tagline}
          </span>
        </div>

        <h3 style="font-size: 2rem; margin-bottom: 0.25rem;">${leadership.leaderName}</h3>
        <span style="color: var(--accent-gold); font-size: 0.9rem; font-weight: 600; display: block; margin-bottom: 1.25rem;">
          ${leadership.designation}
        </span>

        <p style="font-size: 1.05rem; font-style: italic; color: var(--text-main); line-height: 1.7; margin-bottom: 1.5rem; position: relative; padding-left: 1.25rem; border-left: 3px solid var(--accent-gold);">
          "${leadership.quote}"
        </p>

        <div class="yes-pillars-grid">
          ${leadership.pillars.map(p => `
            <div class="yes-pillar-card">
              <i class="fa-solid ${p.icon}"></i>
              <span>${p.text}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

/**
 * Render Civic Infrastructure (12 Master Pillars)
 */
function renderCivicInfrastructure(items) {
  const container = document.getElementById("civicGrid");
  if (!container || !items) return;

  container.innerHTML = items.map(c => `
    <div class="civic-card">
      <div class="civic-icon-box">
        <img src="${c.icon}" alt="${c.title}" />
      </div>
      <h4>${c.title}</h4>
      <p>${c.desc}</p>
      <div class="civic-status-tag">
        <i class="fa-solid fa-circle-check text-gold"></i>
        <span>${c.status}</span>
      </div>
    </div>
  `).join("");
}

/**
 * Render Dedicated Valencia Enclave Showcase
 */
function renderValenciaShowcase(v) {
  const container = document.getElementById("valenciaShowcaseContainer");
  if (!container || !v) return;

  container.innerHTML = `
    <!-- Brand Header -->
    <div class="valencia-brand-header">
      <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 0.85rem; flex-wrap: wrap;">
        <span style="background: rgba(244, 63, 94, 0.12); color: #e11d48; border: 1px solid rgba(244, 63, 94, 0.3); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 12px; border-radius: 20px;">
          <i class="fa-solid fa-sun text-gold"></i> Newly Launched Master Enclave
        </span>
        <span style="background: rgba(225, 29, 72, 0.08); color: #9f1239; border: 1px solid rgba(225, 29, 72, 0.2); font-size: 0.72rem; font-weight: 700; padding: 4px 12px; border-radius: 20px;">
          <i class="fa-solid fa-certificate"></i> MahaRERA: ${v.reraNo}
        </span>
      </div>

      <div class="valencia-logo-badge">
        <img src="${v.logo}" alt="${v.title} - ${v.tagline}" />
      </div>

      <h2 class="section-title" style="margin-bottom: 0.75rem;">
        Hola to the <span style="background: linear-gradient(135deg, #e11d48, #fb7185); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Brighter Side</span> of Life
      </h2>

      <p class="section-desc" style="max-width: 800px; margin: 0 auto;">
        ${v.overview}
      </p>
    </div>

    <!-- 4 Core Pillars Strip -->
    <div class="valencia-pillars-strip">
      ${v.pillars.map(p => `
        <div class="valencia-pillar-card">
          <img src="${p.icon}" alt="${p.title}" class="valencia-pillar-icon" />
          <h4>${p.title}</h4>
          <p>${p.desc}</p>
        </div>
      `).join("")}
    </div>

    <!-- Master Layout Stage -->
    <div class="valencia-layout-stage">
      <div class="valencia-map-wrapper">
        <img src="${v.masterLayout}" alt="Valencia Master Layout Plan" class="valencia-map-img" id="valenciaMasterLayoutImg" />
        <div style="position: absolute; bottom: 12px; right: 12px; background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(8px); color: #fff; font-size: 0.75rem; padding: 6px 14px; border-radius: 20px; display: flex; align-items: center; gap: 6px; cursor: pointer; border: 1px solid rgba(255, 255, 255, 0.2);" onclick="openValenciaLightbox('${v.masterLayout}', 'Valencia 5.9-Acre Master Layout Plan', 'G+28 High-Rise Towers with East-West Orientation, central courtyards, sports arena, and private forest trail.')">
          <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
          <span>Click to Enlarge Master Layout</span>
        </div>
      </div>

      <div class="valencia-layout-info">
        <div style="font-size: 0.75rem; font-weight: 700; color: #f43f5e; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem;">
          <i class="fa-solid fa-sun text-gold"></i> Sun-Side East-West Living
        </div>
        <h3>Architectural Masterpiece Across 5.9 Acres</h3>
        <p>
          Valencia towers are oriented East-West to welcome morning sunlight and cross-ventilation across the layout. 5 G+28 high-rise towers frame landscaped courtyards, wellness zones, and forest trails.
        </p>

        <!-- Grand Evening Entrance Preview -->
        <div style="border-radius: var(--radius-sm); overflow: hidden; border: 1px solid rgba(244, 63, 94, 0.2); margin-bottom: 1.5rem; position: relative;">
          <img src="${v.entrance}" alt="Valencia Grand Evening Entrance" style="width: 100%; height: 160px; object-fit: cover; display: block;" />
          <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 6px 12px; background: linear-gradient(180deg, transparent, rgba(0,0,0,0.85)); color: #fff; font-size: 0.75rem; font-weight: 600;">
            <i class="fa-solid fa-archway"></i> Grand Twilight Entrance Gateway
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button class="btn valencia-btn-primary" onclick="openValenciaInquiry('Valencia Master Layout & Cost Sheet')">
            <i class="fa-solid fa-file-invoice-dollar"></i> Request Valencia Cost Sheet
          </button>
          <a href="/pride-world-city-vip-site-visit" class="btn valencia-btn-outline" onclick="if(window.openVipExperienceModal){event.preventDefault();selectValenciaCluster();window.openVipExperienceModal('Valencia');}">
            <i class="fa-solid fa-calendar-check"></i> Book Valencia VIP Tour
          </a>
        </div>
      </div>
    </div>

    <!-- Floor Plans Section -->
    <div style="text-align: center; margin-bottom: 2rem;">
      <span style="color: #f43f5e; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">
        Floor Plans & Configurations
      </span>
      <h3 style="font-size: 1.85rem; margin-top: 0.25rem;">Sun-Side 2 & 3 BHK Living Spaces</h3>
      <p style="color: #64748b; font-size: 0.9rem; max-width: 600px; margin: 0 auto;">
        Zero dead space, spacious private sundeck balconies, and cross-ventilation designed to optimize natural air circulation.
      </p>
    </div>

    <div class="valencia-plans-grid">
      ${v.pricing.map(plan => `
        <div class="valencia-plan-card">
          <div class="valencia-plan-header">
            <div>
              <h4>${plan.typology}</h4>
              <span style="font-size: 0.82rem; color: #64748b; font-weight: 500;">Carpet: <strong>${plan.carpet}</strong></span>
            </div>
            <div class="valencia-plan-price">${plan.price}</div>
          </div>

          <div class="valencia-plan-img-wrap" style="cursor: pointer;" onclick="openValenciaLightbox('${plan.planImage}', '${plan.typology} (${plan.carpet})', '${plan.price} - East-West sunlight orientation with private sundecks (illustrative unit layout).')">
            <img src="${plan.planImage}" alt="${plan.typology} Floor Plan" />
          </div>

          <div class="valencia-plan-specs">
            ${plan.highlights.map(hl => `
              <div class="valencia-spec-row">
                <span><i class="fa-solid fa-circle-check" style="color: #f43f5e; margin-right: 6px;"></i> ${hl}</span>
                <strong>Included</strong>
              </div>
            `).join("")}
          </div>

          <div style="display: flex; gap: 0.75rem; margin-top: auto;">
            <button class="btn valencia-btn-outline" style="flex: 1; padding: 0.65rem 0.85rem; font-size: 0.82rem;" onclick="openValenciaLightbox('${plan.planImage}', '${plan.typology} Floor Plan', 'Carpet: ${plan.carpet} • ${plan.price}')">
              <i class="fa-solid fa-magnifying-glass-plus"></i> View Plan
            </button>
            <button class="btn valencia-btn-primary" style="flex: 1.2; padding: 0.65rem 0.85rem; font-size: 0.82rem;" onclick="openValenciaInquiry('${plan.typology}')">
              <i class="fa-solid fa-download"></i> Get Cost Sheet
            </button>
          </div>
        </div>
      `).join("")}
    </div>

    <!-- 20+ Amenities Section -->
    <div style="text-align: center; margin-bottom: 2.25rem;">
      <span style="color: #f43f5e; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">
        20+ Curated Enclave Amenities
      </span>
      <h3 style="font-size: 1.85rem; margin-top: 0.25rem;">Thematic Recreation & Wellness</h3>
      <p style="color: #64748b; font-size: 0.9rem; max-width: 600px; margin: 0 auto;">
        From twilight swimming pools to children's adventure zones, pickleball courts, and serene reflexology senior trails.
      </p>
    </div>

    <div class="valencia-amenities-grid">
      ${v.amenities.map(am => `
        <div class="valencia-amenity-card">
          <div class="valencia-amenity-media">
            <img src="${am.image}" alt="${am.category}" loading="lazy" />
          </div>
          <div class="valencia-amenity-body">
            <span class="valencia-amenity-tagline">${am.tagline}</span>
            <h4>${am.category}</h4>
            <p>${am.desc}</p>
          </div>
        </div>
      `).join("")}
    </div>

    <!-- Testimonials Showcase -->
    ${v.testimonials && v.testimonials.length ? `
      <div class="valencia-testimonials-wrap">
        <div style="text-align: center; margin-bottom: 2rem;">
          <span style="color: #f43f5e; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">
            Homeowner Testimonials
          </span>
          <h3 style="font-size: 1.7rem; margin-top: 0.25rem;">Voices of Valencia Residents</h3>
        </div>

        <div class="valencia-testimonials-grid">
          ${v.testimonials.map(t => `
            <div class="valencia-testimonial-card">
              <div>
                <div class="valencia-testi-stars">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
                <div class="valencia-testi-quote">
                  "${t.quote}"
                </div>
              </div>
              <div class="valencia-testi-user">
                <img src="${t.image}" alt="${t.name}" class="valencia-testi-avatar" />
                <div>
                  <div class="valencia-testi-name">${t.name}</div>
                  <div class="valencia-testi-role">${t.role}</div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    ` : ''}
  `;
}

/**
 * Open Valencia Lightbox for High-Res Plans / Layouts
 */
function openValenciaLightbox(imgSrc, title, desc) {
  const modal = document.getElementById("galleryLightboxModal");
  const img = document.getElementById("lightboxImage");
  const t = document.getElementById("lightboxTitle");
  const d = document.getElementById("lightboxDesc");
  const c = document.getElementById("lightboxCategory");

  if (modal && img) {
    img.src = imgSrc;
    if (t) t.innerText = title || "Valencia at Pride World City";
    if (d) d.innerText = desc || "Authentic floor plan and architectural rendering.";
    if (c) c.innerText = "Valencia Enclave";
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

/**
 * Pre-select Valencia in booking dropdown
 */
function selectValenciaCluster() {
  const select = document.getElementById("bookingClusterSelect");
  if (select) {
    select.value = "Valencia";
  }
}

/**
 * Open VIP inquiry prefilled for Valencia
 */
function openValenciaInquiry(planName) {
  if (window.openVipExperienceModal) {
    window.openVipExperienceModal("Valencia");
  } else {
    selectValenciaCluster();
    const bookingSec = document.getElementById("vip-booking");
    if (bookingSec) {
      bookingSec.scrollIntoView({ behavior: "smooth" });
    }
  }
  showToast(`Inquiry for ${planName} prepared in VIP Concierge!`);
}

window.openValenciaLightbox = openValenciaLightbox;
window.selectValenciaCluster = selectValenciaCluster;
window.openValenciaInquiry = openValenciaInquiry;

