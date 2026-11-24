/**
 * Pride World City - AI Real Estate Concierge Chat Assistant
 */

class PrideConcierge {
  constructor(data) {
    this.data = data;
    this.modal = document.getElementById("conciergeModal");
    this.triggerBtn = document.getElementById("conciergeTrigger");
    this.closeBtn = document.getElementById("closeConcierge");
    this.chatBody = document.getElementById("conciergeChatBody");
    this.chatInput = document.getElementById("conciergeInput");
    this.sendBtn = document.getElementById("conciergeSendBtn");

    this.init();
  }

  init() {
    if (!this.modal || !this.triggerBtn) return;

    this.triggerBtn.addEventListener("click", () => this.toggleModal());
    this.closeBtn.addEventListener("click", () => this.closeModal());

    this.sendBtn.addEventListener("click", () => this.handleUserMessage());
    this.chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleUserMessage();
    });

    this.setupQuickReplies();
  }

  toggleModal() {
    this.modal.classList.toggle("open");
    if (this.modal.classList.contains("open")) {
      this.chatInput.focus();
    }
  }

  closeModal() {
    this.modal.classList.remove("open");
  }

  setupQuickReplies() {
    const quickPills = this.modal.querySelectorAll(".quick-reply-pill");
    quickPills.forEach(pill => {
      pill.addEventListener("click", () => {
        const text = pill.innerText;
        this.addMessage(text, "user");
        this.generateBotReply(text);
      });
    });
  }

  handleUserMessage() {
    const text = this.chatInput.value.trim();
    if (!text) return;

    this.addMessage(text, "user");
    this.chatInput.value = "";

    // Show simulated typing indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "chat-bubble bot";
    typingIndicator.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Pride Concierge is reviewing township inventory...`;
    this.chatBody.appendChild(typingIndicator);
    this.scrollToBottom();

    setTimeout(() => {
      typingIndicator.remove();
      this.generateBotReply(text);
    }, 650);
  }

  addMessage(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text;
    this.chatBody.appendChild(bubble);
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
  }

  generateBotReply(query) {
    const q = query.toLowerCase();

    // 1. Budget under 85 Lakhs / 2 BHK
    if (q.includes("85") || q.includes("budget") || q.includes("under 80") || (q.includes("2 bhk") && (q.includes("price") || q.includes("cost")))) {
      this.addMessage(`
        For investments around ₹74L - ₹86L, we have exceptional options:
        <br/><br/>
        • <strong>Kingsbury:</strong> Ready-to-move 2 BHK starting at ₹78 Lacs* (765-1,120 sq.ft) with sky lounges.
        <br/>
        • <strong>Montreal:</strong> Smart tech-integrated 2 BHK starting at ₹74 Lacs* with child-safe parks.
        <br/>
        • <strong>Wellington:</strong> Resort-style 2 BHK starting at ₹86 Lacs* with floating pool cabanas.
        <br/><br/>
        <button class="quick-reply-pill" onclick="window.scrollToSection('clusters')">View Configurations</button>
        <button class="quick-reply-pill" onclick="window.scrollToSection('vip-booking')">Schedule Site Visit</button>
      `, "bot");
      return;
    }

    // 2. Lake view / Miami / Waterfront
    if (q.includes("lake") || q.includes("water") || q.includes("miami") || q.includes("wellington")) {
      this.addMessage(`
        Our premier waterfront clusters directly face the <strong>7-Acre Central Lake & Promenade</strong>:
        <br/><br/>
        • <strong>Miami:</strong> Newly launched South Beach-style residences with deep glass sundecks from ₹92 Lacs*.
        <br/>
        • <strong>Wellington:</strong> Resort residences with infinity lagoon pool & tropical gazebos from ₹86 Lacs*.
        <br/><br/>
        Both feature uninterrupted views of musical fountains and serene sunsets.
        <br/><br/>
        <button class="quick-reply-pill" onclick="window.scrollToSection('tour')">Explore 360° Lake View</button>
      `, "bot");
      return;
    }

    // 3. Airport / Kharadi / Distance / Connectivity
    if (q.includes("airport") || q.includes("kharadi") || q.includes("distance") || q.includes("location") || q.includes("metro")) {
      this.addMessage(`
        <strong>Strategic Connectivity Highlights:</strong>
        <br/><br/>
        ✈️ <strong>Pune Int'l Airport:</strong> 10 Mins (4.8 Km)
        <br/>
        💻 <strong>Kharadi IT Park / EON Free Zone:</strong> 18 Mins (11.2 Km)
        <br/>
        🛍️ <strong>Phoenix Marketcity & Viman Nagar:</strong> 15 Mins (8.5 Km)
        <br/>
        🎓 <strong>D.Y. Patil Knowledge City:</strong> 3 Mins (Adjacent)
        <br/>
        🛣️ <strong>Proposed Ring Road & Metro:</strong> Direct Township Gate Corridor
        <br/><br/>
        We offer complimentary chauffeur pickup from Pune Airport or your residence!
      `, "bot");
      return;
    }

    // 4. 3 BHK / 4 BHK / Penthouse / Villa
    if (q.includes("3 bhk") || q.includes("4 bhk") || q.includes("penthouse") || q.includes("villa") || q.includes("luxury")) {
      this.addMessage(`
        For large family estates and high-ceiling luxury:
        <br/><br/>
        • <strong>Notting Hill:</strong> British aristocrat-style 3 & 4 BHK duplexes with private plunge pools (₹1.68 Cr*+).
        <br/>
        • <strong>Long Island:</strong> 24th-floor sky penthouses & villas with 40-foot continuous sky terraces (₹2.15 Cr*+).
        <br/>
        • <strong>Kingsbury Imperial:</strong> 3 BHK signature high-rise from ₹1.15 Cr*.
        <br/><br/>
        <button class="quick-reply-pill" onclick="window.scrollToSection('clusters')">Inspect Floor Plans</button>
      `, "bot");
      return;
    }

    // 5. RERA / Approvals
    if (q.includes("rera") || q.includes("approval") || q.includes("legal") || q.includes("possession")) {
      this.addMessage(`
        All clusters at Pride World City are 100% MahaRERA compliant with clear titles:
        <br/><br/>
        • Kingsbury: <code>P52100000854</code>
        <br/>
        • Wellington: <code>P52100019637</code>
        <br/>
        • Montreal: <code>P52100021650</code>
        <br/>
        • Miami: <code>P52100028741</code>
        <br/>
        • Long Island: <code>P52100017892</code>
        <br/>
        • Boston Central: <code>P52100029810</code>
        <br/><br/>
        You can verify all certificates on <a href="https://maharera.mahaonline.gov.in" target="_blank" style="color:var(--accent-gold);">maharera.mahaonline.gov.in</a>.
      `, "bot");
      return;
    }

    // 6. Valencia / Spanish / Sunset Homes
    if (q.includes("valencia") || q.includes("spanish") || q.includes("sunset")) {
      this.addMessage(`
        <strong>Say Hola to Valencia at Pride World City!</strong>
        <br/><br/>
        • Spanish-themed 2 & 3 BHK residences starting from ₹88 Lacs*.
        <br/>
        • Arched loggias, terracotta styling, sunset balconies, and central floral plazas.
        <br/>
        • MahaRERA No: <code>P52100052309</code>
        <br/><br/>
        <button class="quick-reply-pill" onclick="window.scrollToSection('clusters')">Inspect Valencia Details</button>
        <button class="quick-reply-pill" onclick="window.scrollToSection('gallery')">View Spanish Architecture</button>
      `, "bot");
      return;
    }

    // 7. Gallery / Photos / Renderings / Blueprint
    if (q.includes("gallery") || q.includes("photo") || q.includes("picture") || q.includes("image") || q.includes("render")) {
      this.addMessage(`
        Explore our brand new <strong>Township Visual Gallery</strong> featuring:
        <br/><br/>
        • 400-Acre masterplan drone aerials
        <br/>
        • Real residential cluster elevations
        <br/>
        • Enscape 3D photorealistic interior walkthroughs
        <br/>
        • Official architectural blueprint floor plans
        <br/><br/>
        <button class="quick-reply-pill" onclick="window.scrollToSection('gallery')">Launch Fullscreen Gallery</button>
      `, "bot");
      return;
    }

    // 8. VIP Site Visit / Booking
    if (q.includes("visit") || q.includes("book") || q.includes("tour") || q.includes("appointment") || q.includes("helicopter") || q.includes("cab")) {
      this.addMessage(`
        I would be honored to arrange your <strong>VIP Site Experience</strong>!
        <br/><br/>
        We offer:
        <br/>
        • Executive chauffeur pickup in a luxury sedan from anywhere in Pune / Mumbai
        <br/>
        • Guided buggy tour across all 400 acres & Club Royale
        <br/>
        • Private walkthrough of furnished show homes
        <br/><br/>
        <button class="quick-reply-pill" onclick="window.scrollToSection('vip-booking')">Fill 30-Sec Booking Form</button>
      `, "bot");
      return;
    }

    // Default Fallback
    this.addMessage(`
      Thank you for inquiring about <strong>Pride World City</strong>, Charholi Pune.
      <br/><br/>
      As your dedicated digital advisor, I can assist with:
      <br/>
      • Real-time availability & floor plans across all 8 clusters
      <br/>
      • Custom payment milestones & banking home loan pre-approvals
      <br/>
      • Arranging complimentary chauffeur site pickup
      <br/><br/>
      How can I tailor your experience today?
    `, "bot");
  }
}

window.scrollToSection = function(sectionId) {
  const concierge = document.getElementById("conciergeModal");
  if (concierge) concierge.classList.remove("open");

  const sec = document.getElementById(sectionId);
  if (sec) {
    sec.scrollIntoView({ behavior: "smooth" });
  }
};

window.PrideConcierge = PrideConcierge;
