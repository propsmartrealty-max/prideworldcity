/**
 * Pride World City - 360 Virtual Tour & Architectural Lighting Simulator
 */

class TourExperience {
  constructor(canvasId) {
    this.canvasArea = document.getElementById(canvasId);
    this.activeScene = "pool";
    this.currentMode = "day"; // 'day', 'sunset', 'night'
    
    this.scenes = {
      pool: {
        title: "Club Royale Infinity Pool & Floating Cabanas",
        sub: "50,000 Sq. Ft. Flagship Clubhouse",
        image: "assets/images/montreal-swimming-pool.webp",
        hotspots: [
          { x: 30, y: 60, title: "Sunken Pool Bar", desc: "Craft mocktails & artisan gelatos" },
          { x: 75, y: 45, title: "Private Floating Cabanas", desc: "Curated lounging with butler call" },
          { x: 50, y: 25, title: "Skyline Jacuzzi Deck", desc: "Heated hydrotherapy with scenic horizon" }
        ]
      },
      lake: {
        title: "7-Acre Central Lake & Waterfront Promenade",
        sub: "Eco-Restored Water Ecosystem",
        image: "assets/images/Wellington_CASA-Banner-1920x700-px.png.bv.webp",
        hotspots: [
          { x: 25, y: 65, title: "Musical Fountain Plaza", desc: "Choreographed light & sound evenings" },
          { x: 55, y: 50, title: "Wooden Jogging Boardwalk", desc: "2.4 km unbroken scenic loop" },
          { x: 80, y: 35, title: "Sunset Observation Pier", desc: "Prime golden hour viewing deck" }
        ]
      },
      skydeck: {
        title: "Long Island Presidential Sky Lounge",
        sub: "Level 24 Unobstructed Mountain Panoramas",
        image: "assets/images/pride-world-city-Bird-eye-view.jpeg.bv.webp",
        hotspots: [
          { x: 40, y: 55, title: "40-Ft Continuous Sky Deck", desc: "Seamless indoor-outdoor glass transition" },
          { x: 70, y: 40, title: "Bespoke Wine Cellar", desc: "Climate-controlled private vintages" }
        ]
      },
      sports: {
        title: "10-Acre Multipurpose Sports Complex & Club Charholi",
        sub: "Professional Athletics & Training",
        image: "assets/images/Completed_Club_charholi-1280x416.webp",
        hotspots: [
          { x: 35, y: 55, title: "FIFA-Grade Turf", desc: "Full floodlit football & cricket pitch" },
          { x: 65, y: 60, title: "6 Synthetic Tennis Courts", desc: "Professional coaching academy" }
        ]
      },
      highstreet: {
        title: "CityWalk High Street & Town Plaza",
        sub: "Alfresco Dining, Cafes & Branded Retail",
        image: "assets/images/Completed_townplaza-1280x416.webp",
        hotspots: [
          { x: 30, y: 70, title: "Alfresco Parisian Cafes", desc: "Outdoor European-style seating" },
          { x: 60, y: 45, title: "Multiplex & Gaming Arena", desc: "4K Dolby Atmos cinema screens" }
        ]
      }
    };

    this.init();
  }

  init() {
    this.renderScene(this.activeScene);
    this.setupSceneButtons();
    this.setupLightingToggles();
  }

  renderScene(sceneKey) {
    const scene = this.scenes[sceneKey];
    if (!scene || !this.canvasArea) return;

    this.activeScene = sceneKey;
    this.canvasArea.style.backgroundImage = `url('${scene.image}')`;
    
    // Update Scene title
    const titleEl = document.getElementById("tourSceneTitle");
    const subEl = document.getElementById("tourSceneSub");
    if (titleEl) titleEl.innerText = scene.title;
    if (subEl) subEl.innerText = scene.sub;

    // Remove existing hotspots
    const oldHotspots = this.canvasArea.querySelectorAll(".tour-hotspot-pin");
    oldHotspots.forEach(h => h.remove());

    // Add new hotspots
    scene.hotspots.forEach(spot => {
      const pin = document.createElement("div");
      pin.className = "tour-hotspot-pin";
      pin.style.left = `${spot.x}%`;
      pin.style.top = `${spot.y}%`;
      pin.innerHTML = `
        <i class="fa-solid fa-plus"></i>
        <div class="hotspot-popup">
          <strong>${spot.title}</strong>
          <div>${spot.desc}</div>
        </div>
      `;
      this.canvasArea.appendChild(pin);
    });

    this.applyLightingMode(this.currentMode);
  }

  setupSceneButtons() {
    const btns = document.querySelectorAll(".scene-btn");
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        btns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const sceneKey = btn.getAttribute("data-scene");
        this.renderScene(sceneKey);
      });
    });
  }

  setupLightingToggles() {
    const modeBtns = document.querySelectorAll(".mode-btn");
    modeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        modeBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const mode = btn.getAttribute("data-mode");
        this.setLightingMode(mode);
      });
    });
  }

  setLightingMode(mode) {
    this.currentMode = mode;
    document.body.classList.remove("mode-night", "mode-sunset");

    if (mode === "night") {
      document.body.classList.add("mode-night");
    } else if (mode === "sunset") {
      document.body.classList.add("mode-sunset");
    }

    this.applyLightingMode(mode);
  }

  applyLightingMode(mode) {
    if (!this.canvasArea) return;

    if (mode === "day") {
      this.canvasArea.style.filter = "brightness(1.1) saturate(1.1) contrast(1.02)";
    } else if (mode === "sunset") {
      this.canvasArea.style.filter = "sepia(0.35) hue-rotate(-20deg) saturate(1.3) contrast(1.08) brightness(0.95)";
    } else {
      // Night (default luxury glow)
      this.canvasArea.style.filter = "brightness(0.85) contrast(1.15) saturate(1.1)";
    }
  }
}

window.TourExperience = TourExperience;
