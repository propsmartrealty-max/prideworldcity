/**
 * Pride World City — Interactive EMI, Pune Stamp Duty & Total Cost Calculator
 * Calculates Maharashtra Stamp Duty (including 1% female buyer concession in Pune),
 * Registration, GST (0% OC Ready vs 5% Under-Construction), and Home Loan EMI.
 */
(function () {
  const presets = {
    valencia_2: { label: "Valencia 2 BHK Sun-Side (New Launch)", price: 9249000, status: "uc" },
    valencia_3: { label: "Valencia 3 BHK Sun-Side (New Launch)", price: 12300000, status: "uc" },
    boston_2: { label: "Boston Central 2 BHK (2X Advantage)", price: 6800000, status: "uc" },
    montreal_duplex: { label: "Montreal 4 BHK Duplex", price: 16500000, status: "uc" },
    miami_2: { label: "Miami Waterfront 2 BHK", price: 9200000, status: "uc" },
    wellington_3: { label: "Wellington 3 BHK Lake-Facing", price: 11200000, status: "uc" },
    kingsbury_2: { label: "Kingsbury 2 BHK (Ready / OC Exempt GST)", price: 7800000, status: "ready" },
    brooklyn_1: { label: "Brooklyn 1 BHK (Ready / High Yield)", price: 5400000, status: "ready" },
    longisland_4: { label: "Long Island 4 BHK Sky Villa", price: 21500000, status: "ready" }
  };

  function inr(num) {
    return "₹ " + Math.round(num).toLocaleString("en-IN");
  }

  function updateCalc() {
    const priceEl = document.getElementById("calcPriceLakhs");
    const statusEl = document.getElementById("calcStatus");
    const buyerEl = document.getElementById("calcBuyerType");
    const downEl = document.getElementById("calcDownPct");
    const rateEl = document.getElementById("calcRatePct");
    const tenureEl = document.getElementById("calcTenureYrs");

    if (!priceEl) return;

    const basePrice = Math.max(25, Number(priceEl.value) || 92.49) * 100000;
    const isUC = statusEl && statusEl.value === "uc";
    const stampPct = buyerEl && buyerEl.value === "female" ? 0.06 : 0.07; // Pune 7% (Male/Joint) vs 6% (Female owner 1% rebate)
    const regFee = 30000;
    const gstPct = isUC ? 0.05 : 0.0;

    const downPct = Math.min(80, Math.max(10, Number(downEl ? downEl.value : 20) || 20)) / 100;
    const annualRate = Math.max(6, Math.min(14, Number(rateEl ? rateEl.value : 8.5) || 8.5));
    const tenureYrs = Math.max(5, Math.min(30, Number(tenureEl ? tenureEl.value : 20) || 20));

    const stampDuty = basePrice * stampPct;
    const gstAmount = basePrice * gstPct;
    const totalTaxes = stampDuty + regFee + gstAmount;
    const totalAllIn = basePrice + totalTaxes;

    const downPayment = basePrice * downPct;
    const loanAmount = Math.max(0, basePrice - downPayment);
    const monthlyRate = annualRate / 12 / 100;
    const months = tenureYrs * 12;
    const emi = monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
      : loanAmount / months;

    const setText = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setText("outBasePrice", inr(basePrice));
    setText("outStampDuty", `${inr(stampDuty)} (${Math.round(stampPct * 100)}%)`);
    setText("outGst", isUC ? `${inr(gstAmount)} (5% UC)` : "₹ 0 (OC Ready Exempt)");
    setText("outRegFee", inr(regFee));
    setText("outTotalCost", inr(totalAllIn));
    setText("outLoanAmt", inr(loanAmount));
    setText("outDownPay", inr(downPayment));
    setText("outMonthlyEmi", `${inr(emi)} / mo`);

    const waBtn = document.getElementById("calcWaShareBtn");
    if (waBtn) {
      const presetSel = document.getElementById("calcPreset");
      const presetLabel = presetSel && presetSel.options[presetSel.selectedIndex] ? presetSel.options[presetSel.selectedIndex].text : "Custom Budget";
      const summary = [
        "*Pride World City Cost & EMI Estimate*",
        `Selection: ${presetLabel}`,
        `Agreement Value: ${inr(basePrice)}`,
        `Stamp Duty (${Math.round(stampPct * 100)}%): ${inr(stampDuty)}`,
        `GST: ${isUC ? inr(gstAmount) : "₹ 0 (Ready/OC)"}`,
        `Registration: ${inr(regFee)}`,
        `Estimated All-In Outlay: ${inr(totalAllIn)}`,
        `Estimated EMI (${tenureYrs}Y @ ${annualRate}%): ${inr(emi)}/mo`,
        "Please share the official RERA cost sheet for this unit."
      ].join("\n");
      waBtn.setAttribute("href", `https://wa.me/917744009295?text=${encodeURIComponent(summary)}`);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const presetSel = document.getElementById("calcPreset");
    if (presetSel) {
      presetSel.addEventListener("change", () => {
        const p = presets[presetSel.value];
        if (!p) return;
        const priceEl = document.getElementById("calcPriceLakhs");
        const statusEl = document.getElementById("calcStatus");
        if (priceEl) priceEl.value = (p.price / 100000).toFixed(2).replace(/\.00$/, "");
        if (statusEl) statusEl.value = p.status;
        updateCalc();
      });
    }

    ["calcPriceLakhs", "calcStatus", "calcBuyerType", "calcDownPct", "calcRatePct", "calcTenureYrs"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", updateCalc);
        el.addEventListener("change", updateCalc);
      }
    });

    updateCalc();
  });
})();
