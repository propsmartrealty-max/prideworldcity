/**
 * Pride World City - Clusters Showcase & Interactive Floor Plans
 */

class ClusterManager {
  constructor(gridId, data) {
    this.grid = document.getElementById(gridId);
    this.data = data;
    this.activeFilter = "all";
    this.init();
  }

  init() {
    this.renderClusters();
    this.setupFilterButtons();
    this.setupModal();
  }

  renderClusters() {
    if (!this.grid) return;

    const filtered = this.data.clusters.filter(c => {
      if (this.activeFilter === "all") return true;
      if (c.id === this.activeFilter) return true;
      if (this.activeFilter === "1bhk") return c.configurations.some(cfg => cfg.includes("1 BHK"));
      if (this.activeFilter === "2bhk") return c.configurations.some(cfg => cfg.includes("2 BHK"));
      if (this.activeFilter === "3bhk") return c.configurations.some(cfg => cfg.includes("3 BHK"));
      if (this.activeFilter === "4bhk") return c.configurations.some(cfg => cfg.includes("4 BHK") || cfg.includes("Villas") || cfg.includes("Duplex") || cfg.includes("4.5 BHK"));
      if (this.activeFilter === "ready") return c.status.toLowerCase().includes("ready") || c.status.toLowerCase().includes("delivered") || c.status.toLowerCase().includes("resale");
      if (this.activeFilter === "under-construction") return c.status.toLowerCase().includes("under") || c.status.toLowerCase().includes("launch");
      return true;
    });

    const slugMap = { nottinghill: "notting-hill", longisland: "long-island" };
    this.grid.innerHTML = filtered.map(c => {
      const clusterSlug = slugMap[c.id] || c.id;
      return `
      <div class="cluster-card" data-id="${c.id}">
        <div class="cluster-card-media">
          <img src="${c.image}" alt="${c.name} - Pride World City" loading="lazy"/>
          <span class="cluster-badge">${c.badge}</span>
          <span class="cluster-status-pill"><i class="fa-solid fa-clock"></i> ${c.status.split('/')[0]}</span>
          <div class="cluster-price-overlay">
            <div>
              <div class="price-title">Starting Price</div>
              <div class="price-value">${c.priceStarting}</div>
            </div>
            <div style="text-align: right;">
              <div class="price-title">Configurations</div>
              <div style="font-size: 0.85rem; font-weight: 600; color: #fff;">${c.configurations.join(", ")}</div>
            </div>
          </div>
        </div>

        <div class="cluster-card-body">
          <div class="cluster-header-wrap">
            <h3 class="cluster-name"><a href="/${clusterSlug}" style="color: inherit; text-decoration: none;">${c.name}</a></h3>
            <span class="cluster-type">${c.type}</span>
          </div>
          <p class="cluster-desc">${c.description} <a href="/${clusterSlug}" style="color: var(--accent-gold); font-weight: 600; font-size: 0.82rem; white-space: nowrap;">Explore ${c.name} &rarr;</a></p>

          <div class="cluster-specs-grid">
            <div class="spec-cell">
              <span class="spec-label">Carpet Area</span>
              <div class="spec-val">${c.carpetArea}</div>
            </div>
            <div class="spec-cell">
              <span class="spec-label">Elevation / Towers</span>
              <div class="spec-val">${c.towers.split('(')[0]}</div>
            </div>
            <div class="spec-cell">
              <span class="spec-label">RERA Number</span>
              <div class="spec-val text-gold" style="font-size: 0.78rem;">${c.reraNo}</div>
            </div>
            <div class="spec-cell">
              <span class="spec-label">Key Highlight</span>
              <div class="spec-val" style="font-size: 0.78rem;">${c.features[0]}</div>
            </div>
          </div>

          <div class="cluster-card-footer" style="display: flex; gap: 0.45rem; flex-wrap: wrap;">
            <button class="btn btn-outline-gold view-floorplans-btn" data-cluster-id="${c.id}" style="flex: 1; padding: 0.6rem 0.5rem; font-size: 0.78rem;">
              <i class="fa-solid fa-compass-drafting"></i> Floor Plans
            </button>
            ${c.masterLayout ? `
              <button class="btn btn-glass view-cluster-layout-btn" data-layout-img="${c.masterLayout}" data-cluster-name="${c.name}" style="flex: 1; padding: 0.6rem 0.5rem; font-size: 0.78rem;">
                <i class="fa-solid fa-map-location-dot"></i> Master Layout
              </button>
            ` : ''}
            <button class="btn btn-gold book-tour-cluster-btn" data-cluster-name="${c.name}" style="flex: 1; padding: 0.6rem 0.5rem; font-size: 0.78rem;">
              <i class="fa-solid fa-calendar-check"></i> Book Visit
            </button>
          </div>
        </div>
      </div>
    `; }).join("");

    this.attachCardEvents();
  }

  setupFilterButtons() {
    const chips = document.querySelectorAll(".filter-chip");
    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        chips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        this.activeFilter = chip.getAttribute("data-filter");
        this.renderClusters();
      });
    });
  }

  attachCardEvents() {
    const floorPlanBtns = this.grid.querySelectorAll(".view-floorplans-btn");
    floorPlanBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const clusterId = btn.getAttribute("data-cluster-id");
        this.openFloorPlanModal(clusterId);
      });
    });

    const layoutBtns = this.grid.querySelectorAll(".view-cluster-layout-btn");
    layoutBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const layoutImg = btn.getAttribute("data-layout-img");
        const clusterName = btn.getAttribute("data-cluster-name");
        if (window.openValenciaLightbox) {
          window.openValenciaLightbox(layoutImg, `${clusterName} Master Layout Plan`, `Authentic high-resolution master layout plan for ${clusterName} enclave within Pride World City.`);
        }
      });
    });

    const bookBtns = this.grid.querySelectorAll(".book-tour-cluster-btn");
    bookBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const clusterName = btn.getAttribute("data-cluster-name");
        const clusterSelect = document.getElementById("bookingClusterSelect");
        if (clusterSelect) {
          clusterSelect.value = clusterName;
        }
        const bookingSection = document.getElementById("vip-booking");
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  setupModal() {
    let backdrop = document.getElementById("floorPlanModal");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.id = "floorPlanModal";
      backdrop.className = "modal-backdrop";
      backdrop.innerHTML = `
        <div class="modal-content-card">
          <button class="modal-close-btn" id="closeFloorPlanModal"><i class="fa-solid fa-xmark"></i></button>
          <div id="modalFloorPlanBody"></div>
        </div>
      `;
      document.body.appendChild(backdrop);

      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) this.closeFloorPlanModal();
      });

      document.getElementById("closeFloorPlanModal").addEventListener("click", () => {
        this.closeFloorPlanModal();
      });
    }
  }

  openFloorPlanModal(clusterId) {
    const cluster = this.data.clusters.find(c => c.id === clusterId);
    if (!cluster) return;

    const modalBody = document.getElementById("modalFloorPlanBody");
    const activePlan = cluster.floorPlans[0];

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span class="section-kicker">${cluster.name} • Architectural Blueprints</span>
        <h2 style="font-size: 1.85rem; color: #fff; margin-bottom: 0.35rem;">Floor Plans & Specifications</h2>
        <p style="color: var(--text-muted); font-size: 0.9rem;">MahaRERA: <span class="text-gold">${cluster.reraNo}</span> • Vastu-Oriented Layouts</p>
      </div>

      <div style="display: flex; gap: 0.75rem; margin-bottom: 1.75rem;" id="planTabsWrap">
        ${cluster.floorPlans.map((fp, i) => `
          <button class="filter-chip plan-tab-btn ${i === 0 ? 'active' : ''}" data-plan-index="${i}">
            ${fp.name} (${fp.carpet})
          </button>
        `).join("")}
      </div>

      <div id="activePlanDisplayArea" style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 2rem; align-items: center;">
        ${this.renderPlanDetail(activePlan, cluster)}
      </div>

      <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <span style="font-size: 0.8rem; color: var(--text-dim);">Cluster Starting From</span>
          <div style="font-family: var(--font-serif); font-size: 1.5rem; font-weight: 700; color: var(--accent-gold-light);">${cluster.priceStarting}</div>
        </div>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          ${cluster.masterLayout ? `
            <button class="btn btn-glass" onclick="window.openValenciaLightbox('${cluster.masterLayout}', '${cluster.name} Master Layout Plan', 'High-resolution architectural layout of ${cluster.name} within Pride World City.')">
              <i class="fa-solid fa-map-location-dot"></i> View Master Layout Blueprint
            </button>
          ` : ''}
          <button class="btn btn-gold" onclick="window.requestInstantQuote('${cluster.name}')">
            <i class="fa-solid fa-file-invoice-dollar"></i> Get Complete Cost Sheet
          </button>
        </div>
      </div>
    `;

    // Hook tab switches
    const planTabBtns = modalBody.querySelectorAll(".plan-tab-btn");
    planTabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        planTabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const idx = parseInt(btn.getAttribute("data-plan-index"));
        const displayArea = document.getElementById("activePlanDisplayArea");
        displayArea.innerHTML = this.renderPlanDetail(cluster.floorPlans[idx], cluster);
      });
    });

    document.getElementById("floorPlanModal").classList.add("open");
    document.body.style.overflow = "hidden";
  }

  renderPlanDetail(plan, cluster) {
    const visualContent = plan.planImage ? `
      <div style="background: #0f172a; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 280px; position: relative; cursor: pointer;" onclick="window.openValenciaLightbox('${plan.planImage}', '${cluster.name} - ${plan.name}', 'Carpet: ${plan.carpet} • Balcony: ${plan.balcony || 'Private Deck'} • ${plan.rooms || ''}')">
        <img src="${plan.planImage}" alt="${plan.name} Floor Plan Blueprint" style="max-width: 100%; max-height: 300px; object-fit: contain; border-radius: 4px;" />
        <span style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.75); color: #fff; font-size: 0.72rem; padding: 4px 10px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2);">
          <i class="fa-solid fa-up-right-and-down-left-from-center"></i> Click to Enlarge Plan
        </span>
      </div>
    ` : `
      <svg viewBox="0 0 500 380" style="width: 100%; max-height: 320px;" xmlns="http://www.w3.org/2000/svg">
        <!-- Architectural Blueprint 2D Graphic -->
        <rect width="500" height="380" fill="#0b1329" rx="8"/>
        <!-- Grid lines -->
        <defs>
          <pattern id="gridPattern" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="500" height="380" fill="url(#gridPattern)" />

        <!-- Outer Walls -->
        <rect x="40" y="40" width="420" height="300" fill="none" stroke="#c5a059" stroke-width="4"/>

        <!-- Master Bedroom -->
        <rect x="45" y="45" width="180" height="150" fill="rgba(197,160,89,0.06)" stroke="#64748b" stroke-width="2"/>
        <text x="135" y="115" fill="#fff" font-size="12" font-weight="600" text-anchor="middle">Master Bedroom</text>
        <text x="135" y="135" fill="#94a3b8" font-size="10" text-anchor="middle">13'0" x 12'6"</text>

        <!-- Master En-suite Bath -->
        <rect x="45" y="195" width="90" height="70" fill="rgba(56,189,248,0.08)" stroke="#64748b" stroke-width="1.5"/>
        <text x="90" y="235" fill="#38bdf8" font-size="10" text-anchor="middle">Bath</text>

        <!-- Bedroom 2 -->
        <rect x="45" y="265" width="180" height="70" fill="rgba(197,160,89,0.04)" stroke="#64748b" stroke-width="2"/>
        <text x="135" y="305" fill="#fff" font-size="11" text-anchor="middle">Bedroom 2</text>

        <!-- Living & Dining Salon -->
        <rect x="225" y="45" width="230" height="180" fill="rgba(255,255,255,0.03)" stroke="#64748b" stroke-width="2"/>
        <text x="340" y="125" fill="#fff" font-size="13" font-weight="700" text-anchor="middle">Living & Dining Salon</text>
        <text x="340" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">21'6" x 14'0"</text>

        <!-- Kitchen & Utility -->
        <rect x="225" y="225" width="130" height="110" fill="rgba(16,185,129,0.06)" stroke="#64748b" stroke-width="2"/>
        <text x="290" y="275" fill="#10b981" font-size="11" text-anchor="middle">Kitchen & Dry</text>

        <!-- Sundeck Balcony -->
        <rect x="355" y="225" width="100" height="110" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 2"/>
        <text x="405" y="275" fill="#f59e0b" font-size="11" font-weight="600" text-anchor="middle">Sky Terrace</text>
        <text x="405" y="295" fill="#f59e0b" font-size="9" text-anchor="middle">${plan.balcony}</text>
      </svg>
    `;

    return `
      <div style="background: #060a14; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.5rem; text-align: center;">
        ${visualContent}
        <span style="display: inline-block; margin-top: 0.75rem; font-size: 0.72rem; color: var(--text-dim);">
          <i class="fa-solid fa-compass"></i> Compass: ${plan.orientation}
        </span>
      </div>

      <div>
        <h3 style="font-size: 1.3rem; color: #fff; margin-bottom: 0.75rem;">${plan.name}</h3>
        <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.88rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">
            <span style="color: var(--text-muted);">Usable Carpet Area</span>
            <strong style="color: #fff;">${plan.carpet}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.88rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">
            <span style="color: var(--text-muted);">Sundeck Balcony</span>
            <strong style="color: var(--accent-gold-light);">${plan.balcony}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.88rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">
            <span style="color: var(--text-muted);">Orientation</span>
            <strong style="color: #fff;">${plan.orientation}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.88rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">
            <span style="color: var(--text-muted);">Layout Breakdown</span>
            <span style="color: var(--text-muted); text-align: right; max-width: 60%;">${plan.rooms}</span>
          </div>
        </div>

        <h4 style="font-size: 0.95rem; color: #fff; margin-bottom: 0.6rem;">Included Cluster Amenities:</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.4rem;">
          ${cluster.features.slice(0, 4).map(f => `
            <li style="font-size: 0.82rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-circle-check text-gold" style="font-size: 0.75rem;"></i> ${f}
            </li>
          `).join("")}
        </ul>
      </div>
    `;
  }

  closeFloorPlanModal() {
    const modal = document.getElementById("floorPlanModal");
    if (modal) {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }
  }
}

window.requestInstantQuote = function(clusterName) {
  const modal = document.getElementById("floorPlanModal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
  const clusterSelect = document.getElementById("bookingClusterSelect");
  if (clusterSelect) {
    clusterSelect.value = clusterName;
  }
  const bookingSec = document.getElementById("vip-booking");
  if (bookingSec) {
    bookingSec.scrollIntoView({ behavior: "smooth" });
  }
};

window.ClusterManager = ClusterManager;
