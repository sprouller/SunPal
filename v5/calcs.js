  document.addEventListener('DOMContentLoaded', () => {
    const PANEL_SELECTOR = '[fs-hacks-element="panel-type"]';
    const PANEL_AMOUNT = '[fs-hacks-element="panel-amount"]';
    const TOTAL_SELECTOR = '[fs-hacks-element="total-value"]';
    const TOTAL_SELECTOR_BANNER = '[fs-hacks-element="total-value-banner"]';
    const BATTERY_VALUE = '[fs-hacks-element="battery-selector"]';
    const HIDDEN_INPUT_SELECTOR = '[fs-hacks-element="hidden-total"]';
    const INSTALLATION_DATE = '[fs-hacks-element="installation-date"]';
    const MONTHLY_BILL = '[fs-hacks-element="monthly-bill"]';
    const TOTAL_SAVINGS = '[fs-hacks-element="total-savings"]';
    const BANNER_TOTAL_SAVINGS = '[fs-hacks-element="banner-total-savings"]';
    const MONTHLY_SAVINGS = '[fs-hacks-element="monthly-savings"]';
    const CARBON_SAVED = '[fs-hacks-element="carbon-saved"]';
    const SELF_CONSUMPTION = '[fs-hacks-element="self-consumption"]';
    const ANNUAL_ENERGY = '[fs-hacks-element="annual-energy"]';

    //const panelType = document.querySelectorAll(PANEL_SELECTOR);
    const panelAmount = document.querySelectorAll(PANEL_AMOUNT);
    const totalPrice = document.querySelector(TOTAL_SELECTOR_BANNER);
    const totalSavingsBanner = document.querySelector(BANNER_TOTAL_SAVINGS);
    const totalValueDiv = document.querySelector(TOTAL_SELECTOR);
    const batteryValue = document.querySelectorAll(BATTERY_VALUE);
    const hiddenTotalInput = document.querySelector(HIDDEN_INPUT_SELECTOR);
    const installationDate = document.querySelector(INSTALLATION_DATE);
    const monthlyBill = document.querySelector(MONTHLY_BILL);
    const totalSavings = document.querySelector(TOTAL_SAVINGS);
    const monthlySavings = document.querySelector(MONTHLY_SAVINGS);
    const carbonSaved = document.querySelector(CARBON_SAVED);
    const selfConsumption = document.querySelector(SELF_CONSUMPTION);
    const annualEnergy = document.querySelector(ANNUAL_ENERGY);

    //Get Installation date
    const options = { year: "numeric", month: "long", day: "numeric" }
    const today = new Date();
    today.setDate(today.getDate() + 14);
    const installDate = today.toLocaleDateString("en-GB", options);
    installationDate.innerText = installDate;


    // Set main values
    let multiVal = 0;
    let aep = 0;
    let energyCost = 0.34;
    let energyMultiplier = 0.5;
    let timePeriod = 30;
    let sellBackRate = 0.15;

    // Set initial costs
    let valStd8 = 7435.30;
    let valStd10 = 10005.13;
    let valStd12 = 12424.96;
    let valPrm8 = 9115.00;
    let valPrm10 = 11197.50;
    let valPrm12 = 12830.00;

    // Set initial power values
    let pwrStd8 = 3590;
    let pwrStd10 = 5380;
    let pwrStd12 = 6730;
    let pwrPrm8 = 3805;
    let pwrPrm10 = 5703;
    let pwrPrm12 = 7134;

    //Consumption Conversion
    let cnsmpStd8 = 1;
    let cnsmpStd10 = 0.628;
    let cnsmpStd12 = 0.4801;
    let cnsmpPrm8 = 1;
    let cnsmpPrm10 = 0.603;
    let cnsmpPrm12 = 0.476;

    // Currency rounding function
    const roundMeCurrency = (x) =>{
      const roundedCurrency = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(x);
      return roundedCurrency;
  }
    
  //Rounding Function
    const roundMe = (x) =>{
      const rounded = new Intl.NumberFormat().format(x);
      return rounded;
  }


// Consumption multiplier
const multiplierCalc = (x) => {
  switch(true) {
    case (x >= 50 && x < 60):
      multiplerValue = 0.40;
      selfConsumption.innerText = roundMe(multiplerValue * 100);
      return multiplerValue;
    case (x >= 60 && x < 70):
      multiplerValue = 0.45;
      selfConsumption.innerText = roundMe(multiplerValue * 100);
      return multiplerValue;
    case (x >= 70 && x < 80):
      multiplerValue = 0.50;
      selfConsumption.innerText = roundMe(multiplerValue * 100);
      return multiplerValue;
    case (x >= 80 && x < 90):
      multiplerValue = 0.55;
      selfConsumption.innerText = roundMe(multiplerValue * 100);
      return multiplerValue;
    case (x >= 90 && x < 100):
      multiplerValue = 0.60;
      selfConsumption.innerText = roundMe(multiplerValue * 100);
      return multiplerValue;
    case (x >= 100 && x < 110):
      multiplerValue = 0.65;
      selfConsumption.innerText = roundMe(multiplerValue * 100);
      return multiplerValue;
    case (x >= 110 && x < 120):
      multiplerValue = 0.75;
      selfConsumption.innerText = roundMe(multiplerValue * 100);
      return multiplerValue;
    case (x >= 120 && x < 130):
      multiplerValue = 0.80;
      selfConsumption.innerText = roundMe(multiplerValue * 100);
      return multiplerValue;
    case (x >= 140 && x < 150):
      multiplerValue = 0.85;
      selfConsumption.innerText = roundMe(multiplerValue * 100);
      return multiplerValue;
    case (x >= 150 && x < 160):
      multiplerValue = 0.90;
      selfConsumption.innerText = roundMe(multiplerValue * 100);
      return multiplerValue;
    case (x >= 160 && x <= 250):
      multiplerValue = 1;
      selfConsumption.innerText = roundMe(multiplerValue * 100);
      return multiplerValue;
    default:
      multiplerValue = 1;
      selfConsumption.innerText = roundMe(multiplerValue * 100);
      return multiplerValue;
  }
}



// Get all the checkboxes with the same fs-hacks-element attribute value
const checkboxes = document.querySelectorAll('[fs-hacks-element="battery-selector"]');

let checkVal = 0;

// Add event listeners to each checkbox
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', (event) => {
    // Check if the current checkbox is checked or not
    if (event.target.checked) {
      console.log('on');
    } else {
      console.log('off');
    }
    // When any checkbox is checked or unchecked, set all checkboxes to the same state
    checkboxes.forEach((otherCheckbox) => {
      otherCheckbox.checked = event.target.checked;
    });
  });
});

    // Main update function
    const updateEverything = (systemPrice, systemPower, consumptionValue, multiVal) => {
      totalPrice.innerText = roundMeCurrency(systemPrice);
      annualEnergy.innerText = roundMe(systemPower);
      carbonSaved.innerText = roundMe(systemPower * 0.4);

      // Total Savings Calc
      const tlSav = ((((systemPower * (energyMultiplier)) * timePeriod) * ((consumptionValue * multiVal))) + (sellBackRate * ((1 - (consumptionValue * multiVal)) * systemPower) * timePeriod)) - systemPrice;
      totalSavings.innerText = roundMeCurrency(tlSav);
      totalSavingsBanner.innerText = roundMeCurrency(tlSav);
      monthlySavings.innerText = roundMeCurrency(tlSav / 360);

    }

    // Attach an event listener to each panel
    panelAmount.forEach(panel => {
    panel.addEventListener('click', function (event) {
    
    // Get the value of the "ts-id" attribute of the clicked panel
    const panelId = event.target.getAttribute('ts-id');

    switch(panelId) {
      case "std8":
        mnthVal = Number(monthlyBill.value);
        multiVal = multiplierCalc(mnthVal);
        updateEverything(valStd8, pwrStd8, cnsmpStd8, multiVal);
        break;

      case "std10":
        mnthVal = Number(monthlyBill.value);
        multiVal = multiplierCalc(mnthVal);
        updateEverything(valStd10, pwrStd10, cnsmpStd10, multiVal);
        break;

      case "std12":
        mnthVal = Number(monthlyBill.value);
        multiVal = multiplierCalc(mnthVal);
        updateEverything(valStd12, pwrStd12, cnsmpStd12, multiVal);
        break;

      case "prm8":
        mnthVal = Number(monthlyBill.value);
        multiVal = multiplierCalc(mnthVal);
        updateEverything(valPrm8, pwrPrm8, cnsmpPrm8, multiVal);
        break;

      case "prm10":
        mnthVal = Number(monthlyBill.value);
        multiVal = multiplierCalc(mnthVal);
        updateEverything(valPrm10, pwrPrm10,cnsmpPrm10, multiVal);
        break;

      case "prm12":
        mnthVal = Number(monthlyBill.value);
        multiVal = multiplierCalc(mnthVal);
        updateEverything(valPrm12, pwrPrm12, cnsmpPrm12, multiVal);
        break;

      default:
        mnthVal = Number(monthlyBill.value);
        multiVal = multiplierCalc(mnthVal);
        updateEverything(valStd8, pwrStd8, cnsmpStd8, multiVal);

    }

    });
  });


  monthlyBill.addEventListener('input', () => {

    const mnthVal = monthlyBill.value;
    //console.log(mnthVal);


// pass in consumptionValue 
// standard is based on std8
// convert from this using table to other systems

});

updateEverything(valStd8, pwrStd8, cnsmpStd8, multiVal);

  });