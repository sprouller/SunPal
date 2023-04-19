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
const multiplierValue = (x) => {
  switch(x) {
    case (x > 50 && x < 61):
      console.log('successVal');
      break;
    default:
      console.log('failure');
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
    const updateEverything = (systemPrice, systemPower, consumptionValue) => {
      totalPrice.innerText = roundMeCurrency(systemPrice);
      annualEnergy.innerText = roundMe(systemPower);
      carbonSaved.innerText = roundMe(systemPower * 0.4);

      // Total Savings Calc
      const tlSav = ((((systemPower * (energyMultiplier)) * timePeriod) * consumptionValue) + (sellBackRate * ((1 - consumptionValue) * systemPower) * timePeriod)) - systemPrice;
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
        updateEverything(valStd8, pwrStd8, cnsmpStd8);
        multiplierValue(55);
        break;

      case "std10":
        updateEverything(valStd10, pwrStd10, cnsmpStd10);
        break;

      case "std12":
        updateEverything(valStd12, pwrStd12, cnsmpStd12);
        break;

      case "prm8":
        updateEverything(valPrm8, pwrPrm8, cnsmpPrm8);
        break;

      case "prm10":
        updateEverything(valPrm10, pwrPrm10,cnsmpPrm10);
        break;

      case "prm12":
        updateEverything(valPrm12, pwrPrm12, cnsmpPrm12);
        break;

      default:
        updateEverything(valStd8, pwrStd8, cnsmpStd8);

    }

    });
  });


  monthlyBill.addEventListener('input', () => {

    const mnthVal = monthlyBill.value;
    console.log(mnthVal);

// pass in consumptionValue 
// standard is based on std8
// convert from this using table to other systems

});

  });