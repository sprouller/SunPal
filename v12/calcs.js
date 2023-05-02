document.addEventListener('DOMContentLoaded', () => {
  const PANEL_SELECTOR = '[fs-hacks-element="panel-type"]';
  const PANEL_AMOUNT = '[fs-hacks-element="panel-amount"]';
  const TOTAL_SELECTOR = '[fs-hacks-element="total-value"]';
  const TOTAL_SELECTOR_BANNER = '[fs-hacks-element="total-value-banner"]';
  const BATTERY_VALUE = '[fs-hacks-element="battery-selector"]';
  const HIDDEN_INPUT_SELECTOR = '[fs-hacks-element="hidden-total"]';
  const INSTALLATION_DATE = '[fs-hacks-element="installation-date"]';
  const INSTALLATION_DAY_OF_MONTH = '[fs-hacks-element="day-of-month"]';
  const MONTHLY_BILL = '[fs-hacks-element="monthly-bill"]';
  const TOTAL_SAVINGS = '[fs-hacks-element="total-savings"]';
  const BANNER_TOTAL_SAVINGS = '[fs-hacks-element="banner-total-savings"]';
  const MONTHLY_SAVINGS = '[fs-hacks-element="monthly-savings"]';
  const CARBON_SAVED = '[fs-hacks-element="carbon-saved"]';
  const SELF_CONSUMPTION = '[fs-hacks-element="self-consumption"]';
  const ANNUAL_ENERGY = '[fs-hacks-element="annual-energy"]';
  const COST_BEFORE_SAVINGS = '[fs-hacks-element="costBeforeSavings"]';
  const COST_AFTER_SAVINGS = '[fs-hacks-element="costAfterSavings"]';
  const SINGLE_BATTERY = '[fs-hacks-element="single-battery"]';
  const PRICE_ESTIMATE_BREAKDOWN = '[fs-hacks-element="price-estimate-breakdown"]';
  const VALID_UNTIL = '[fs-hacks-element="valid-until"]';
  const MY_BILL = '[fs-hacks-element="my-bill"]';
  const TOTAL_VALUE_TOPPER = '[fs-hacks-element="total-value-topper"]';
  const TOTAL_SAVINGS_TOPPER = '[fs-hacks-element="total-savings-topper"]';

  //const panelType = document.querySelectorAll(PANEL_SELECTOR);
  const panelAmount = document.querySelectorAll(PANEL_AMOUNT);
  const totalPrice = document.querySelector(TOTAL_SELECTOR_BANNER);
  //const totalSavingsBanner = document.querySelector(BANNER_TOTAL_SAVINGS);
  const totalValueDiv = document.querySelector(TOTAL_SELECTOR);
  const batteryValue = document.querySelectorAll(BATTERY_VALUE);
  const hiddenTotalInput = document.querySelector(HIDDEN_INPUT_SELECTOR);
  const installationDate = document.querySelector(INSTALLATION_DATE);
  const installDayOfMonth = document.querySelector(INSTALLATION_DAY_OF_MONTH);
  const monthlyBill = document.querySelector(MONTHLY_BILL);
  const totalSavings = document.querySelector(TOTAL_SAVINGS);
  const monthlySavings = document.querySelector(MONTHLY_SAVINGS);
  const carbonSaved = document.querySelector(CARBON_SAVED);
  const selfConsumption = document.querySelector(SELF_CONSUMPTION);
  const annualEnergy = document.querySelector(ANNUAL_ENERGY);
  const beforeSavings = document.querySelectorAll(COST_BEFORE_SAVINGS);
  const afterSavings = document.querySelectorAll(COST_AFTER_SAVINGS);
  const singleBattery = document.querySelector(SINGLE_BATTERY);
  const priceEstimateBreakdown = document.querySelector(PRICE_ESTIMATE_BREAKDOWN);
  const validUntil = document.querySelector(VALID_UNTIL);
  const myBillSelectionBadge = document.querySelector(MY_BILL);
  const totalValueTopper = document.querySelector(TOTAL_VALUE_TOPPER);
  const totalSavingsTopper = document.querySelector(TOTAL_SAVINGS_TOPPER);

  
  // Set init vals
  const systemPrice = 0;
  let panelId = 'std8';

  // Set finance vals
  const finR = 12;
  const finN = 12;
  const finY = 7;

  //Get Installation date
  const options = { year: "numeric", month: "long", day: "numeric" }
  const dayInMonth = { day: "numeric" }
  const today = new Date();
  today.setDate(today.getDate() + 14);
  const installDate = today.toLocaleDateString("en-GB", options);
  const installDayInMonth = today.toLocaleDateString("en-GB", dayInMonth);
  installationDate.innerText = installDate;
  validUntil.innerText = installDate;
  installDayOfMonth.innerText = installDayInMonth;

  //Set battery status
  let batteryStatus = false;
  let finalBatteryPrice = 0;

  // Set main values
  let multiVal = 0;
  let aep = 0;
  let energyCost = 0.34;
  let energyMultiplier = 0.5;
  let timePeriod = 30;
  let sellBackRate = 0.15;

  // Set initial costs without battery
  let valStd8 = 7435.30;
  let valStd10 = 10005.13;
  let valStd12 = 12424.96;
  let valPrm8 = 9115.00;
  let valPrm10 = 11197.50;
  let valPrm12 = 12830.00;

  // Set initial costs with battery
  let valStd8battery = 8382.91;
  let valStd10battery = 10952.74;
  let valStd12battery = 13372.57;
  let valPrm8battery = 11535.00;
  let valPrm10battery = 14752.00;
  let valPrm12battery = 17520.00;

  // Set initial power values without battery
  let pwrStd8 = 3590.00;
  let pwrStd10 = 5380.00;
  let pwrStd12 = 6730.00;
  let pwrPrm8 = 3805.00;
  let pwrPrm10 = 5703.00;
  let pwrPrm12 = 7134.00;

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

    // Main update function
    const updateEverything = (systemPrice, systemPower, consumptionValue, multiVal) => {
      const newSystemPrice = Number(systemPrice);
      finalBatteryPrice = Number(singleBattery.value) || 0;
      const finalCombinedPrice = newSystemPrice + finalBatteryPrice;
      //totalPrice.innerText = roundMeCurrency(finalCombinedPrice);
      totalValueTopper.innerText = roundMeCurrency(finalCombinedPrice);
      annualEnergy.innerText = roundMe(systemPower);
      carbonSaved.innerText = roundMe(systemPower * 0.4);

      // Total Savings Calc
      const tlSav = ((((systemPower * (energyMultiplier)) * timePeriod) * ((consumptionValue * multiVal))) + (sellBackRate * ((1 - (consumptionValue * multiVal)) * systemPower) * timePeriod)) - systemPrice;
      totalSavings.innerText = roundMeCurrency(tlSav);
      totalSavingsTopper.innerText = roundMeCurrency(tlSav);
      const monthlySavingsFinal = tlSav / 360;
      monthlySavings.innerText = roundMeCurrency(monthlySavingsFinal);

     //Finance Savings
     const finP = systemPrice
     const finMonthlyRepayment = finP * ((finR/100)/finN)/(1-((1+(finR/100)/finN))**(-(finN * finY)));
     const finalBeforeSavings = roundMeCurrency(finMonthlyRepayment);
     beforeSavings.innerText = finalBeforeSavings;
     //totalSavingsBanner.innerText = roundMeCurrency(finalBeforeSavings);
     const finalAfterSavings = roundMeCurrency(finMonthlyRepayment - monthlySavingsFinal);
     priceEstimateBreakdown.innerText = finalAfterSavings;
     for (const x of afterSavings) {
      x.innerText = finalAfterSavings;
    }

    for (const y of beforeSavings) {
      y.innerText = finalBeforeSavings;
    }

    }

    //Trial click + slider update
    const sneaky = () => {

  // Get the value of the "ts-id" attribute of the clicked panel
  let selectedRadioId;

  for (let i = 0; i < panelAmount.length; i++) {
    if (panelAmount[i].checked) {
      panelId = panelAmount[i].getAttribute('ts-id');
      break;
    }
  }
  console.log(panelId);

  if (batteryStatus === true){
    // set checkbox value based on panel selected
    if (panelId === 'std8' || panelId === 'std10' || panelId === 'std12') {
      singleBattery.value =  947.61 ;
    } else if (panelId === 'prm8') {
      singleBattery.value = 2402;
    } else if (panelId === 'prm10') {
      singleBattery.value = 3555;
    } else if (panelId === 'prm12') {
      singleBattery.value = 4690;
    } else {
      singleBattery.value = 0;
    }

  } else if (batteryStatus == false){
    singleBattery.value = 0;
  } else {
    singleBattery.value = 0;
  }

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

      myBillSelectionBadge.innerText = roundMeCurrency(mnthVal);
  }

  // Attach an event listener to each panel
  panelAmount.forEach(panel => {
  panel.addEventListener('click', function () {    

    sneaky();

    });
  });

  // Run calcs on slider input
  monthlyBill.addEventListener('input', () => {
    sneaky();
  });

  // Run calcs on slider input
  singleBattery.addEventListener('change', () => {
    if (singleBattery.checked) {
      batteryStatus = true;
    } else {
      batteryStatus = false;
    }
    sneaky();
  });


  updateEverything(valStd8, pwrStd8, cnsmpStd8, multiVal);

})
