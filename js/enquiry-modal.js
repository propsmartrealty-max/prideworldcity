/**
 * Pride World City - Creative VIP Experience & Chauffeur Enquiry Modal Controller
 */

(function () {
  let currentStep = 1;
  let selectedEnclave = "Valencia";
  let selectedTypology = "2 BHK Residence";
  let selectedBudget = "₹ 95 L - ₹ 1.35 Cr";
  let selectedTimeSlot = "10:00 AM (Morning Sun)";

  function initVipModal() {
    const modal = document.getElementById("vipExperienceModal");
    const floatingBtn = document.getElementById("floatingVipTrigger");
    const closeBtn = document.getElementById("closeVipModalBtn");

    if (!modal) return;

    // 1. Floating Trigger
    if (floatingBtn) {
      floatingBtn.addEventListener("click", () => openVipExperienceModal());
    }

    // 2. Close Button
    if (closeBtn) {
      closeBtn.addEventListener("click", () => closeVipExperienceModal());
    }

    // 3. Close on backdrop click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeVipExperienceModal();
    });

    // 4. Keyboard ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) {
        closeVipExperienceModal();
      }
    });

    // 5. Hook Navbar VIP button
    const navVipBtn = document.querySelector(".btn-nav-vip");
    if (navVipBtn) {
      navVipBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openVipExperienceModal();
      });
    }

    // 6. Hook Hero VIP button
    const heroVipBtn = document.querySelector(".hero-cta-group a[href='#vip-booking']");
    if (heroVipBtn) {
      heroVipBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openVipExperienceModal();
      });
    }

    // 7. Enclave Card Selectors
    const enclaveCards = document.querySelectorAll(".vip-enclave-card");
    enclaveCards.forEach(card => {
      card.addEventListener("click", () => {
        enclaveCards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        selectedEnclave = card.getAttribute("data-enclave-name");
        const badge = card.getAttribute("data-badge") || selectedEnclave;
        
        const passEnclave = document.getElementById("passEnclaveDisplay");
        if (passEnclave) {
          passEnclave.innerText = `${selectedEnclave} (${badge.split('(')[0].trim()})`;
        }
      });
    });

    // 8. Typology Pills
    const typePills = document.querySelectorAll("#vipTypologyRow .vip-choice-pill");
    typePills.forEach(pill => {
      pill.addEventListener("click", () => {
        typePills.forEach(p => p.classList.remove("selected"));
        pill.classList.add("selected");
        selectedTypology = pill.getAttribute("data-type");
        const passType = document.getElementById("passTypologyDisplay");
        if (passType) passType.innerText = selectedTypology;
      });
    });

    // 9. Budget Pills
    const budgetPills = document.querySelectorAll("#vipBudgetRow .vip-choice-pill");
    budgetPills.forEach(pill => {
      pill.addEventListener("click", () => {
        budgetPills.forEach(p => p.classList.remove("selected"));
        pill.classList.add("selected");
        selectedBudget = pill.getAttribute("data-budget");
        const passBudget = document.getElementById("passBudgetDisplay");
        if (passBudget) passBudget.innerText = selectedBudget;
      });
    });

    // 10. Privilege Checkboxes
    const privItems = document.querySelectorAll(".vip-privilege-item");
    privItems.forEach(item => {
      item.addEventListener("click", () => {
        item.classList.toggle("active");
        updateBoardingPassPrivileges();
      });
    });

    // 11. Guest Name Live Input Binding
    const nameInput = document.getElementById("vipGuestName");
    if (nameInput) {
      nameInput.addEventListener("input", (e) => {
        const val = e.target.value.trim();
        const passGuest = document.getElementById("passGuestDisplay");
        if (passGuest) {
          passGuest.innerText = val.length ? val.toUpperCase() : "GUEST REPRESENTATIVE";
        }
      });
    }

    // 12. Date Input Binding
    const dateInput = document.getElementById("vipGuestDate");
    if (dateInput) {
      // Default to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.value = tomorrow.toISOString().split("T")[0];
      updateDateDisplay(dateInput.value);

      dateInput.addEventListener("change", (e) => {
        updateDateDisplay(e.target.value);
      });
    }

    // 13. Time Slot Buttons
    const slotBtns = document.querySelectorAll(".vip-time-slot-btn");
    slotBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        slotBtns.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        selectedTimeSlot = btn.getAttribute("data-slot");
        const passTime = document.getElementById("passTimeDisplay");
        if (passTime) {
          passTime.innerText = selectedTimeSlot.split("(")[0].trim();
        }
      });
    });
  }

  function updateDateDisplay(dateStr) {
    const passDate = document.getElementById("passDateDisplay");
    if (!passDate || !dateStr) return;
    try {
      const parts = dateStr.split("-");
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      const formatted = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      passDate.innerText = formatted;
    } catch (e) {
      passDate.innerText = dateStr;
    }
  }

  function updateBoardingPassPrivileges() {
    const container = document.getElementById("passPrivilegesList");
    if (!container) return;

    const activePrivs = document.querySelectorAll(".vip-privilege-item.active");
    if (!activePrivs.length) {
      container.innerHTML = `<span style="font-size:0.75rem; color:#64748b;">Standard VIP Tour</span>`;
      return;
    }

    const icons = {
      "Luxury Sedan Chauffeur Pickup": "fa-car-side",
      "Electric Golf Buggy Tour": "fa-golf-ball-tee",
      "Club Royale Lounge Hospitality": "fa-mug-hot",
      "Instant WhatsApp Cost Sheet & Dossier": "fa-whatsapp",
      "Home Loan Advisory & Rate Lock": "fa-calculator"
    };

    container.innerHTML = Array.from(activePrivs).map(item => {
      const privName = item.getAttribute("data-privilege");
      const icon = icons[privName] || "fa-check";
      const isWhatsapp = icon === "fa-whatsapp";
      const iconClass = isWhatsapp ? "fa-brands" : "fa-solid";
      const color = isWhatsapp ? "#22c55e" : "var(--accent-gold-light)";
      return `
        <span style="font-size: 0.72rem; background: rgba(197,160,89,0.15); color: ${color}; padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(197,160,89,0.3);">
          <i class="${iconClass} ${icon}"></i> ${privName.split(" ")[0]}
        </span>
      `;
    }).join("");
  }

  function openVipExperienceModal(preselectedEnclave) {
    const modal = document.getElementById("vipExperienceModal");
    if (!modal) return;

    // Reset to step 1
    vipModalNextStep(1);

    // Hide success panel if it was open
    const successPanel = document.getElementById("vipSuccessPanel");
    if (successPanel) successPanel.style.display = "none";
    
    const formCol = document.querySelector(".vip-form-column");
    if (formCol) {
      const activeStage = document.getElementById(`vipStage${currentStep}`);
      if (activeStage) activeStage.style.display = "block";
    }

    // Preselect enclave if specified
    if (preselectedEnclave) {
      const card = document.querySelector(`.vip-enclave-card[data-enclave-name="${preselectedEnclave}"]`) ||
                   document.querySelector(`.vip-enclave-card[data-enclave-id="${preselectedEnclave.toLowerCase()}"]`);
      if (card) {
        document.querySelectorAll(".vip-enclave-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        selectedEnclave = card.getAttribute("data-enclave-name");
        const passEnclave = document.getElementById("passEnclaveDisplay");
        if (passEnclave) passEnclave.innerText = selectedEnclave;
      }
    }

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeVipExperienceModal() {
    const modal = document.getElementById("vipExperienceModal");
    if (modal) {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  function vipModalNextStep(step) {
    currentStep = step;

    // 1. Update Step Indicator Pills
    for (let i = 1; i <= 3; i++) {
      const pill = document.getElementById(`vipStepPill${i}`);
      const panel = document.getElementById(`vipStage${i}`);
      if (pill) {
        pill.classList.remove("active", "completed");
        if (i === step) {
          pill.classList.add("active");
        } else if (i < step) {
          pill.classList.add("completed");
        }
      }
      if (panel) {
        panel.classList.remove("active");
        panel.style.display = "none";
        if (i === step) {
          panel.classList.add("active");
          panel.style.display = "block";
        }
      }
    }
  }

  function handleVipFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("vipGuestName").value || "Valued Guest";
    const phone = document.getElementById("vipGuestPhone").value;
    const email = document.getElementById("vipGuestEmail").value;
    const date = document.getElementById("vipGuestDate").value;
    const whatsapp = document.getElementById("vipWhatsappConsent") ? document.getElementById("vipWhatsappConsent").checked : true;

    // Generate unique VIP Reference Pass ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const passCode = `PWC-VIP-${randomNum}`;

    // Update Confirmation Screen
    const successPanel = document.getElementById("vipSuccessPanel");
    const successTitle = document.getElementById("vipSuccessTitle");
    const passIdEl = document.getElementById("vipSuccessPassId");
    const passBarcodeToken = document.getElementById("passBarcodeToken");

    if (successTitle) successTitle.innerText = `Welcome, ${name}!`;
    if (passIdEl) passIdEl.innerText = passCode;
    if (passBarcodeToken) passBarcodeToken.innerText = `TOKEN: ${passCode}-CONFIDENTIAL`;

    // Hide stage panels and show success
    for (let i = 1; i <= 3; i++) {
      const p = document.getElementById(`vipStage${i}`);
      if (p) p.style.display = "none";
    }
    if (successPanel) successPanel.style.display = "block";

    // Show celebratory toast
    if (window.showToast) {
      window.showToast(`VIP Chauffeur Tour Confirmed for ${name}! Pass: ${passCode}`);
    }

    // Synchronize page booking form if present
    const mainSelect = document.getElementById("bookingClusterSelect");
    if (mainSelect) mainSelect.value = selectedEnclave;
  }

  function downloadVipTicketMock() {
    if (window.showToast) {
      window.showToast("VIP Boarding Pass PDF downloaded! Check your downloads folder.");
    }
  }

  // Global exposure
  window.openVipExperienceModal = openVipExperienceModal;
  window.closeVipExperienceModal = closeVipExperienceModal;
  window.vipModalNextStep = vipModalNextStep;
  window.handleVipFormSubmit = handleVipFormSubmit;
  window.downloadVipTicketMock = downloadVipTicketMock;

  // Intercept requestInstantQuote across cluster cards to open VIP Modal!
  window.requestInstantQuote = function (clusterName) {
    openVipExperienceModal(clusterName);
  };

  document.addEventListener("DOMContentLoaded", initVipModal);
})();
