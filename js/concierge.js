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
    const rawText = this.chatInput.value.trim();
    if (!rawText) return;
    const text = rawText.slice(0, 500);

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
    if (sender === "user") {
      bubble.textContent = text;
    } else {
      bubble.innerHTML = text;
    }
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
        We offer complimentary luxury sedan pickup from Pune Airport or your residence!
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
        All clusters listed on this advisory portal carry active MahaRERA registrations with public project records:
        <br/><br/>
        • <strong>Miami:</strong> <code>PR1260002600188</code> & <code>P52100028741</code><br/>
        • <strong>Boston Central:</strong> <code>P52100078307</code> & <code>P52100049648</code><br/>
        • <strong>Montreal:</strong> <code>P52100077138</code> & <code>P52100021650</code><br/>
        • <strong>Wellington:</strong> <code>P52100054534</code> & <code>P52100019637</code><br/>
        • <strong>Valencia:</strong> <code>P52100052309</code><br/>
        • <strong>Kingsbury:</strong> <code>P52100000854</code><br/>
        • <strong>SoHo:</strong> <code>P52100029810</code><br/>
        • <strong>Long Island:</strong> <code>P52100017892</code>
        <br/><br/>
        Verify certificates on <a href="https://maharera.mahaonline.gov.in" target="_blank" rel="noopener noreferrer" style="color:var(--accent-gold);">maharera.mahaonline.gov.in</a>.
      `, "bot");
      return;
    }

    // 6. Boston / 2X Advantage
    if (q.includes("boston")) {
      this.addMessage(`
        <strong>Pride Boston Central — The 2X Advantage:</strong>
        <br/><br/>
        • <strong>Two Balconies:</strong> Double the natural daylight and breezy cross-ventilation in every 2 BHK.<br/>
        • <strong>Two Clubhouses:</strong> Dual access to fitness, recreation, and social clubs.<br/>
        • <strong>Pricing:</strong> Smart 2 BHK starting from ₹68 Lacs*.<br/>
        • <strong>MahaRERA:</strong> <code>P52100078307 & P52100049648</code>
        <br/><br/>
        <button class="quick-reply-pill" onclick="window.scrollToSection('clusters')">Inspect Boston Floor Plans</button>
      `, "bot");
      return;
    }

    // 7. Montreal / Duplex / Smart Tech
    if (q.includes("montreal") || q.includes("duplex")) {
      this.addMessage(`
        <strong>Pride Montreal — Smart Homes & Duplex Living:</strong>
        <br/><br/>
        • <strong>Configurations:</strong> Contemporary 2 & 3 BHKs plus palatial 4 BHK Duplex Sky Villas.<br/>
        • <strong>Smart Tech:</strong> Touch-panel home automation, smart glass & acoustic soundproofing.<br/>
        • <strong>4 BHK Duplex:</strong> 1,850 sq.ft with double-height salons and private sky terrace from ₹1.65 Cr*.<br/>
        • <strong>MahaRERA:</strong> <code>P52100077138 & P52100021650</code>
        <br/><br/>
        <button class="quick-reply-pill" onclick="window.scrollToSection('clusters')">View Montreal Duplex Plans</button>
      `, "bot");
      return;
    }

    // 8. Investment / Rental Yield / Appreciation / Resale
    if (q.includes("investment") || q.includes("rental") || q.includes("yield") || q.includes("appreciation") || q.includes("resale") || q.includes("roi")) {
      this.addMessage(`
        <strong>North Pune Investment & Rental Intelligence:</strong>
        <br/><br/>
        📈 <strong>Rental Yield:</strong> 4.5% - 6% annually for 1 & 2 BHKs, powered by Pune Airport corporate staff, Kharadi IT workforce, and D.Y. Patil Knowledge City.<br/>
        🚀 <strong>Capital Growth:</strong> 42%+ appreciation over the past 5 years driven by the upcoming PMRDA Ring Road & Airport expansion.<br/>
        🔑 <strong>Resale / Ready Units:</strong> Delivered inventory available in Kingsbury, Brooklyn, and Manhattan with immediate registry.<br/><br/>
        <button class="quick-reply-pill" onclick="window.scrollToSection('micro-market-guide')">Explore Investment Matrix</button>
      `, "bot");
      return;
    }

    // 9. Competitor Comparisons (Ganga New Town, Life Republic, Godrej, Kumar)
    if (q.includes("vs") || q.includes("compare") || q.includes("ganga") || q.includes("republic") || q.includes("godrej") || q.includes("kumar") || q.includes("vtp")) {
      this.addMessage(`
        <strong>Why Pride World City Stands Apart:</strong>
        <br/><br/>
        1. <strong>Unrivaled Scale:</strong> 400 contiguous acres vs 14-40 acre standalone developments.<br/>
        2. <strong>Airport Proximity:</strong> Just 10 minutes to Pune Airport vs 60+ mins from Life Republic Hinjawadi.<br/>
        3. <strong>Living Water Body:</strong> Real 7-acre lake promenade & 50,000 sq.ft Club Royale already delivered.<br/>
        4. <strong>On-Site Cambridge School:</strong> Global Indian International School operational within gates.<br/><br/>
        <button class="quick-reply-pill" onclick="window.scrollToSection('micro-market-guide')">View Detailed Comparison</button>
      `, "bot");
      return;
    }

    // 10. Commercial / Pride Tech Park / Retail / Soho
    if (q.includes("tech park") || q.includes("office") || q.includes("commercial") || q.includes("retail") || q.includes("shop") || q.includes("soho")) {
      this.addMessage(`
        <strong>Township Commercial & Tech Hub:</strong>
        <br/><br/>
        🏢 <strong>Pride Tech Park:</strong> Grade-A corporate office spaces and IT facilities in North Pune.<br/>
        🏬 <strong>SoHo Business Spaces:</strong> Hybrid live-work lofts and commercial boutique offices (MahaRERA: <code>P52100029810</code>).<br/>
        🛍️ <strong>Town Plaza:</strong> High-street retail shops, cafes, supermarkets, and wellness outlets.<br/><br/>
        <button class="quick-reply-pill" onclick="window.scrollToSection('masterplan')">Explore Master Commercial Plan</button>
      `, "bot");
      return;
    }

    // 11. Pune Real Estate Market / Locality Comparison (Viman Nagar, Kharadi, Hinjawadi, Baner, Rates)
    if (q.includes("pune real estate") || q.includes("pune market") || q.includes("rates") || q.includes("per sq ft") || q.includes("sqft") || q.includes("viman nagar") || q.includes("hinjawadi") || q.includes("nri") || q.includes("baner")) {
      this.addMessage(`
        <strong>Pune Real Estate Market Intelligence:</strong>
        <br/><br/>
        📊 <strong>Charholi Budruk (Pride World City):</strong> ₹6,800 - ₹8,200/sq.ft (Rental yield: <strong>4.8% - 6.0%</strong>)<br/>
        📍 <strong>Viman Nagar:</strong> ₹11,500 - ₹16,500/sq.ft (35-45% higher entry ticket, yield ~3.4%)<br/>
        💻 <strong>Kharadi IT Park:</strong> ₹8,900 - ₹13,200/sq.ft (yield ~3.8%)<br/>
        🏢 <strong>Hinjawadi:</strong> ₹6,800 - ₹9,500/sq.ft (60+ mins from Airport)<br/><br/>
        <strong>Why Charholi Stands Out in North Pune:</strong><br/>
        • 10 mins from Pune Airport Terminal 2<br/>
        • 18 mins to Kharadi EON Free Zone via 8-lane expressway<br/>
        • 1.8 km to upcoming PMRDA 128-km Ring Road interchange<br/>
        • 400-acre masterplan with 7-acre lake & self-sufficient water infrastructure.<br/><br/>
        <button class="quick-reply-pill" onclick="window.scrollToSection('micro-market-guide')">Explore Pune Market Benchmark</button>
      `, "bot");
      return;
    }

    // 6. Valencia / Sun-Side Homes (Flagship New Launch)
    if (q.includes("valencia") || q.includes("spanish") || q.includes("sunset") || q.includes("sun")) {
      this.addMessage(`
        <strong>Say Hola to Valencia — New Launch at Pride World City!</strong>
        <br/><br/>
        • East-West facing Sun-Side 2 &amp; 3 BHK homes across 5.9 acres (5 towers).
        <br/>
        • 2 BHK (755 - 795 sq.ft): Starting from <strong>₹92.49 L* All Inclusive</strong>.
        <br/>
        • 3 BHK (1,045 - 1,180 sq.ft): Starting from <strong>₹1.23 Cr* All Inclusive</strong>.
        <br/>
        • MahaRERA No: <code>P52100052309</code>
        <br/><br/>
        <button class="quick-reply-pill" onclick="window.scrollToSection('valencia')">Explore Valencia Showcase</button>
        <button class="quick-reply-pill" onclick="window.scrollToSection('clusters')">View Floor Plans</button>
      `, "bot");
      return;
    }

    // 7. Gallery / Photos / Renderings
    if (q.includes("gallery") || q.includes("photo") || q.includes("picture") || q.includes("image") || q.includes("render")) {
      this.addMessage(`
        Explore our <strong>Township Visual Gallery</strong> featuring:
        <br/><br/>
        • 400-Acre masterplan drone aerials
        <br/>
        • Authentic residential cluster elevations &amp; twilight photography
        <br/>
        • Enscape 3D photorealistic lifestyle &amp; amenity walkthroughs
        <br/>
        • 7-Acre Central Lake &amp; Club Royale panoramas
        <br/><br/>
        <button class="quick-reply-pill" onclick="window.scrollToSection('gallery')">Launch Fullscreen Gallery</button>
      `, "bot");
      return;
    }

    // 8. VIP Site Visit / Booking / Direct Contact
    if (q.includes("visit") || q.includes("book") || q.includes("tour") || q.includes("appointment") || q.includes("helicopter") || q.includes("cab") || q.includes("whatsapp") || q.includes("contact") || q.includes("call") || q.includes("email")) {
      this.addMessage(`
        I would be honored to arrange your <strong>VIP Site Experience</strong>!
        <br/><br/>
        • Complimentary executive pickup in a luxury sedan from anywhere in Pune / Mumbai
        <br/>
        • Guided buggy tour across all 400 acres &amp; Club Royale
        <br/>
        • Advisory Desk: <strong>+91 77440 09295</strong> &bull; <strong>Propsmart Realty (Authorized Partner)</strong>
        <br/><br/>
        <div class="chat-quick-replies">
          <button class="quick-reply-pill" onclick="window.scrollToSection('vip-booking')">Fill 30-Sec Booking Form</button>
          <a class="quick-reply-pill" href="https://wa.me/917744009295?text=Hello%20Pride%20World%20City%20Concierge%2C%20I%20would%20like%20details%20and%20to%20schedule%20a%20site%20visit%20in%20Charholi%20Pune." target="_blank" rel="noopener noreferrer" style="text-decoration:none;"><i class="fa-brands fa-whatsapp"></i> WhatsApp +91 77440 09295</a>
          <a class="quick-reply-pill" href="tel:+917744009295" style="text-decoration:none;"><i class="fa-solid fa-phone"></i> Call +91 77440 09295</a>
        </div>
      `, "bot");
      return;
    }

    // Default Fallback
    this.addMessage(`
      Thank you for inquiring about <strong>Pride World City</strong>, Charholi Pune.
      <br/><br/>
      As your dedicated digital advisor, I can assist with:
      <br/>
      • Real-time availability &amp; floor plans across all 11 clusters (Valencia, Miami, Wellington, Montreal, Boston &amp; more)
      <br/>
      • Custom payment milestones, MahaRERA certificates &amp; banking home loan pre-approvals
      <br/>
      • Arranging complimentary executive site pickup from Pune Airport or your residence
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
