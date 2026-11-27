/**
 * Pride World City - Interactive 400-Acre Masterplan Controller
 */

class MasterplanViewer {
  constructor(containerId, data) {
    this.container = document.getElementById(containerId);
    this.data = data;
    this.zoomLevel = 1;
    this.activeZoneId = null;
    this.init();
  }

  init() {
    this.renderSVG();
    this.renderZoneCards();
    this.renderSelectedZone("zone-lake");
    this.setupEventListeners();
  }

  renderSVG() {
    const svgHTML = `
      <svg class="masterplan-svg-root" viewBox="0 0 1000 650" xmlns="http://www.w3.org/2000/svg" id="masterplanSvg">
        <defs>
          <!-- Gradients -->
          <linearGradient id="lakeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0284c7" stop-opacity="0.9"/>
            <stop offset="50%" stop-color="#0369a1" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#0c4a6e" stop-opacity="0.95"/>
          </linearGradient>

          <linearGradient id="greeneryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#065f46" stop-opacity="0.65"/>
            <stop offset="100%" stop-color="#047857" stop-opacity="0.8"/>
          </linearGradient>

          <linearGradient id="residentialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1e293b" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95"/>
          </linearGradient>

          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#d4af37" stop-opacity="0.85"/>
            <stop offset="100%" stop-color="#aa8427" stop-opacity="0.95"/>
          </linearGradient>

          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Master Township Boundary & Background Landscape -->
        <rect width="1000" height="650" class="masterplan-bg-rect" rx="16"/>
        
        <!-- Topographical Contour Lines (Decorative luxury feel) -->
        <path d="M-50,150 Q250,80 550,160 T1050,110" fill="none" class="masterplan-contour-line" stroke-width="2"/>
        <path d="M-50,280 Q300,210 600,290 T1050,240" fill="none" class="masterplan-contour-line" stroke-width="2"/>
        <path d="M-50,420 Q220,360 520,440 T1050,380" fill="none" class="masterplan-contour-line" stroke-width="2"/>
        <path d="M-50,560 Q340,490 640,570 T1050,520" fill="none" class="masterplan-contour-line" stroke-width="2"/>

        <!-- 38-Acre Green Spine & Nature Park -->
        <path d="M 80,120 Q 220,60 380,90 C 480,110 520,240 450,340 C 390,420 280,480 140,450 Z" 
              fill="url(#greeneryGrad)" stroke="#10b981" stroke-width="1.5" stroke-opacity="0.4" />

        <!-- 7-Acre Central Lake & Promenade -->
        <g id="zone-lake" class="map-zone-group" data-zone-id="zone-lake">
          <path class="map-zone-polygon masterplan-lake-layer" 
                d="M 440,240 C 490,210 580,210 630,260 C 670,300 660,370 600,400 C 530,440 460,410 430,350 C 410,300 400,260 440,240 Z" />
          <circle cx="530" cy="310" r="14" fill="rgba(56,189,248,0.2)"/>
          <circle cx="530" cy="310" r="5" fill="#38bdf8"/>
          <!-- Water ripple circles -->
          <circle cx="530" cy="310" r="28" fill="none" stroke="#38bdf8" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/>
        </g>

        <!-- Grand Boulevard / Spine Network -->
        <path class="masterplan-boulevard" d="M 50,580 L 320,380 L 520,380 L 780,240 L 950,220" />
        <path class="masterplan-road-network" d="M 320,380 L 320,150 L 500,100 L 780,130" />
        <path class="masterplan-road-network" d="M 520,380 L 520,550 L 750,560 L 850,420" />
        <path class="masterplan-road-network" d="M 780,240 L 850,420" />

        <!-- Zone 1: Kingsbury & Montreal Enclave (Residential West) -->
        <g id="zone-residential" class="map-zone-group" data-zone-id="zone-residential">
          <polygon class="map-zone-polygon" points="140,160 300,130 330,290 180,330 110,240" 
                   fill="url(#residentialGrad)" stroke="#c5a059" stroke-width="1.8" />
          <!-- Tower footprints -->
          <rect x="150" y="170" width="30" height="30" rx="3" fill="#334155" stroke="#94a3b8" stroke-width="1"/>
          <rect x="195" y="165" width="32" height="32" rx="3" fill="#334155" stroke="#94a3b8" stroke-width="1"/>
          <rect x="245" y="175" width="28" height="28" rx="3" fill="#334155" stroke="#94a3b8" stroke-width="1"/>
          <rect x="160" y="230" width="35" height="35" rx="3" fill="#334155" stroke="#94a3b8" stroke-width="1"/>
          <rect x="220" y="235" width="35" height="35" rx="3" fill="#334155" stroke="#94a3b8" stroke-width="1"/>
        </g>

        <!-- Zone 2: Wellington & Miami Waterfront Enclave (Lakefront East) -->
        <g class="map-zone-group" data-zone-id="zone-residential">
          <polygon class="map-zone-polygon" points="630,220 810,180 840,340 680,380" 
                   fill="url(#residentialGrad)" stroke="#38bdf8" stroke-width="1.8" />
          <rect x="655" y="240" width="36" height="36" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
          <rect x="715" y="225" width="36" height="36" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
          <rect x="765" y="245" width="34" height="34" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
          <rect x="690" y="295" width="40" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
        </g>

        <!-- Zone 3: Long Island & Notting Hill (North Prestige Enclave) -->
        <g class="map-zone-group" data-zone-id="zone-residential">
          <polygon class="map-zone-polygon" points="360,50 560,40 590,160 380,170" 
                   fill="url(#residentialGrad)" stroke="#a855f7" stroke-width="1.8" />
          <rect x="390" y="70" width="45" height="45" rx="5" fill="#2e1065" stroke="#a855f7" stroke-width="1.2"/>
          <rect x="460" y="65" width="45" height="45" rx="5" fill="#2e1065" stroke="#a855f7" stroke-width="1.2"/>
          <rect x="525" y="75" width="40" height="40" rx="5" fill="#2e1065" stroke="#a855f7" stroke-width="1.2"/>
        </g>

        <!-- Zone 4: Club Royale (Township Mega Clubhouse) -->
        <g id="zone-clubroyale" class="map-zone-group" data-zone-id="zone-clubroyale">
          <polygon class="map-zone-polygon" points="350,270 420,250 440,330 370,350" 
                   fill="url(#goldGrad)" stroke="#ffffff" stroke-width="2" filter="url(#glowEffect)" />
          <text x="395" y="305" font-family="'Cinzel', serif" font-size="9" fill="#000" font-weight="bold" text-anchor="middle">CLUB ROYALE</text>
        </g>

        <!-- Zone 5: 10-Acre Multipurpose Sports Arena -->
        <g id="zone-sports" class="map-zone-group" data-zone-id="zone-sports">
          <polygon class="map-zone-polygon" points="140,430 330,390 350,540 160,560" 
                   fill="url(#greeneryGrad)" stroke="#10b981" stroke-width="2" />
          <!-- Cricket oval & tracks inside -->
          <ellipse cx="240" cy="475" rx="55" ry="35" fill="rgba(16,185,129,0.3)" stroke="#10b981" stroke-width="1.5" />
          <rect x="225" y="465" width="30" height="20" fill="#f59e0b" opacity="0.6"/>
        </g>

        <!-- Zone 6: CityWalk High Street & Pride Plaza Retail -->
        <g id="zone-highstreet" class="map-zone-group" data-zone-id="zone-highstreet">
          <polygon class="map-zone-polygon" points="530,460 740,430 760,530 550,560" 
                   fill="#312e81" stroke="#818cf8" stroke-width="2" />
          <rect x="555" y="480" width="35" height="45" rx="3" fill="#4338ca"/>
          <rect x="605" y="475" width="35" height="45" rx="3" fill="#4338ca"/>
          <rect x="655" y="470" width="35" height="45" rx="3" fill="#4338ca"/>
        </g>

        <!-- Zone 7: Pride Tech IT District & Business Towers -->
        <g id="zone-tech" class="map-zone-group" data-zone-id="zone-tech">
          <polygon class="map-zone-polygon" points="790,380 940,360 960,490 810,510" 
                   fill="#1e1b4b" stroke="#6366f1" stroke-width="2" />
          <rect x="820" y="400" width="40" height="60" rx="3" fill="#3730a3" stroke="#a5b4fc" stroke-width="1"/>
          <rect x="880" y="395" width="45" height="70" rx="3" fill="#3730a3" stroke="#a5b4fc" stroke-width="1"/>
        </g>

        <!-- Zone 8: K-12 Cambridge/CBSE International School -->
        <g id="zone-education" class="map-zone-group" data-zone-id="zone-education">
          <polygon class="map-zone-polygon" points="640,70 780,60 800,150 660,160" 
                   fill="#701a75" stroke="#f472b6" stroke-width="2" />
          <circle cx="720" cy="110" r="18" fill="rgba(244,114,182,0.3)" stroke="#f472b6" stroke-width="1.5"/>
        </g>

        <!-- Zone 9: 100-Bed Multi-Speciality Hospital -->
        <g id="zone-health" class="map-zone-group" data-zone-id="zone-health">
          <polygon class="map-zone-polygon" points="830,70 950,60 970,160 850,170" 
                   fill="#881337" stroke="#fb7185" stroke-width="2" />
          <!-- Red cross mark -->
          <rect x="895" y="105" width="10" height="24" fill="#fb7185"/>
          <rect x="888" y="112" width="24" height="10" fill="#fb7185"/>
        </g>

        <!-- Interactive Hotspot Pins & Beacons -->
        <g class="map-pin-group" data-zone-id="zone-residential" transform="translate(220, 240)">
          <circle class="beacon-pulse" cx="0" cy="0" r="6" fill="#c5a059" opacity="0.6"/>
          <circle cx="0" cy="0" r="10" fill="#c5a059" stroke="#fff" stroke-width="2"/>
          <text class="map-pin-label" x="0" y="24">Kingsbury & Montreal</text>
        </g>

        <g class="map-pin-group" data-zone-id="zone-lake" transform="translate(530, 310)">
          <circle class="beacon-pulse" cx="0" cy="0" r="6" fill="#38bdf8" opacity="0.8"/>
          <circle cx="0" cy="0" r="10" fill="#38bdf8" stroke="#fff" stroke-width="2"/>
          <text class="map-pin-label" x="0" y="24">7-Acre Central Lake</text>
        </g>

        <g class="map-pin-group" data-zone-id="zone-clubroyale" transform="translate(395, 305)">
          <circle class="beacon-pulse" cx="0" cy="0" r="6" fill="#d4af37" opacity="0.9"/>
          <circle cx="0" cy="0" r="12" fill="#d4af37" stroke="#000" stroke-width="2"/>
          <text class="map-pin-label" x="0" y="26">Club Royale (50k sq.ft)</text>
        </g>

        <g class="map-pin-group" data-zone-id="zone-sports" transform="translate(240, 480)">
          <circle class="beacon-pulse" cx="0" cy="0" r="6" fill="#10b981" opacity="0.7"/>
          <circle cx="0" cy="0" r="10" fill="#10b981" stroke="#fff" stroke-width="2"/>
          <text class="map-pin-label" x="0" y="24">10-Acre Sports Arena</text>
        </g>

        <g class="map-pin-group" data-zone-id="zone-highstreet" transform="translate(640, 495)">
          <circle class="beacon-pulse" cx="0" cy="0" r="6" fill="#818cf8" opacity="0.7"/>
          <circle cx="0" cy="0" r="10" fill="#818cf8" stroke="#fff" stroke-width="2"/>
          <text class="map-pin-label" x="0" y="24">CityWalk High Street</text>
        </g>

        <g class="map-pin-group" data-zone-id="zone-residential" transform="translate(730, 280)">
          <circle class="beacon-pulse" cx="0" cy="0" r="6" fill="#38bdf8" opacity="0.7"/>
          <circle cx="0" cy="0" r="10" fill="#38bdf8" stroke="#fff" stroke-width="2"/>
          <text class="map-pin-label" x="0" y="24">Wellington & Miami</text>
        </g>

        <!-- Grand Entrance Gate & Security Checkpoint -->
        <g transform="translate(60, 580)">
          <rect x="-10" y="-15" width="60" height="30" rx="4" fill="#0f172a" stroke="#c5a059" stroke-width="2"/>
          <text x="20" y="5" font-size="9" fill="#c5a059" font-weight="bold" text-anchor="middle">MAIN GATEWAY</text>
        </g>
      </svg>
      <div id="masterplanTooltip" class="map-tooltip-box">
        <div class="map-tooltip-title">Zone Name</div>
        <div class="map-tooltip-sub">Zone Description</div>
      </div>
    `;

    this.container.innerHTML = svgHTML;
  }

  renderZoneCards() {
    const listContainer = document.getElementById("zoneCardsList");
    if (!listContainer) return;

    listContainer.innerHTML = this.data.townshipZones.map(zone => `
      <div class="zone-item-card" data-zone-id="${zone.id}">
        <div class="zone-icon-box">
          <i class="fa-solid ${zone.icon}"></i>
        </div>
        <div class="zone-item-info">
          <h4>${zone.name}</h4>
          <p>${zone.desc}</p>
          <span class="zone-badge-pill">${zone.area}</span>
        </div>
      </div>
    `).join("");
  }

  setupEventListeners() {
    const svg = document.getElementById("masterplanSvg");
    const tooltip = document.getElementById("masterplanTooltip");
    const zoneElements = svg.querySelectorAll("[data-zone-id]");
    const cards = document.querySelectorAll(".zone-item-card");

    // Map Hover and Click
    zoneElements.forEach(el => {
      const zoneId = el.getAttribute("data-zone-id");
      const zoneData = this.data.townshipZones.find(z => z.id === zoneId);

      el.addEventListener("mouseenter", (e) => {
        this.highlightZone(zoneId);
        if (zoneData && tooltip) {
          tooltip.querySelector(".map-tooltip-title").innerText = zoneData.name;
          tooltip.querySelector(".map-tooltip-sub").innerText = `${zoneData.area} • Click to explore details`;
          tooltip.classList.add("visible");
        }
      });

      el.addEventListener("mousemove", (e) => {
        if (!tooltip) return;
        const rect = this.container.getBoundingClientRect();
        tooltip.style.left = `${e.clientX - rect.left}px`;
        tooltip.style.top = `${e.clientY - rect.top - 15}px`;
      });

      el.addEventListener("mouseleave", () => {
        if (tooltip) tooltip.classList.remove("visible");
      });

      el.addEventListener("click", () => {
        this.selectZone(zoneId);
      });
    });

    // Card Click & Hover
    cards.forEach(card => {
      const zoneId = card.getAttribute("data-zone-id");
      card.addEventListener("mouseenter", () => {
        this.highlightZone(zoneId);
      });
      card.addEventListener("click", () => {
        this.selectZone(zoneId);
      });
    });

    // Zoom Controls
    const zoomInBtn = document.getElementById("mapZoomIn") || document.getElementById("zoomInMapBtn");
    const zoomOutBtn = document.getElementById("mapZoomOut") || document.getElementById("zoomOutMapBtn");
    const resetZoomBtn = document.getElementById("mapReset") || document.getElementById("resetZoomMapBtn");

    if (zoomInBtn) {
      zoomInBtn.addEventListener("click", () => this.adjustZoom(0.2));
    }
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener("click", () => this.adjustZoom(-0.2));
    }
    if (resetZoomBtn) {
      resetZoomBtn.addEventListener("click", () => {
        this.zoomLevel = 1;
        svg.style.transform = `scale(1)`;
      });
    }
  }

  adjustZoom(delta) {
    const svg = document.getElementById("masterplanSvg");
    this.zoomLevel = Math.max(0.8, Math.min(2.0, this.zoomLevel + delta));
    svg.style.transform = `scale(${this.zoomLevel})`;
  }

  renderSelectedZone(zoneId) {
    const card = document.getElementById("selectedZoneCard");
    if (!card) return;

    const zone = this.data.townshipZones.find(z => z.id === zoneId) || this.data.townshipZones[0];
    if (!zone) return;

    const highlightsMap = {
      "zone-residential": ["Valencia, Miami, Wellington, Montreal, Kingsbury, Boston", "G+28 High-Rise Towers & Sky Penthouses", "100% East-West Sunlight Exposure"],
      "zone-lake": ["2.4 km Waterfront Walking Boardwalk", "Musical Water Fountain & Sunset Deck", "Restored 7-Acre Natural Lake Ecosystem"],
      "zone-sports": ["Full-Size Floodlit Cricket & Football Pitch", "6 Synthetic Tennis & Pickleball Courts", "Professional Training Academy & Veloway"],
      "zone-clubroyale": ["Heated Indoor Swimming Pool & Hydrotherapy Jacuzzi", "4-Lane Bowling Alley & 4K Cinema Theater", "Banquets & Rooftop Sunset Lounge"],
      "zone-education": ["K-12 Cambridge & CBSE Curriculum School", "Safe Walk-to-School Child Corridor", "Modern Science & Robotics Laboratories"],
      "zone-highstreet": ["High-Street Cafes, Patisseries & Fine Dining", "Convenience Hypermarket, Banks & Pharmacies", "Open-Air Amphitheater & Town Plaza"],
      "zone-tech": ["Grade-A IT & Enterprise Business Parks", "Zero-Commute Walk-to-Work Lifestyle", "EV Charging Hubs & Fiber Gigabit Infra"],
      "zone-health": ["24/7 Emergency Medical Response Unit", "Multi-Speciality Clinics & Diagnostics", "On-Premises Pharmacy & Ambulance Bay"]
    };

    const highlights = highlightsMap[zone.id] || [zone.desc];

    card.innerHTML = `
      <div class="selected-zone-header">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <div class="zone-icon-box" style="width: 34px; height: 34px; font-size: 0.95rem;">
            <i class="fa-solid ${zone.icon}"></i>
          </div>
          <h3>${zone.name}</h3>
        </div>
        <span class="zone-area-badge"><i class="fa-solid fa-vector-square"></i> ${zone.area}</span>
      </div>
      <p class="selected-zone-desc">${zone.desc}</p>
      <div class="selected-zone-features">
        ${highlights.map(h => `
          <div class="selected-zone-feat-item">
            <i class="fa-solid fa-circle-check text-gold"></i>
            <span>${h}</span>
          </div>
        `).join("")}
      </div>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <a href="/which-cluster-to-buy-pride-world-city" class="btn btn-outline-gold" style="padding: 0.45rem 0.85rem; font-size: 0.78rem; border-radius: var(--radius-sm);" onclick="if(document.getElementById('clusters')){event.preventDefault();document.getElementById('clusters').scrollIntoView({behavior:'smooth'});}">
          <i class="fa-solid fa-building"></i> View Enclaves
        </a>
        <button onclick="window.openVipExperienceModal()" class="btn btn-gold" style="padding: 0.45rem 0.85rem; font-size: 0.78rem; border-radius: var(--radius-sm);">
          <i class="fa-solid fa-golf-ball-tee"></i> Buggy Tour
        </button>
      </div>
    `;
  }

  highlightZone(zoneId) {
    // Reset active classes
    const svg = document.getElementById("masterplanSvg");
    svg.querySelectorAll("[data-zone-id]").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".zone-item-card").forEach(c => c.classList.remove("active"));

    // Activate matching
    const matchingSvg = svg.querySelectorAll(`[data-zone-id="${zoneId}"]`);
    matchingSvg.forEach(el => el.classList.add("active"));

    const matchingCard = document.querySelector(`.zone-item-card[data-zone-id="${zoneId}"]`);
    if (matchingCard) {
      matchingCard.classList.add("active");
    }

    this.renderSelectedZone(zoneId);
  }

  selectZone(zoneId) {
    this.highlightZone(zoneId);
    const card = document.querySelector(`.zone-item-card[data-zone-id="${zoneId}"]`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

// Global initialization helper
window.MasterplanViewer = MasterplanViewer;
