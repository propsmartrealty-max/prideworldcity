/**
 * Pride World City - Mega Media Gallery & Fullscreen Lightbox Controller
 */

class TownshipGallery {
  constructor(gridId, data) {
    this.grid = document.getElementById(gridId);
    this.data = data;
    this.activeFilter = "all";
    this.currentIndex = 0;
    this.filteredItems = [];

    this.lightbox = document.getElementById("galleryLightboxModal");
    this.lightboxImg = document.getElementById("lightboxImage");
    this.lightboxTitle = document.getElementById("lightboxTitle");
    this.lightboxDesc = document.getElementById("lightboxDesc");
    this.lightboxCategory = document.getElementById("lightboxCategory");

    this.init();
  }

  init() {
    if (!this.grid || !this.data.galleryItems) return;

    this.renderGallery();
    this.setupFilterTabs();
    this.setupLightboxEvents();
  }

  renderGallery() {
    this.filteredItems = this.data.galleryItems.filter(item => {
      if (this.activeFilter === "all") return true;
      return item.category === this.activeFilter;
    });

    this.grid.innerHTML = this.filteredItems.map((item, idx) => `
      <div class="gallery-item-card" data-gallery-index="${idx}">
        <img src="${item.image}" alt="${item.title}" loading="lazy"/>
        <div class="gallery-expand-icon">
          <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
        </div>
        <div class="gallery-item-overlay">
          <span class="gallery-cat-pill">${item.categoryLabel}</span>
          <h4 class="gallery-item-title">${item.title}</h4>
        </div>
      </div>
    `).join("");

    this.attachCardClicks();
  }

  setupFilterTabs() {
    const tabs = document.querySelectorAll(".gallery-filter-chip");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        this.activeFilter = tab.getAttribute("data-gallery-filter");
        this.renderGallery();
      });
    });
  }

  attachCardClicks() {
    const cards = this.grid.querySelectorAll(".gallery-item-card");
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const idx = parseInt(card.getAttribute("data-gallery-index"));
        this.openLightbox(idx);
      });
    });
  }

  openLightbox(index) {
    if (!this.lightbox || !this.filteredItems[index]) return;

    this.currentIndex = index;
    const item = this.filteredItems[index];

    this.lightboxImg.src = item.image;
    this.lightboxImg.alt = item.title;
    this.lightboxTitle.innerText = item.title;
    this.lightboxDesc.innerText = item.desc || "";
    this.lightboxCategory.innerText = item.categoryLabel;

    this.lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  closeLightbox() {
    if (this.lightbox) {
      this.lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  nextImage() {
    if (this.filteredItems.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.filteredItems.length;
    this.openLightbox(this.currentIndex);
  }

  prevImage() {
    if (this.filteredItems.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.filteredItems.length) % this.filteredItems.length;
    this.openLightbox(this.currentIndex);
  }

  setupLightboxEvents() {
    if (!this.lightbox) return;

    const closeBtn = document.getElementById("closeLightboxBtn");
    const nextBtn = document.getElementById("lightboxNextBtn");
    const prevBtn = document.getElementById("lightboxPrevBtn");

    if (closeBtn) closeBtn.addEventListener("click", () => this.closeLightbox());
    if (nextBtn) nextBtn.addEventListener("click", () => this.nextImage());
    if (prevBtn) prevBtn.addEventListener("click", () => this.prevImage());

    this.lightbox.addEventListener("click", (e) => {
      if (e.target === this.lightbox) this.closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (!this.lightbox.classList.contains("open")) return;
      if (e.key === "Escape") this.closeLightbox();
      if (e.key === "ArrowRight") this.nextImage();
      if (e.key === "ArrowLeft") this.prevImage();
    });
  }
}

window.TownshipGallery = TownshipGallery;
