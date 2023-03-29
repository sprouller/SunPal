  document.addEventListener('DOMContentLoaded', () => {
    const RADIO_GROUP2_SELECTOR = '[fs-hacks-element="panel-amount"]';
    const TOTAL_SELECTOR = '[fs-hacks-element="total-value"]';
    const TOTAL_SELECTOR_BANNER = '[fs-hacks-element="total-value-banner"]';
    const BATTERY_VALUE = '[fs-hacks-element="battery-selector"]';
    const HIDDEN_INPUT_SELECTOR = '[fs-hacks-element="hidden-total"]';
    const INSTALLATION_DATE = '[fs-hacks-element="installation-date"]';
    const MONTHLY_BILL = '[fs-hacks-element="monthly-bill"]';
    const TOTAL_SAVINGS = '[fs-hacks-element="total-savings"]';
    const MONTHLY_SAVINGS = '[fs-hacks-element="monthly-savings"]';
    const CARBON_SAVED = '[fs-hacks-element="carbon-saved"]';
    const SELF_CONSUMPTION = '[fs-hacks-element="self-consumption"]';

    const radiosGroup2 = document.querySelectorAll(RADIO_GROUP2_SELECTOR);
    const totalValueBanner = document.querySelector(TOTAL_SELECTOR_BANNER);
    const totalValueDiv = document.querySelector(TOTAL_SELECTOR);
    const batteryValue = document.querySelectorAll(BATTERY_VALUE);
    const hiddenTotalInput = document.querySelector(HIDDEN_INPUT_SELECTOR);
    const installationDate = document.querySelector(INSTALLATION_DATE);
    const monthlyBill = document.querySelector(MONTHLY_BILL);
    const totalSavings = document.querySelector(TOTAL_SAVINGS);
    const monthlySavings = document.querySelector(MONTHLY_SAVINGS);
    const carbonSaved = document.querySelector(CARBON_SAVED);
    const selfConsumption = document.querySelector(SELF_CONSUMPTION);

    //Get Installation date
    const options = { year: "numeric", month: "long", day: "numeric" }
    const today = new Date();
    today.setDate(today.getDate() + 14);
    const installDate = today.toLocaleDateString("en-GB", options);
    installationDate.innerText = installDate;
  
    if ((radiosGroup2.length === 0) || !totalValueDiv || !hiddenTotalInput) return;
  
    const updateTotals = (sum, sum2, sum3, totalValueDiv, totalValueBanner, hiddenTotalInput) => {
      console.log('update');
          
      const combined = sum + sum2 + sum3;
      const formattedSum = new Intl.NumberFormat().format(combined);

      //totalValueDiv.innerText = formattedSum;
      totalValueBanner.innerText = formattedSum;
      hiddenTotalInput.value = formattedSum;
    };
  
    let sum = 0;
    let sum2 = 0;
    let sum3 = 0;
  
    for (const radio of radiosGroup2) {
      const amountToBeAdded2 = Number(radio.getAttribute('add-value'));
  
      if (isNaN(amountToBeAdded2)) {
        amountToBeAdded2 = 0;
      };
      if (radio.checked) sum2 += amountToBeAdded2;
  
      radio.addEventListener('change', function () {
        if (radio.checked) {
          sum2 = amountToBeAdded2;
          for (const otherRadio2 of radiosGroup2) {
            if (otherRadio2 !== radio) {
              otherRadio2.checked = false;
            }
          }
        }
  
        updateTotals(sum, sum2, sum3, totalValueDiv, totalValueBanner, hiddenTotalInput);
      });
    }


    for (const checkbox of batteryValue) {
      const amountToBeAdded3 = Number(checkbox.getAttribute('add-value'));
    
      if (isNaN(amountToBeAdded3)) continue;
      if (checkbox.checked) {
        sum3 += amountToBeAdded3;
        for (const otherCheckbox of batteryValue) {
          if (otherCheckbox !== checkbox) {
            otherCheckbox.checked = true;
          }
        }
      }
    
      checkbox.addEventListener('input', function () {
        if (checkbox.checked) {
          sum3 += amountToBeAdded3;
          for (const otherCheckbox of batteryValue) {
            if (otherCheckbox !== checkbox) {
              otherCheckbox.checked = true;
              otherCheckbox.classList.add("w--redirected-checked");
            }
          }
        } else {
          sum3 -= amountToBeAdded3;
          for (const otherCheckbox of batteryValue) {
            if (otherCheckbox !== checkbox) {
              otherCheckbox.checked = false;
              otherCheckbox.classList.remove("w--redirected-checked");
            }
          }
        }
    
        updateTotals(sum, sum2, sum3, totalValueDiv, totalValueBanner, hiddenTotalInput);
      });
    }
      
    
    updateTotals(sum, sum2, sum3, totalValueDiv, totalValueBanner, hiddenTotalInput);


    // Get all the checkboxes with the same fs-hacks-element attribute value
    const checkboxes = document.querySelectorAll('[fs-hacks-element="battery-selector"]');
    
    // Add event listeners to each checkbox
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', (event) => {
        // When any checkbox is checked or unchecked, set all checkboxes to the same state
        checkboxes.forEach((otherCheckbox) => {
          otherCheckbox.checked = event.target.checked;
        });
      });
    });

    
    //Monthly Savings Section
    const updateSavings = () => {

      saved = monthlyBill * 100;
      monthlySavings = totalSavings/23;
      carbonSaved = monthlySavings+94;
      
      totalSavings.textContent = saved;

    }

    monthlyBill.addEventListener('input', () => {

      const monthlyEnergyCost = monthlyBill.value;

      updateSavings(monthlyEnergyCost)
  });

  });