/**
 * Pride World City - Dynamic Financial & Mortgage EMI Intelligence Calculator
 */

class EmiCalculator {
  constructor() {
    this.priceSlider = document.getElementById("calcPriceSlider");
    this.downPaymentSlider = document.getElementById("calcDownSlider");
    this.tenureSlider = document.getElementById("calcTenureSlider");
    this.rateSlider = document.getElementById("calcRateSlider");

    this.priceDisplay = document.getElementById("calcPriceVal");
    this.downDisplay = document.getElementById("calcDownVal");
    this.tenureDisplay = document.getElementById("calcTenureVal");
    this.rateDisplay = document.getElementById("calcRateVal");

    this.emiDisplay = document.getElementById("calcEmiResult");
    this.principalDisplay = document.getElementById("calcPrincipalResult");
    this.interestDisplay = document.getElementById("calcInterestResult");
    this.totalDisplay = document.getElementById("calcTotalResult");

    this.init();
  }

  init() {
    if (!this.priceSlider) return;

    const sliders = [this.priceSlider, this.downPaymentSlider, this.tenureSlider, this.rateSlider];
    sliders.forEach(slider => {
      slider.addEventListener("input", () => this.calculate());
    });

    this.calculate();
  }

  formatCurrency(num) {
    if (num >= 10000000) {
      return "₹ " + (num / 10000000).toFixed(2) + " Cr";
    } else if (num >= 100000) {
      return "₹ " + (num / 100000).toFixed(2) + " Lacs";
    }
    return "₹ " + Math.round(num).toLocaleString('en-IN');
  }

  calculate() {
    const propertyPrice = parseFloat(this.priceSlider.value);
    const downPaymentPercent = parseFloat(this.downPaymentSlider.value);
    const tenureYears = parseInt(this.tenureSlider.value);
    const interestRate = parseFloat(this.rateSlider.value);

    const downPaymentAmount = propertyPrice * (downPaymentPercent / 100);
    const principal = propertyPrice - downPaymentAmount;

    // Monthly interest calculation
    const monthlyRate = (interestRate / 12) / 100;
    const totalMonths = tenureYears * 12;

    // EMI formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;

    // Update Input Displays
    this.priceDisplay.innerText = this.formatCurrency(propertyPrice);
    this.downDisplay.innerText = `${downPaymentPercent}% (${this.formatCurrency(downPaymentAmount)})`;
    this.tenureDisplay.innerText = `${tenureYears} Years (${totalMonths} Months)`;
    this.rateDisplay.innerText = `${interestRate.toFixed(1)}% p.a.`;

    // Update Result Displays
    this.emiDisplay.innerText = "₹ " + Math.round(emi).toLocaleString('en-IN');
    this.principalDisplay.innerText = this.formatCurrency(principal);
    this.interestDisplay.innerText = this.formatCurrency(totalInterest);
    this.totalDisplay.innerText = this.formatCurrency(totalPayment);
  }
}

window.EmiCalculator = EmiCalculator;
